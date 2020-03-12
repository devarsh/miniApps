package main

import (
	"context"
	"encoding/csv"
	"fmt"
	"os"
	"path"
	"sync"

	"github.com/fatih/color"
)

func writeInvoiceToCsv(invoice *FinalInvoices) {
	if invoice == nil {
		fmt.Println("Invoice is not found")
		return
	}
	records := make([][]string, 0)
	headerRecord := []string{"Name (EID)", "From", "To", "Days", "Amt"}
	records = append(records, headerRecord)
	for _, oneInvoiceDetail := range invoice.EmpInvoices {
		oneRecord := []string{
			oneInvoiceDetail.EmployeeName,
			oneInvoiceDetail.TimeSheetStDt,
			oneInvoiceDetail.TimeSheetEndDt,
			oneInvoiceDetail.RmDays + " Days",
			fmt.Sprintf("%f", oneInvoiceDetail.InvoiceAmount),
		}
		records = append(records, oneRecord)
		oneRecord = []string{oneInvoiceDetail.EmployeeId, "", "", "", ""}
		records = append(records, oneRecord)
	}
	finalFilePath := path.Join(filePath, "./invoices", fmt.Sprintf("./%s-%s-%s.csv", invoice.OneInvoicePid.InvoiceNo, month, year))
	color.Cyan("Creating file %s", finalFilePath)
	file, err := os.Create(finalFilePath)
	if err != nil {
		fmt.Println("Error creating file", err)
		return
	}
	w := csv.NewWriter(file)
	err = w.WriteAll(records)
	if err != nil {
		fmt.Println("error writing to file", finalFilePath, err)
		return
	}
	w.Flush()
	color.Cyan("Done creating file %s", finalFilePath)
}

func writeInvoicesToCsvConso(data *FinalInvoices) ([][]string, error) {
	if data == nil {
		return nil, fmt.Errorf("Invoice empty cannot generate csv")
	}
	invoicePid := data.OneInvoicePid
	var records [][]string
	for _, oneInvoiceDetail := range data.EmpInvoices {
		oneRecord := []string{
			invoicePid.InvoiceNo,
			invoicePid.InvoiceDt,
			invoicePid.SerivceType,
			oneInvoiceDetail.ContractorState,
			oneInvoiceDetail.InvoiceYear,
			oneInvoiceDetail.InoviceMonth,
			fmt.Sprintf("%f", oneInvoiceDetail.InvoiceAmount),
			fmt.Sprintf("%f", oneInvoiceDetail.TaxAmount),
			oneInvoiceDetail.WiproGSTNo,
			oneInvoiceDetail.ProjectCode,
			oneInvoiceDetail.SezIndicator,
			oneInvoiceDetail.WiproGSTNo,
			oneInvoiceDetail.EmployeeName,
			oneInvoiceDetail.EmployeeId,
			oneInvoiceDetail.RmDays,
			oneInvoiceDetail.RmHours,
			oneInvoiceDetail.RateStr,
			oneInvoiceDetail.TimeSheetStDt,
			oneInvoiceDetail.TimeSheetEndDt,
		}
		records = append(records, oneRecord)
	}
	return records, nil
}

func writeAllInvoicesToCsvChan(ctx context.Context, fileName string, wg *sync.WaitGroup, result <-chan *Result) error {
	defer wg.Done()
	finalFilePath := path.Join(filePath, fmt.Sprintf("%s-%s-%s.csv", fileName, month, year))
	color.Cyan("Creating File for all Invoices: %s", finalFilePath)
	fs, err := os.Create(finalFilePath)
	if err != nil {
		fmt.Println(err)
		return err
	}
	defer fs.Close()
	w := csv.NewWriter(fs)
	headerRecord := []string{
		"InvoiceNo", "InvoiceDt", "ServiceType", "ContractorState", "InvoiceYear", "InvoiceMonth",
		"InvoiceAmount", "TaxAmount", "WiproGSTNO", "ProjectCode", "SezIndicator", "WiproGSTNO2",
		"EmployeeName", "EmployeeId", "RmDays", "RmHours",
		"RateStr", "TimeSheetStDt", "TimeSheetEndDt"}
	w.Write(headerRecord)
	for oneRes := range result {
		records, err := writeInvoicesToCsvConso(oneRes.Invoice)
		if err != nil {
			fmt.Println(err)
			continue
		}
		w.WriteAll(records)
		select {
		case <-ctx.Done():
			return nil
		default:
		}
	}
	color.Cyan("Done creating file....")
	return nil
}
