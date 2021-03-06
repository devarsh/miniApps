package main

import (
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"path"
	"strings"

	"github.com/devarsh/miniApps/synergyParser/utils"
	"github.com/fatih/color"
)

func fetchInvoicesList(client *http.Client, cookies string) ([]string, error) {
	form := url.Values{}
	form.Add("PageNo", "1")
	form.Add("RecordsPerPage", recordsPerPage)
	form.Add("selectMonth", month)
	form.Add("selectYear", year)
	form.Add("selectStatus", "NONE")
	form.Add("InvoiceNumber", "NONE")

	req, err := http.NewRequest("POST", invoicesURL, strings.NewReader(form.Encode()))
	if err != nil {
		return nil, err
	}
	req.Header = getHeaders(false, cookies)
	responseStr, timeTaken, err := utils.RequestMaker(client, req)
	if err != nil {
		fmt.Println("Error making request")
		return nil, err
	}
	color.Cyan("Fetching All Invoices %s\nPOST %s\nTime Taken:%s\n", cookies, invoicesURL, *timeTaken)
	if *responseStr == "" {
		return nil, errors.New("Response string is empty")
	}
	invoices := fetchInvoiceList(*responseStr)
	return invoices, nil
}

func fetchOneInvoice(client *http.Client, invoiceNo string, cookies string) (OneInvoiceDetail, string, error) {
	if invoiceNo == "" {
		return nil, "", errors.New("NO invoice Number found to fetch")
	}
	url := fmt.Sprintf(invoiceDetailURL, usernameG, invoiceNo)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, invoiceNo, err
	}
	responseStr, timeTaken, err := utils.RequestMaker(client, req)
	if err != nil {
		fmt.Println("Error Making Request")
		return nil, invoiceNo, err
	}
	color.Green("Get Single Invoice Detail For Invoice No:%s\nGET %s\nTime Taken:%s\n", invoiceNo, url, *timeTaken)
	oneInvoice := fetchInvoiceDetail(*responseStr)
	return oneInvoice, invoiceNo, nil
}

func writeInvoiceOnetoCsv(invoice OneInvoiceDetail, invoiceNo string) error {
	records := make([][]string, 0)
	headerRecord := []string{"Name (EID)", "From", "To", "Days", "Amt"}
	records = append(records, headerRecord)
	for _, oneEmp := range invoice {
		oneRecord := []string{
			oneEmp.EmployeeName,
			oneEmp.PeriodFrom,
			oneEmp.PeriodTo,
			oneEmp.WorkingDuration,
			oneEmp.InvoiceAmount,
		}
		records = append(records, oneRecord)
		oneRecord = []string{"( " + oneEmp.EmployeeID + " )", "", "", "", ""}
		records = append(records, oneRecord)
	}
	finalFilePath := path.Join(filePath, "./invoices", fmt.Sprintf("Synergy-%s-%s-%s.csv", invoiceNo, month, year))
	color.Cyan("Creating File %s", finalFilePath)
	err := utils.WriteCsv(records, finalFilePath)
	if err != nil {
		return err
	}
	color.Cyan("Done creating file %s", finalFilePath)
	return nil
}
