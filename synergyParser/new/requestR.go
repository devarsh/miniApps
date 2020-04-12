package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/devarsh/miniApps/synergyParser/utils"
	"github.com/fatih/color"
	"github.com/tidwall/gjson"
)

func fetchInvoiceListR(client *http.Client, cookies, wlInst string, retryCountLimit int) ([]gjson.Result, error) {
	retryCount := 0
RETRY:
	newReqFormData := formData()
	newReqFormData.Set("parameters", getReimbursementListPurpose())
	req, err := http.NewRequest("POST", apiUrl, strings.NewReader(newReqFormData.Encode()))
	if err != nil {
		return nil, err
	}
	req.Header = getHeaders(false, cookies, wlInst)
	responseStr, timeTaken, err := utils.RequestMaker(client, req)
	color.Yellow("Get Reimbursement Invoice Request For %s-%s\nPOST %s\nTime Taken:%s\n", month, year, apiUrl, timeTaken)
	apiResponse := gjson.Get(*responseStr, "message")
	if strings.Contains(apiResponse.String(), "failure") {
		fmt.Println("retrying......in 3 to fetch invoice numbers :")
		time.Sleep(3 * time.Second)
		retryCount = retryCount + 1
		if retryCount <= retryCountLimit {
			goto RETRY
		}
	}
	jsonExtract := gjson.Get(*responseStr, "result.#.str_invoice_number")
	if jsonExtract.IsArray() {
		return jsonExtract.Array(), nil
	}
	return nil, fmt.Errorf("could'nt convert json response into Array of Invoice List")
}

func invoicesChanR(ctx context.Context, client *http.Client, cookie, logintoken string, retryCountLimit int) (<-chan string, error) {
	invoiceList, err := fetchInvoiceListR(client, cookie, logintoken, retryCountLimit)
	if err != nil {
		return nil, err
	}
	invChan := make(chan string)
	go func() {
		defer close(invChan)
		for _, oneInv := range invoiceList {
			select {
			case invChan <- oneInv.String():
			case <-ctx.Done():
				return
			}
		}
	}()
	return invChan, nil
}

func makeRequestChanR(ctx context.Context, client *http.Client, cookies, loginToken string, invoiceChan <-chan string, retryCountLimit int) <-chan *RResult {
	resChan := make(chan *RResult)
	go func() {
		defer close(resChan)
		for oneInv := range invoiceChan {
			invDtl, err := fetchOneInvoiceR(client, cookies, loginToken, oneInv, retryCountLimit)
			select {
			case resChan <- &RResult{Invoice: invDtl, Err: err}:
			case <-ctx.Done():
				return
			}
		}
	}()
	return resChan
}

func fetchOneInvoiceR(client *http.Client, cookie, wlInst, invoiceNo string, retryCountLimit int) ([]RInvoiceEmp, error) {
	if invoiceNo == "" {
		return nil, fmt.Errorf("Error Fetching Employee for empty Invoice")
	}
	retryCount := 0
RETRY:
	newReqFormData := formData()
	newReqFormData.Set("parameters", getReimbursementInvoicePurpose(invoiceNo))
	req, err := http.NewRequest("POST", apiUrl, strings.NewReader(newReqFormData.Encode()))
	if err != nil {
		return nil, err
	}
	req.Header = getHeaders(false, cookie, wlInst)
	responseStr, timeTaken, err := utils.RequestMaker(client, req)
	if err != nil {
		return nil, fmt.Errorf("Error Fetching Employee Invoice No:%s", invoiceNo)
	}
	color.Green("Get Single Invoice Employee Detail Request For Invoice No:%s\nPOST %s\nTime Taken:%s\n", invoiceNo, apiUrl, timeTaken)
	apiResponse := gjson.Get(*responseStr, "message")
	if strings.Contains(apiResponse.String(), "failure") {
		fmt.Println("retrying......in 3 to fetch invoice numbers :")
		time.Sleep(3 * time.Second)
		retryCount = retryCount + 1
		if retryCount <= retryCountLimit {
			goto RETRY
		}
	}
	jsonExtract := gjson.Get(*responseStr, "result")
	finalJSON := fmt.Sprint(`{"result" : ` + jsonExtract.String() + `}`)
	allEmpInvoices := RFinalInvoices{}
	err = json.Unmarshal([]byte(finalJSON), &allEmpInvoices)
	if err != nil {
		return nil, fmt.Errorf("Error wrapping InvoiceEmpList response into JSON %v", err)
	}
	return allEmpInvoices.Result, nil
}

func mergeRequestChanR(ctx context.Context, cs ...<-chan *RResult) <-chan *RResult {
	resChan := make(chan *RResult)
	var wg sync.WaitGroup
	for _, oneCs := range cs {
		wg.Add(1)
		go func(oneChan <-chan *RResult) {
			defer wg.Done()
			for res := range oneChan {
				select {
				case resChan <- res:
				case <-ctx.Done():
					return
				}
			}
		}(oneCs)
	}
	go func() {
		wg.Wait()
		close(resChan)
	}()
	return resChan
}

func duplicateChannelsR(ctx context.Context, inChannel <-chan *RResult, out ...chan *RResult) {
	for inChRes := range inChannel {
		for _, oneChan := range out {
			oneChan <- inChRes
			select {
			case <-ctx.Done():
				goto a
			default:
			}
		}
	}
a:
	for _, oneChan := range out {
		close(oneChan)
	}
}

func writeInvoiceToCsvChanR(ctx context.Context, wg *sync.WaitGroup, res <-chan *RResult) {
	defer wg.Done()
	for oneRes := range res {
		if oneRes.Err != nil {
			fmt.Printf("\n\n\nthe following error occured while generating invoice:\n%s\n\n\n", oneRes.Err)
		}
		writeInvoiceToCsvR(oneRes.Invoice)
		select {
		case <-ctx.Done():
			return
		default:
		}
	}
}

func generateExcelChanR(ctx context.Context, client *http.Client, wg *sync.WaitGroup, res <-chan *RResult) {
	defer wg.Done()
	for oneRes := range res {
		DownloadExcel(client, oneRes.Invoice)
		select {
		case <-ctx.Done():
			return
		default:
		}
	}
}
