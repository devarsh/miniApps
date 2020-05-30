package main

import (
	"bufio"
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	"sync"
	"time"
)

var (
	outfile  *os.File
	keywords []string
)

func main() {
	var err error
	searchFile := flag.String("sf", "./keywords.txt", "Keywords to search file path")
	readDir := flag.String("d", "./", "Directory to search for listener log files")
	flag.Parse()
	stTime := time.Now()
	/*****keyword file****/
	keywords = make([]string, 0)
	fp, err := os.Open(*searchFile)
	if err != nil {
		panic(err)
	}
	scanner := bufio.NewScanner(fp)
	scanner.Split(bufio.ScanLines)
	for scanner.Scan() {
		data := scanner.Bytes()
		keywords = append(keywords, string(data))
	}
	/******Directory Files *******/
	allFiles := make([]string, 0)
	files, err := ioutil.ReadDir(*readDir)
	if err != nil {
		panic(err)
	}
	for _, f := range files {
		if !f.IsDir() {
			allFiles = append(allFiles, f.Name())
		}
	}
	x := sync.WaitGroup{}
	for _, oneFile := range allFiles {
		x.Add(1)
		go generateFiles(&x, oneFile)
	}
	x.Wait()
	fmt.Println("Done Generating files in :", time.Since(stTime))
}

func searchNames(str string, id int) []string {
	strs := make([]string, 0)
	for _, words := range keywords {
		if strings.Contains(str, words) {
			data := []byte(fmt.Sprintf("Line:-%d   KeyWord:-%s  Line:-%s\n", id, words, str))
			strs = append(strs, string(data))
		}
	}
	return strs
}

func generateFiles(val *sync.WaitGroup, filename string) {
	defer val.Done()
	fmt.Printf("Scanning file %s\n", filename)
	outfile, err := os.Create(fmt.Sprintf("./out-%s", filename))
	if err != nil {
		panic(err)
	}
	defer outfile.Close()
	fp, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer fp.Close()
	scanner := bufio.NewScanner(fp)
	scanner.Split(bufio.ScanLines)
	lineNum := 1
	for scanner.Scan() {
		data := scanner.Bytes()
		str := fmt.Sprintf("%s", data)
		res := searchNames(str, lineNum)
		if len(res) > 0 {
			for _, oneLine := range res {
				outfile.Write([]byte(oneLine))
			}
		}
		lineNum++
	}
	defer fp.Close()
}
