package main

import (
	"context"
	"fmt"
	"net/http"
	"sync"
)

func makeRequestChanR(ctx context.Context, client *http.Client, cookies string, invoiceChan <-chan string) <-chan *Result {
	resChan := make(chan *Result)
	go func() {
		defer close(resChan)
		for oneInv := range invoiceChan {
			invDtl, invNo, err := fetchOneRInvoice(client, oneInv, cookies)
			select {
			case resChan <- &Result{Error: err, InvoiceNo: invNo, InvDetail: invDtl}:
			case <-ctx.Done():
				return
			}
		}
	}()
	return resChan
}

func downloadRInvoiceOneToExcelChan(ctx context.Context, wg *sync.WaitGroup, client *http.Client, cookies string, res <-chan *Result) {
	defer wg.Done()
	for oneRes := range res {
		downloadRinvoicetoExcel(client, oneRes.InvDetail, oneRes.InvoiceNo, cookies)
		select {
		case <-ctx.Done():
			return
		default:
		}
	}
}

func writeRInvoiceOneToCsvChan(ctx context.Context, wg *sync.WaitGroup, res <-chan *Result) {
	defer wg.Done()
	for oneRes := range res {
		err := writeRinvoiceOnetoCsv(oneRes.InvDetail, oneRes.InvoiceNo)
		if err != nil {
			fmt.Println("Error writing file", oneRes.InvoiceNo)
		}
		select {
		case <-ctx.Done():
			return
		default:
		}
	}
}
