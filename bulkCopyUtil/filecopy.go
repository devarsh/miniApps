package main

import (
	"bufio"
	"encoding/csv"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"github.com/cheggaaa/pb/v3"
)

type metaData struct {
	ModifiedTime time.Time
	FileName     string
	SrcPath      string
	DestPath     string
	SrcPathSize  int64
	isDir        bool
}

func checkError(message string, err error) {
	if err != nil {
		log.Fatal(message, err)
	}
}

func reportError(message string, err error) {
	log.Fatal(message, err)
}

func initProgressBar(myMetaData *metaData) *pb.ProgressBar {
	tmpl := `{{string . "fileName" | green}} {{ bar . "<" "." (cycle . "|" "/" "-" ) "_" ">"}} {{speed . | rndcolor }} {{percent .}}`
	bar := pb.ProgressBarTemplate(tmpl).Start64(myMetaData.SrcPathSize)
	bar.Set("fileName", myMetaData.DestPath)
	return bar
}

func copyFile(myMetaData *metaData) {
	in, err := os.Open(myMetaData.SrcPath)
	checkError(fmt.Sprintf("couldnt open source file :%s", myMetaData.SrcPath), err)
	defer in.Close()
	out, err := os.Create(myMetaData.DestPath)
	checkError(fmt.Sprintf("couldnt open dest file :%s", myMetaData.DestPath), err)
	defer func() {
		cerr := out.Close()
		checkError("error closing dest file", cerr)
	}()
	reader := bufio.NewReader(in)
	writer := bufio.NewWriter(out)
	buf := make([]byte, 1024)
	var bytesWrittenCnt int64 = 0
	bar := initProgressBar(myMetaData)
	for {
		n, err := reader.Read(buf)
		if err != nil && err != io.EOF {
			reportError("error reading from file", err)
		}
		if n == 0 {
			break
		}

		noOfBytesWritten, err := writer.Write(buf[:n])
		if err != nil {
			reportError("error writing to file", err)
		}
		err = writer.Flush()
		if err != nil {
			reportError("error flusing writer buffer", err)
		}
		bytesWrittenCnt = bytesWrittenCnt + int64(noOfBytesWritten)
		bar.SetCurrent(bytesWrittenCnt)
		//percentage := (bytesWrittenCnt / myMetaData.SrcPathSize) * 10
	}
	bar.Finish()
	//fmt.Printf("Completed copying file %s, Total Bytes:%d, Bytes Written:%d\n", myMetaData.FileName, myMetaData.SrcPathSize, bytesWrittenCnt)
	err = os.Chtimes(myMetaData.DestPath, myMetaData.ModifiedTime, myMetaData.ModifiedTime)
	checkError(fmt.Sprintf("error updating modified time of the file %s", myMetaData.FileName), err)
}

func writeDataToCsv(outPath string, data []*metaData) {
	file, err := os.Create(path.Join(outPath, "out.csv"))
	checkError("failed to create file to write metadata", err)
	defer file.Close()
	writer := csv.NewWriter(file)
	defer writer.Flush()
	writer.Write([]string{"FileName", "FilePath", "DestPath", "FileSize", "ModifiedDate", "isDir"})
	for _, value := range data {
		record := []string{value.FileName, value.SrcPath, value.DestPath, fmt.Sprintf("%d", value.SrcPathSize), value.ModifiedTime.String(), fmt.Sprintf("%t", value.isDir)}
		err = writer.Write(record)
		checkError("failed to write record to metadata", err)
	}
}

func createPathIfNotExist(destPath string) {
	_, err := os.Stat(destPath)
	if os.IsNotExist(err) {
		errDir := os.Mkdir(destPath, 0755)
		checkError(fmt.Sprintf("could not create directory %s", destPath), errDir)
	}
}

func writeDataToDest(data []*metaData) {
	for _, myData := range data {
		if myData.isDir {
			createPathIfNotExist(myData.DestPath)
			fmt.Printf("Completed creating directory %s", myData.DestPath)
		} else {
			copyFile(myData)
		}
	}
	for _, myData := range data {
		if myData.isDir {
			os.Chtimes(myData.DestPath, myData.ModifiedTime, myData.ModifiedTime)
		}
	}
}

func createMetaDataOfDirectoryTree(startPath string, destPath string) []*metaData {
	data := make([]*metaData, 0)
	err := filepath.Walk(startPath, func(currPath string, info os.FileInfo, err error) error {
		if err != nil {
			fmt.Println("prevent panic by handling access to path %q: %v\n", currPath, err)
		}
		if info.IsDir() {
			metaDataInst := &metaData{
				SrcPath:      currPath,
				ModifiedTime: info.ModTime(),
				isDir:        true,
			}
			filteredOriginFilePathDir := strings.Replace(currPath, startPath, "", 1)
			filteredDestPath := path.Join(destPath, filteredOriginFilePathDir)
			metaDataInst.DestPath = filteredDestPath
			data = append(data, metaDataInst)
		} else {
			metaDataInst := &metaData{
				FileName:     info.Name(),
				SrcPath:      currPath,
				SrcPathSize:  info.Size(),
				ModifiedTime: info.ModTime(),
				isDir:        false,
			}
			//split src file and directory so we dont overwrite extension in src directory when source path supplied is "."
			originFilePathDir, originFileName := path.Split(currPath)
			//remove startPath from the sourcepath of the file supplied
			filteredOriginFilePathDir := strings.Replace(originFilePathDir, startPath, "", 1)
			filteredDestPath := path.Join(destPath, filteredOriginFilePathDir, originFileName)
			metaDataInst.DestPath = filteredDestPath
			data = append(data, metaDataInst)
		}
		return nil
	})
	checkError("failed while walking the directory tree", err)
	return data
}

func main() {
	srcPtr := flag.String("src", "./", "source file path")
	destPtr := flag.String("dest", "", "dest file path")
	flag.Parse()
	src := filepath.Clean(*srcPtr)
	dest := filepath.Clean(*destPtr)
	if dest == "" {
		log.Fatalf("Must select destination path")
	}
	if dest == src {
		log.Fatalf("Src and destination cannot be same")
	}
	metaData := createMetaDataOfDirectoryTree(src, dest)
	writeDataToDest(metaData)
	writeDataToCsv("./", metaData)
}
