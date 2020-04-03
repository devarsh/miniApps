package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path"
	"strings"
	"time"

	"github.com/devarsh/miniApps/synergyParser/utils"
	"github.com/fatih/color"
	"github.com/tidwall/gjson"
)

//For Beena File
func getCreateInvoiceList(client *http.Client, cookies, wlInst string, retryCountLimit int) error {
	retryCount1 := 0
RETRY2:
	newReqFromData := formData()
	newReqFromData.Set("parameters", getCreateInvoicePurpose())
	req, err := http.NewRequest("POST", apiUrl, strings.NewReader(newReqFromData.Encode()))
	if err != nil {
		return err
	}
	req.Header = getHeaders(false, cookies, wlInst)
	responseStr, timeTaken, err := utils.RequestMaker(client, req)
	if err != nil {
		return err
	}
	color.Yellow("Get Create Invoice Request \nPOST %s\nTime Taken:%s\n", apiUrl, timeTaken)
	jsonExtract := gjson.Get(*responseStr, "result")
	finalJSON := fmt.Sprintf(`{"result": ` + jsonExtract.String() + `}`)
	allInvoices := AllCreateInvoiceEmpList{}
	err = json.Unmarshal([]byte(finalJSON), &allInvoices)
	if err != nil {
		fmt.Println("retrying......in 3 seconds")
		time.Sleep(3 * time.Second)
		retryCount1 = retryCount1 + 1
		if retryCount1 <= retryCountLimit {
			goto RETRY2
		}
		return fmt.Errorf("Error wrapping invoicesList response to JSON")
	}
	/*Logic to Add TimeSheet Start Date & End Date*/
	for _, oneInvoiceDetail := range allInvoices.Result {
		retryCount := 0
	RETRY:
		newReqFromData := formData()
		newReqFromData.Set("parameters", getTimeSheetStEnDtPurpose(oneInvoiceDetail.ContractorId, oneInvoiceDetail.TimeSheetMonth, oneInvoiceDetail.TimesheetYear))
		req, err := http.NewRequest("POST", apiUrl, strings.NewReader(newReqFromData.Encode()))
		if err != nil {
			return err
		}
		req.Header = getHeaders(false, cookies, wlInst)
		responseStr, timeTaken, err := utils.RequestMaker(client, req)
		if err != nil {
			return err
		}
		color.Yellow("Get TimeSheet Start Dt & End Dt for %s\nPOST %s\nTime Taken:%s\n", oneInvoiceDetail.ContractorId, apiUrl, timeTaken)
		jsonExtract := gjson.Get(*responseStr, "result.0")
		timeSheetDtl := TimeSheetEmpDtl{}
		err = json.Unmarshal([]byte(jsonExtract.String()), &timeSheetDtl)
		if err != nil {
			fmt.Println("retrying......in 3 seconds")
			time.Sleep(3 * time.Second)
			retryCount = retryCount + 1
			if retryCount <= retryCountLimit {
				goto RETRY
			}
			fmt.Printf(*responseStr)
			fmt.Printf("Error getting timeSheetData for contractor Id %s", oneInvoiceDetail.ContractorId)
			continue
			//return fmt.Errorf("Error wrapping timeSheetData response to JSON")
		}
		oneInvoiceDetail.TimesheetStartDt = timeSheetDtl.TimeSheetStartDt
		oneInvoiceDetail.TimesheetEndDt = timeSheetDtl.TimeSheetEndDt
	}
	records := make([][]string, 0)
	headerRecord := []string{"ContractorID",
		"ContractorState",
		"EmpCompanyCode",
		"EmployeeName",
		"InvoiceAmount",
		"ProjectCode",
		"Rate",
		"RateTypeDesc",
		"ResumeNumber",
		"Rmdayshours",
		"TimeSheetMonth",
		"TimeSheetYear",
		"TimeSheetStartDate",
		"TimeSheetEndDate",
	}
	records = append(records, headerRecord)
	for _, oneInvoiceDetail := range allInvoices.Result {
		oneRecord := []string{
			oneInvoiceDetail.ContractorId,
			oneInvoiceDetail.ContractorState,
			oneInvoiceDetail.EmpCompanyCode,
			oneInvoiceDetail.EmployeeName,
			oneInvoiceDetail.InvoiceAmount,
			oneInvoiceDetail.ProjectCode,
			oneInvoiceDetail.Rate,
			oneInvoiceDetail.RateTypeDesc,
			oneInvoiceDetail.ResumeNumber,
			oneInvoiceDetail.Rmdayshours,
			oneInvoiceDetail.TimeSheetMonth,
			oneInvoiceDetail.TimesheetYear,
			oneInvoiceDetail.TimesheetStartDt,
			oneInvoiceDetail.TimesheetEndDt,
		}
		records = append(records, oneRecord)
	}
	finalFilePath := path.Join(filePath, fmt.Sprintf("./createInvoiceListCurrent.csv"))
	color.Cyan("Creating file %s", finalFilePath)
	file, err := os.Create(finalFilePath)
	if err != nil {
		fmt.Println("Error creating file", err)
		return err
	}
	w := csv.NewWriter(file)
	err = w.WriteAll(records)
	if err != nil {
		fmt.Println("error Writing to the file", err)
		return err
	}
	w.Flush()
	color.Cyan("Done creating file....")
	return nil
}
