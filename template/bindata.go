// Code generated by go-bindata.
// sources:
// templates/COMP/ccm.md
// templates/COMP/ncm.md
// templates/NONCOMP/ccm.md
// templates/NONCOMP/ncm.md
// DO NOT EDIT!

package main

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func bindataRead(data []byte, name string) ([]byte, error) {
	gz, err := gzip.NewReader(bytes.NewBuffer(data))
	if err != nil {
		return nil, fmt.Errorf("Read %q: %v", name, err)
	}

	var buf bytes.Buffer
	_, err = io.Copy(&buf, gz)
	clErr := gz.Close()

	if err != nil {
		return nil, fmt.Errorf("Read %q: %v", name, err)
	}
	if clErr != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}

type asset struct {
	bytes []byte
	info  os.FileInfo
}

type bindataFileInfo struct {
	name    string
	size    int64
	mode    os.FileMode
	modTime time.Time
}

func (fi bindataFileInfo) Name() string {
	return fi.name
}
func (fi bindataFileInfo) Size() int64 {
	return fi.size
}
func (fi bindataFileInfo) Mode() os.FileMode {
	return fi.mode
}
func (fi bindataFileInfo) ModTime() time.Time {
	return fi.modTime
}
func (fi bindataFileInfo) IsDir() bool {
	return false
}
func (fi bindataFileInfo) Sys() interface{} {
	return nil
}

var _templatesCompCcmMd = []byte("\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\xff\xc4\x58\x6f\x6f\xdb\x38\xf2\x7e\xaf\x4f\x31\x28\xf0\x2b\x76\x05\x57\x75\xdc\xb4\x4d\xfc\x3b\x1c\x2e\x71\x92\x6e\x71\x4d\x9a\x3a\xc1\x06\x07\xf4\xcd\x58\x1c\x59\xdc\x50\xa4\x96\xa4\xec\xe8\x6c\x7d\xf7\xc3\x90\xf2\x9f\xb4\x49\x7b\x07\x1c\x70\x7a\xd1\x2a\xd4\x90\x1c\x3e\xf3\xcc\x33\x43\xa7\xe9\x19\x7a\x1a\xa7\xe9\x6a\x25\xd0\x93\xbb\xa8\x3c\x64\xa7\x52\x29\x1e\xee\xba\xe4\x2f\x33\xfb\xfa\xaf\xc9\x6a\xf5\x0a\x64\x01\xf4\x27\x64\x5f\x1a\xe3\xd1\x4b\xa3\x6f\xdb\x9a\xe0\xc5\xd5\xf9\xdd\x8b\xae\x83\x24\x4d\xa7\xe7\x17\xe3\x34\xfd\x7d\x7a\xfd\x69\xbc\x5a\x65\x53\x9a\x4b\xa3\xbb\x8e\xdf\x2f\x31\x2f\xa5\x26\x9e\xd0\x75\xe3\xab\xf3\xbb\xf1\xc9\xe5\x24\x1a\x15\x57\xa6\xeb\xc2\xf2\xa4\x1c\x3d\xb3\xc7\xf4\xfc\xea\x45\xd7\xfd\x07\x5b\x4c\xcf\xaf\x9e\xdb\x62\x6f\x9d\x2b\x03\x53\x2a\x2c\xe9\x9c\xe0\xc2\x34\x5a\xc0\x85\xb1\xe0\x4b\xe9\x60\xeb\x00\xf0\x8a\x71\xb2\x16\x1b\x38\xe0\xd9\x27\x59\xad\xb2\x13\x21\x2c\x39\xd7\x75\x49\x72\x46\x68\xe1\x46\xda\x41\xf2\x53\x04\x93\x34\xbd\x69\x66\x63\xf8\x5c\x14\x64\xa1\x30\x16\x26\xa6\xaa\x4b\x4b\xda\xc9\x05\xc1\x89\xd6\x0d\x2a\xb8\x44\xa9\x3d\x69\x64\x97\x27\x46\x7b\x8b\xb9\x0f\xc6\xff\x30\x8d\x85\x49\x63\xf9\x34\x2d\x4c\x4c\xa3\xbd\xd4\xf3\xd7\x70\x46\x9e\x72\x7e\x85\x1e\x21\x07\xbf\xac\x56\x55\x7c\xbf\xc2\x8a\x1c\x6c\xb0\x73\x5d\xf7\x6b\x9a\x26\xc9\x1d\x81\xc7\x7b\x82\xda\xca\x85\x54\x34\x27\xf0\x06\xa4\xf6\xd6\x88\x26\x27\xe0\x8d\x1c\xa9\x02\xd0\x01\x82\x22\x14\x71\x75\xdd\x14\x98\xfb\xc6\x92\x05\xd4\xe2\x91\xa7\xbf\x99\xc6\x51\x16\xd0\xad\xd1\x79\xf0\xa5\x25\x02\x41\x39\x0a\x72\xb0\x24\x28\x71\x41\x30\x23\xd2\x50\x5b\xb3\x90\x61\x45\x47\x76\x21\x73\x72\x20\x35\x5c\x05\xb8\x50\xc9\x7f\x92\x80\x53\xd4\xf7\x6e\x00\x13\xf3\xca\xd4\x64\xd1\x33\x3c\x61\x2c\xec\x3b\x31\xb6\x36\x16\x3d\x65\x70\x47\x80\x96\xc0\x35\x75\xad\x5a\x5e\xf2\xca\x78\xda\x62\xb3\x03\x84\xa7\xed\xf6\xad\xf6\x1c\xdf\xfa\x50\x04\x62\x10\x38\xac\x28\xd8\x1b\x5f\x92\x85\x99\x45\x2d\x1c\x23\xb1\x24\xa5\xb2\x24\xf9\xa8\x23\x7f\x72\xa3\x35\xe3\x6e\x34\x1f\x8f\xbd\xa8\x15\xa1\x0b\x50\xba\x66\x56\x49\x1f\x70\x2c\x2c\xb9\x12\x30\xc6\x76\x7f\xe3\x7c\x3f\xb6\x2d\x9b\x3e\xe9\xfb\xee\xf3\xbd\xd4\x82\x67\x39\x29\x02\x26\x46\x67\xff\x76\x56\x05\xde\x4d\x49\xd3\x12\x15\x98\xff\x39\xff\x6e\x19\x40\x19\xe2\xbe\x0f\xa3\xf4\x65\x08\x01\xce\xcc\x82\x03\x21\xc5\x16\xa5\x01\x83\xbc\x34\x8d\x12\xa0\xe4\x7d\xcf\xd7\xc2\xd8\x8a\xb1\x01\x5f\xa2\x8f\x20\x9d\x5c\x4e\xa0\x26\x2b\x8d\x80\x12\x39\x48\x55\xad\xc8\x93\x00\xa3\x81\x05\x30\x3b\x7f\xa8\xa5\x6d\xa3\xf2\xb1\x2b\xdf\x87\x73\xb0\xa5\x2b\xe9\x5c\x19\x47\x02\x4a\xb2\x14\xbc\x4b\xd3\x93\xec\x32\x9b\x64\x69\xba\x8b\x5f\x84\x53\x91\xf7\x64\x81\x8a\x82\x57\x59\x10\x14\xd6\x54\xd0\x4b\x2f\xec\x2b\xef\x75\x70\x8f\x77\xff\x51\x6c\x03\x05\x73\xa3\x0b\x69\xab\x3e\xd8\x49\x9a\xfe\x66\xea\x98\x9e\x11\xa2\xb8\x75\x04\x52\x31\x59\x82\x93\x61\x45\x4b\x7f\x36\xd2\x52\x45\xda\x67\x69\xfa\x58\x1b\x03\x1b\x6e\x9a\xd9\x1f\x94\x7b\x66\xdd\x9e\x34\xde\x7e\x2f\x8d\x8c\x12\x13\x81\xf4\xbe\x71\xf1\x53\x1d\x4d\x3e\x16\x80\xba\x85\x5c\xa1\x95\x85\xcc\xa3\x91\x26\x12\x24\x36\xb9\x52\x10\x29\x4e\x91\x10\xd0\x1c\x95\x82\xc6\x81\xd1\x63\x48\xd3\xe1\xfb\xe3\x57\xa3\x77\x87\xa3\xc3\xd1\xe8\xf8\xf5\xf1\xf1\xe8\xed\x08\x86\x87\xc7\xa3\xe3\x34\xcd\x98\x40\xa8\xef\x99\x72\x1c\x7d\xa9\x03\x6b\x2a\x42\xbd\x2c\xa5\x8a\xd9\x8b\xce\x35\x76\x63\xc1\x9f\x67\xe4\x38\x56\xbd\xb8\x85\xa4\x0f\x86\x01\x7a\xf4\x7c\xbc\x00\xbb\x5a\x62\xeb\xb2\x24\x61\xba\x3b\x28\x50\xfa\xb2\x68\x94\x6a\x07\x49\x92\x5c\x18\x3b\x80\x34\xfd\x9d\x66\x30\x35\x33\x53\xe1\x3d\xfc\x72\xfd\x2b\x7c\xf2\x82\x31\xee\x0b\x69\x92\xa6\x27\x8d\x2f\x8d\x0d\x52\x76\x23\xe7\x1a\xbd\xb1\x2d\x1b\xbc\x7a\xfe\xe1\x69\x9c\x8e\x96\xca\x9f\xe7\x23\xaf\xc5\x25\x12\x5c\xc9\x98\x05\x59\xc1\x0d\x0c\xbd\x6e\xb8\x9a\x72\x59\x48\x12\x11\x1f\xe9\x00\xe7\x96\x02\x21\x38\x19\xd8\xd4\x93\xad\xdc\x86\x68\x42\x86\xf3\x57\x1b\x1c\x1c\xcc\x48\x99\x65\xa0\xdd\x6d\x30\x7c\xc9\xfb\x47\x33\x37\x66\x17\x0e\xb2\xc8\x97\xdd\xc2\xd1\x1f\x4b\xec\x11\x10\x27\x68\x4e\x62\x2b\xad\x7d\x62\x9a\xa2\x00\xa3\x09\x5a\x2e\x9d\x21\x4d\xf8\x23\x27\x08\xe7\x6b\xc5\xc5\x3a\xd0\x36\x19\x65\x70\x4a\x85\xb1\xa1\x5a\x71\x2c\x83\x3e\xb7\xce\x53\x05\x8d\x16\x5c\x86\xb6\x3b\x73\xa9\xd2\x80\x79\x4e\xb5\x67\xac\x06\x80\xe0\x39\xe4\x4b\xa9\x14\xcc\x08\x72\xb4\x96\xd1\x30\x8d\x87\x59\x1b\x68\x40\x7a\x2e\x35\x71\x06\x71\x55\x22\xc7\x3b\x3b\xe6\x08\xef\x63\x29\x0e\xf9\x58\x7e\xfa\xd1\x8f\xda\x79\xe9\x9b\x98\x90\x6f\x32\x38\xd1\x2d\x7c\x30\x0b\xb2\x3a\x78\xa1\x68\x21\xb9\x9e\x55\x75\xd0\x8d\x59\x1b\x26\xcd\xb7\x06\xff\x0f\xd2\x73\xbe\x06\xef\x9d\x37\x46\x44\xed\x72\x4d\x5e\x6e\x26\x07\x87\x6b\x6c\x71\xa6\x08\xe8\xc1\x5b\x0c\x31\xb8\xd9\x14\xaa\x29\xf1\x64\x12\xe3\xbe\x92\x07\x0c\x38\x7f\x62\x81\x23\x78\x4c\xa3\xcb\xa7\x8a\x5d\x44\x2f\x68\xed\x16\x41\x6f\xe0\x9e\xa8\x7e\x44\x22\xa9\x61\xce\x4e\x2e\x8d\x0d\x01\xd8\xf2\x24\x0b\xd1\xdf\x5f\x3b\xb8\x9d\xf3\x49\x61\x66\x7c\xc9\x80\x2e\x98\x4b\x8b\x98\x66\x33\x4b\x78\x2f\xcc\x52\x87\x34\x77\x3d\x73\xc2\x24\xa9\x73\xd5\x08\x0a\x1b\xe7\x26\x66\x69\xa0\x0b\x5a\xef\x80\x1e\x38\xa4\xe0\x4b\xe3\x68\x2b\x91\x14\xd5\xb2\xa9\x02\x48\xa1\x22\xdc\x78\xcc\xef\xc9\xc2\x4b\xf8\x3b\xb5\x35\x0a\xb8\xf1\x92\x07\x02\x8d\xae\x77\xce\x54\xdf\xfa\x3c\xa3\x0d\x72\x02\xbe\x34\x68\x3d\x59\xd5\x86\xe0\xee\x1f\x8f\xcf\xb0\x85\xef\xbb\x79\x22\x6a\x8d\x36\xb6\x42\xb5\x45\xab\x0c\x12\x12\x44\x45\x85\x13\x6d\x3e\x88\x20\x31\x87\x19\x9c\x32\x2a\xb0\x83\x65\xbb\xb2\x25\x57\x1b\xcd\x4b\xb3\xa4\x4b\x0d\x87\x47\x50\x5a\x97\x25\x6f\x33\xb8\x63\x1b\x6d\x7c\x8f\x36\x2f\x5e\x2b\x74\x5e\xe6\x01\x32\x78\x19\x64\xf7\xba\x6c\x9d\xcc\x51\xc1\x19\x56\x38\xa7\xc0\xa1\xf3\x07\x46\x5a\xea\x79\xe0\xce\x25\xfe\x61\x2c\x34\x35\xcc\x2d\x8a\xa8\xce\x3d\xf2\x31\xc7\xb2\x24\x61\x7a\xb3\xd3\xcc\x43\xb2\x1a\x15\xb3\xe4\x91\xca\x30\x71\xd1\x3d\x42\xb5\x5f\x04\xbd\xc7\xbc\x8c\xc9\x99\xe7\xe4\x9c\xb1\x4c\x6f\xf2\x79\x16\xbc\x37\x56\xce\xa5\x46\xa5\xda\x0d\x03\xc4\x46\xca\x37\xb5\x35\x83\x29\xd5\x28\x6d\x48\xca\x0a\x55\xd1\xe8\x50\xa2\x19\x43\x63\x41\x84\x93\x31\xfa\x81\xff\x16\x3d\xcc\xa4\x27\x37\xe8\xbf\xb8\xcd\x17\xcc\x73\x29\x48\xfb\x01\x78\x8b\xda\xd5\xc6\xfa\x4d\x35\x9a\x2b\x39\xa7\xa0\x17\x1a\x7d\x63\x51\x81\x90\x0e\x1d\xd7\x72\x06\xc7\x85\xe3\x68\xa3\x5f\x39\x8f\x5a\xa0\x15\x40\x8a\x72\x6f\x03\xb4\xb5\x59\xf6\xbd\x70\x7c\x2b\x54\x93\xfb\xa6\x87\xd2\x82\x2b\x8d\xf5\x90\x4b\x9b\x37\xd2\x67\xcf\xcb\x7f\x12\xc5\xbf\xef\x27\xce\xc8\xa3\x54\x51\x61\xb7\x83\xb1\x69\x18\xc3\xe3\x4b\xdc\xae\x95\x48\x92\x4b\x23\x48\x01\xf7\x5b\xeb\x29\x7a\x5a\x7f\xb8\xb9\xfd\xdb\xc1\xd1\xff\xad\x6f\x8d\x47\x05\x77\xdc\x18\xdc\xe2\xc3\xfa\x8b\x6f\xd7\x37\xcd\x0c\xc2\xf0\x7a\xcf\xa5\xf5\xf6\x9f\xbd\xff\xf7\xfe\xdc\x0d\xad\x93\xb7\xc3\xc1\xa7\xf5\x9b\xe1\x60\xba\x1e\xbd\x1d\x4c\xe3\xdb\xc1\x21\x8f\x8d\x06\xd3\x75\xe8\x01\x2c\xea\x39\xed\x37\x7e\x7c\x6f\x0a\x3e\x76\xdd\x7a\xb5\x92\x5a\x48\xd4\xdc\x4d\x42\x36\x0d\xcd\xd8\xa3\xc1\x0b\xc8\x3e\x38\xff\xfd\x60\xf0\x9a\xcf\x72\x8b\x0f\xe1\x6b\xf6\xc5\xb7\xcf\x98\x75\xdd\x7a\xaf\x1b\xe9\x2f\x67\xd9\x94\xbb\x97\xcf\x45\xd1\x75\xc9\xe6\x75\xcd\xcf\x37\x2b\xec\xcc\xf6\x17\xf9\xc0\x97\x81\x88\xdc\x13\x73\xb6\xbb\xee\x75\x02\xd7\xd8\x86\x0c\xe8\x83\xca\x81\x5a\xad\xfa\x66\x3d\x5e\x6e\xe1\xc5\xe9\xf4\x8c\xbb\xf4\x8d\x29\x5f\x74\x36\xf6\xeb\x93\xd7\x79\x88\xe9\x18\xf6\x9b\x8e\xeb\x85\xcf\x42\xd7\xf1\x55\x07\xeb\x68\x71\x73\xfa\xf1\xab\x3e\xb5\xa8\xf3\x72\x0c\x9f\x95\x80\x6b\x14\x16\x61\x6a\x50\x7c\xd5\x27\xaf\x27\x70\x65\xc6\xf0\xe6\xcd\xfb\xf7\x47\xef\x8f\x0e\xde\x8d\x86\x5f\xf5\xc7\x8b\x9b\x09\x4c\x8c\x88\x93\xaf\x86\xc3\x83\xe1\xbb\xa3\xf7\xeb\xfd\x6e\xf1\xbf\xeb\xd5\xb5\x51\xad\xa7\xbc\xd4\x32\x87\x01\x9c\x94\x15\x09\x9c\x3d\x72\x6f\x78\xfc\xf6\xdd\xe1\xbb\x83\xa3\xe3\xd1\x13\xee\x0d\x0f\x86\x87\x6f\xf6\x03\xf2\x4c\x42\xad\xbf\xcb\xb0\x23\x66\xec\xc1\xf0\x60\xf0\x69\xbd\x3d\x52\xe8\x6a\x98\x43\xfd\x40\xf8\x3b\xc4\x2f\x86\x8f\x5b\xb7\x78\x73\x38\xa5\x12\x55\xc1\x4a\xb0\x57\xff\xbf\xfd\x61\xe0\x29\xf3\x6f\xe0\x61\x74\x7e\xd4\x26\x36\x96\xe0\x25\x57\xb2\xaa\xe6\x2b\xc6\xee\xf9\xa9\x2d\x2f\xd7\xff\xca\xf3\xfc\x4f\x17\x3f\x7c\x9e\xba\xaa\xec\x7e\x24\x4a\xd3\xe4\x5f\x01\x00\x00\xff\xff\xfe\x6b\x7f\x49\x47\x12\x00\x00")

func templatesCompCcmMdBytes() ([]byte, error) {
	return bindataRead(
		_templatesCompCcmMd,
		"templates/COMP/ccm.md",
	)
}

func templatesCompCcmMd() (*asset, error) {
	bytes, err := templatesCompCcmMdBytes()
	if err != nil {
		return nil, err
	}

	info := bindataFileInfo{name: "templates/COMP/ccm.md", size: 4679, mode: os.FileMode(420), modTime: time.Unix(1531906729, 0)}
	a := &asset{bytes: bytes, info: info}
	return a, nil
}

var _templatesCompNcmMd = []byte("\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\xff\xbc\x58\x5f\x6f\x1b\xb9\x11\x7f\xdf\x4f\x31\x30\xd0\xe0\x6e\xa1\x6c\x64\xc5\x49\x6c\xb5\x28\x6a\x3b\x76\xce\x68\xac\x38\xb2\x71\x41\x81\xbc\x8c\xc8\x59\x2d\xcf\x5c\x72\x8f\xe4\x4a\x56\x25\x7d\xf7\x62\xc8\x95\x2c\x25\xf6\xe5\x0a\x14\xdd\x87\x64\xcd\x1d\xce\x0c\x7f\xbf\xf9\x47\xe5\xf9\x7b\x0c\x34\xcc\xf3\xe5\x52\x62\x20\x7f\x59\x07\x28\xce\x94\xd6\xbc\xbc\x5e\x67\x7f\x9b\xb8\x57\x7f\xcf\x96\xcb\x97\xa0\x4a\xa0\xdf\xa1\xf8\xdc\xda\x80\x41\x59\x73\xb7\x68\x08\x0e\x46\x17\x5f\x0e\xd6\xeb\x2c\xcf\xc7\x17\x97\xc3\x3c\xff\x75\x7c\xf3\x71\xb8\x5c\x16\x63\x9a\x2a\x6b\xd6\x6b\x7e\xbf\x46\x51\x29\x43\x2c\xbf\x5e\x0f\x47\x17\x5f\x86\xa7\xd7\xe7\x49\xa8\x1c\xd9\xf5\x3a\x6a\x27\xed\xe9\x19\x13\xe3\x8b\xd1\x7f\x67\x62\x7c\x31\x7a\xce\xc4\x8e\x9e\x91\x85\x31\x95\xe4\x8c\x20\xb8\xb4\xad\x91\x70\x69\x1d\x84\x4a\x79\xd8\x3a\x00\xac\x31\x6d\x36\x72\x83\x06\x3c\xfb\x64\xcb\x65\x71\x2a\xa5\x23\xef\xd7\xeb\x2c\x7b\x4f\xe8\xe0\x56\xb9\x5e\xf6\x67\x00\xbc\x6d\x27\x43\xf8\x54\x96\xe4\xa0\xb4\x0e\xce\x6d\xdd\x54\x8e\x8c\x57\x33\x82\x53\x63\x5a\xd4\x70\x8d\xca\x04\x32\xc8\x2e\x9f\x5b\x13\x1c\x8a\x10\x85\xff\x65\x5b\x07\x23\x1b\x78\xb9\x35\x41\x99\x29\x74\x90\xc0\x4f\xcb\x65\x9d\x5e\x47\x58\x93\x87\x0d\x56\x7e\xbd\xfe\x39\xcf\xb3\xec\x0b\x41\xc0\x7b\x82\xc6\xa9\x99\xd2\x34\x25\x08\x16\x94\x09\xce\xca\x56\x10\xb0\x62\x4f\xba\x04\xf4\x80\xa0\x09\x65\x52\x6e\xda\x12\x45\x68\x1d\x39\x40\x23\xf7\x3c\xfb\xc5\xb6\x9e\x8a\x88\x66\x83\x3e\x40\xa8\x1c\x11\x48\x12\x28\xc9\xc3\x9c\xa0\xc2\x19\xc1\x84\xc8\x40\xe3\xec\x4c\x45\x8d\x9e\xdc\x4c\x09\xf2\xa0\x0c\x8c\x22\x3c\xa8\xd5\xbf\x49\xc2\x19\x9a\x7b\xdf\x83\x73\xfb\xd2\x36\xe4\x30\x30\x1c\x71\x2d\xda\x3d\xb7\xae\xb1\x0e\x03\x15\xf0\x85\x00\x1d\x81\x6f\x9b\x46\x2f\x58\xe5\x93\x78\xa4\x6d\x8f\x76\xeb\x1d\xc7\xb7\x3e\x94\x31\x10\x08\x3c\xd6\x14\xe5\x6d\xa8\xc8\xc1\xc4\xa1\x91\x9e\x91\x98\x93\xd6\x45\x96\x5d\x99\x14\x2f\xc2\x1a\x43\x22\x06\xcc\x3c\x79\xd1\x68\x42\x4f\x92\xb1\xf4\xed\xa4\x56\x21\x02\x59\x3a\xf2\x15\x60\x22\x73\xd7\xb2\xd8\x25\x73\xf1\x3c\x99\xdb\xcf\xf7\xca\x48\xde\xe5\x95\x8c\xa0\x58\x53\xfc\xe9\x34\x8a\x81\x36\x26\x43\x73\xd4\x60\xff\xef\x01\x77\xc7\x88\xa9\x48\xf4\x2e\x6e\x2a\x54\x11\x73\x9c\xd8\x19\x23\xaf\xe4\x16\x95\x1e\xa3\x3a\xb7\xad\x96\xa0\xd5\x7d\x17\xa0\xa5\x75\x35\x63\x01\xa1\xc2\x90\x40\x39\xbd\x3e\x87\x86\x9c\xb2\x12\x2a\x64\x56\xea\x46\x53\x20\x09\xd6\x00\x17\xb8\xe2\xe2\xa1\x51\x6e\x91\x2a\x5b\x9e\x3f\x49\x60\x6f\x1b\xa0\x64\x84\xb6\xcc\x61\x45\x8e\xa2\x7b\x79\x7e\x5a\x5c\x17\xe7\x45\x9e\x3f\x12\x96\xf0\xd3\x14\x02\x39\xa0\xb2\x64\x2d\x33\x82\xd2\xd9\x1a\xba\xda\x0a\xbb\xa5\xf5\x26\xfa\xc7\xe6\xff\x88\xcc\x18\x74\xc2\x9a\x52\xb9\xba\x63\x37\xcb\xf3\x5f\x6c\x43\xf0\xa9\x75\x1d\x46\xc9\x74\x42\x52\x33\xf2\xd1\xc9\xa8\xd1\xd1\xef\xad\x72\x54\x93\x09\x45\x9e\xef\x57\xbf\x48\xff\x6d\x3b\xf9\x8d\x44\x60\x0a\x77\x8a\xdf\xdd\xf7\xc5\x8f\x19\x63\xe6\xc9\xec\x0a\x97\x3f\xac\x94\xd9\x55\x09\x68\x16\x20\x34\x3a\x55\x2a\x91\x84\x94\xdf\xb8\x26\xbb\x14\x81\x92\x48\x73\x62\x44\x5a\x05\x6a\x0d\xad\x4f\x84\x9d\x9c\x0c\xde\x0c\xfa\x47\x27\x83\x13\x78\x05\xfd\x77\x27\x2f\x07\x6f\x8f\x06\x47\x83\xc1\x49\xa4\xee\xae\x42\x73\xcf\x71\xc7\x31\xa0\x4c\x8c\x9d\x9a\xd0\xcc\x2b\xa5\x53\xd2\xa2\xf7\xad\xdb\x48\xf0\xe7\x09\x79\x26\xac\xab\x69\x31\xd7\xa3\x60\xc4\x1f\x03\x9f\x31\x62\xaf\xe7\xb8\xf0\x45\x96\x71\x90\x7b\x28\x51\x85\xaa\x6c\xb5\x5e\xf4\xb2\x2c\xbb\xb4\xae\x07\x79\xfe\x2b\x4d\x60\x6c\x27\xb6\xc6\x7b\xf8\xe9\xe6\x67\xf8\x18\x24\x03\xdd\xb5\xcb\x2c\xcf\x4f\xdb\x50\x59\x17\x2b\xd8\xad\x9a\x1a\x0c\xd6\x2d\x58\xe0\xe5\xf3\x0f\x6f\xe3\x24\x74\x54\xfd\x38\x0b\x59\x17\x77\x42\xf0\x15\x63\x16\x8b\x09\x6e\x60\xe8\x32\xd1\x37\x24\x54\xa9\x48\x26\x7c\x94\x07\x9c\x3a\x8a\x51\xc1\x08\xb3\x68\x20\x57\xfb\x4d\xb4\x49\x15\xcf\x5f\x6f\x70\xf0\x30\x21\x6d\xe7\x31\xf6\xee\xa2\xe0\x0b\xb6\x9f\xc4\xfc\x90\x5d\x38\x2c\x52\xd0\x3c\x2a\x4e\xfe\x38\x62\x8f\x80\x38\x4d\x05\xc9\x6d\x45\xed\xd2\xd3\x96\x25\x58\x43\xb0\xe0\x0e\x19\x73\x85\x3f\x72\x96\x70\xd6\xd6\x64\x44\x8a\xdd\x6c\x50\xc0\x19\x95\xd6\xc5\x26\xc5\x5c\xc6\xb2\xbc\xf0\x81\x6a\x68\x8d\xe4\xee\xb3\xb5\xcc\x1d\xca\x00\x0a\x41\x4d\x60\xac\x7a\x80\x10\x98\xf2\xb9\xd2\x1a\x26\x04\x02\x9d\x63\x34\x6c\x1b\x60\xb2\x88\x61\x40\x66\xaa\x0c\x71\x1a\x71\x33\x22\xcf\x96\x3d\xc7\x08\xdb\x71\x94\x96\x42\xea\x3a\xdd\xea\x95\xf1\x41\x85\x36\x65\xe5\xeb\x02\x4e\xcd\x02\x3e\xd8\x19\x39\x13\xbd\xd0\x34\x53\xdc\xc6\xea\x26\x16\x8f\xc9\x22\x6e\x9a\x6e\x05\xfe\x0a\x2a\x70\x1e\x44\xef\x7d\xb0\x56\xa6\x0a\xe6\x5b\x51\x6d\x36\x47\x87\x1b\x5c\xe0\x44\x13\xd0\x43\x70\x18\x39\xb8\xdd\xf4\xa7\x31\xf1\x66\x92\xc3\xae\x81\x47\x0c\x38\x7f\x52\x5f\x23\xd8\x0f\xa3\xeb\xa7\x7a\x5c\x42\x2f\x56\xdc\x2d\x82\xc1\xc2\x3d\x51\xb3\x17\x44\xca\xc0\x94\x9d\x9c\x5b\x17\x09\xd8\xc6\x49\x11\xd9\xdf\xd5\x1d\xdd\x16\x7c\x52\x98\xd8\x50\x31\xa0\x33\x8e\xa5\x59\x4a\xb3\x89\x23\xbc\x97\x76\x6e\x62\x9a\xfb\x2e\x72\xe2\x26\x65\x84\x6e\x25\x45\xc3\xc2\xa6\x2c\x8d\xe1\x82\x2e\x78\xa0\x07\xa6\x14\x42\x65\x3d\x6d\xeb\x24\x71\x82\xc7\xbf\xda\x3a\xe2\x14\x5b\xc3\xc1\xa7\x7f\x82\x0f\x58\x37\x07\xf0\x02\x0e\xae\xcc\x3d\x9c\xd9\x10\x34\x1d\xc4\x50\xba\x79\x74\xa8\xfe\xd6\xef\x09\x6d\xd0\x93\xf0\xb9\x45\x17\xc8\xe9\x45\x24\xf8\xae\xda\xc2\xb6\x71\x34\x0e\x01\x11\xc1\x21\x08\x4d\x68\x18\x19\x5b\x82\x6f\x94\x91\x9a\x7c\x8f\xbb\x87\x8d\x03\x86\x54\xd8\x54\x0e\xa7\x35\x88\x0a\xcd\x94\x7a\x9c\x54\x01\x44\x45\x82\xf1\xec\x6d\xdf\x78\xff\xf8\xe6\x7a\x73\xf4\xda\x06\x2e\x35\xbb\xda\x51\x39\x28\x95\xe6\x4e\xf3\x62\x6f\x5b\x67\x16\x5a\xa3\x42\x91\x1d\xed\xb3\xc2\xd0\x6f\x59\xff\xee\xa8\x32\x95\x48\x63\x5d\x8d\x7a\x4b\x72\x15\x2b\x5f\xac\x85\x3a\x7a\xb3\xf9\x20\x63\x65\x7c\x53\xc0\x19\x93\x09\x8f\x6c\x6e\x35\x3b\xf2\x8d\x35\xac\x9a\xdb\x91\x32\x70\x74\x0c\x95\xf3\x31\x80\x2f\x1e\x18\x3d\x65\xa6\x31\x70\xaf\xf1\x37\xeb\xa0\x6d\x60\xea\x50\xa6\xfe\xd0\x9d\x3d\x25\x78\x91\x65\x9c\x5b\x6c\x9a\x93\x80\x9c\x41\xcd\x21\xba\x57\xe2\x38\x6b\xd0\xef\xd1\xd9\x29\xc1\x10\x50\x54\xa9\x32\x08\x41\xde\x5b\xc7\xb9\x45\x41\x14\x60\x6c\x00\xeb\xd4\x54\x19\xd4\x7a\xb1\x61\x55\x6e\xfa\xc8\xa6\xbb\x17\x30\xa6\x06\x95\x8b\x15\xa1\x46\x5d\xb6\x26\x0e\x09\x11\x76\x07\x12\x6b\x9c\x46\x0c\x63\xf2\x39\x0c\x30\x51\x81\xd9\x4f\x5f\xfc\xe6\x0b\x0a\xa1\x24\x99\xd0\x83\xe0\xd0\xf8\xc6\xba\xae\x69\x1a\x9a\x6a\x35\xa5\x58\xac\x0c\x86\xd6\xa1\x06\xa9\x3c\x7a\xe6\x98\xc1\xf1\xf1\x38\xc6\x9a\x97\x3e\xa0\x91\xe8\x24\x90\x26\x11\x9c\x12\xa8\xa1\xb1\xf3\x6e\xfe\x4e\x6f\xa5\x6e\x45\x68\x3b\x28\x1d\xf8\xca\xba\x00\x42\x39\xd1\x72\x5c\x64\xdf\xb6\x9b\xd8\x6f\xba\x39\xe6\x3d\x05\x54\x3a\x15\xf5\xed\x62\x1a\x56\x86\xb0\x7f\x3b\x7c\x1c\x61\xb2\xec\xda\x4a\xd2\xc0\x83\xde\x6a\x8c\x81\x56\x1f\x6e\xef\xfe\x71\x78\xfc\x97\xd5\x9d\x0d\xa8\xe1\x0b\x0f\x24\x77\xf8\xb0\xfa\x1c\x16\xab\xdb\x76\x02\x71\x79\xb5\xe3\xc8\x6a\xfb\xcf\xce\xff\x3b\x7f\x3e\x2e\xad\xb2\x37\xfd\xde\xc7\xd5\xeb\x7e\x6f\xbc\x1a\xbc\xe9\x8d\xd3\xdb\xe1\x11\xaf\x0d\x7a\xe3\x55\x9c\x3d\x1c\x67\xd8\xee\xc4\xc9\x37\xb2\xe8\xe3\x7a\xbd\x5a\x2e\x95\x91\x0a\xcd\x79\xeb\x1c\x14\xe3\x38\x05\xee\x2d\x5e\x42\xf1\xc1\x87\xef\x17\xa3\xd7\x7c\x96\x3b\x7c\x88\x5f\x8b\xcf\x61\xf1\x8c\xd8\x7a\xbd\xda\x99\x82\xba\x6b\x5f\x31\xe6\xa9\xe9\x53\x59\xae\xd7\xd9\xe6\x75\xc5\xcf\x37\x1a\x1e\xc5\x76\x95\x7c\xe0\x6b\x47\x42\xee\x89\x3d\x5b\xab\x3b\xc3\xc7\x0d\x2e\x62\xdc\x77\xa4\x32\x51\xcb\x65\x77\x2b\x48\xd7\x66\x38\x38\x1b\xbf\xe7\xeb\xc0\x46\x94\xaf\x54\x1b\xf9\xd5\xe9\x2b\x11\x39\x1d\xc2\xee\x9c\x73\x33\x0b\x45\x1c\x74\xbe\x9a\x28\x9d\x24\x6e\xcf\xae\xbe\x9a\x33\x87\x46\x54\x43\xf8\xa4\x25\xdc\xa0\x74\x08\x63\x8b\xf2\xab\x39\x7d\x75\x0e\x23\x3b\x84\xd7\xaf\xdf\xbd\x3b\x7e\x77\x7c\xf8\x76\xd0\xff\x6a\xae\x2e\x6f\xcf\xe1\xdc\xca\xb4\x79\xd4\xef\x1f\xf6\xdf\x1e\xbf\x5b\xed\x4e\xa9\xff\x5b\xaf\x6e\xac\x5e\x04\x12\x95\x51\x02\x7a\x70\x5a\xd5\x24\x71\xb2\xe7\x5e\xff\xe4\xcd\xdb\xa3\xb7\x87\xc7\x27\x83\x27\xdc\xeb\x1f\xf6\x8f\x5e\xef\x12\xf2\xcc\xfc\xb6\xfa\x6e\xa0\x3b\xe6\x88\x3d\xec\x1f\xf6\x3e\xae\xb6\x47\x8a\x83\x14\xc7\x50\xb7\x10\xff\x8e\xfc\x25\xfa\x78\x5a\x4c\x57\x96\x33\xaa\x50\x97\x9c\xff\x3b\x23\xc7\xb7\x3f\x39\x3c\x25\xfe\x0d\x3c\x8c\xce\x1f\x4d\xa6\xad\x23\x78\x01\xb7\xdc\x35\xf9\x6a\xf3\xf8\xfc\x50\x96\xd5\x75\x3f\x1f\x3d\xff\xa3\xc8\x1f\x3e\x4f\x5d\x91\x1e\x7f\x7d\xca\xf3\xec\x3f\x01\x00\x00\xff\xff\x0d\xa5\x19\xc4\xa0\x12\x00\x00")

func templatesCompNcmMdBytes() ([]byte, error) {
	return bindataRead(
		_templatesCompNcmMd,
		"templates/COMP/ncm.md",
	)
}

func templatesCompNcmMd() (*asset, error) {
	bytes, err := templatesCompNcmMdBytes()
	if err != nil {
		return nil, err
	}

	info := bindataFileInfo{name: "templates/COMP/ncm.md", size: 4768, mode: os.FileMode(420), modTime: time.Unix(1531908001, 0)}
	a := &asset{bytes: bytes, info: info}
	return a, nil
}

var _templatesNoncompCcmMd = []byte("\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\xff\xcc\x58\x5d\x6f\xe3\xba\x11\x7d\xd7\xaf\x18\x2c\xd0\x8b\x7b\x05\xaf\x62\x3b\xdf\x6e\x51\xd4\x71\x92\xbd\x01\x36\x4e\xd6\x0e\x6e\x50\x60\x5f\x28\x71\x64\xb1\xa1\x48\x5d\x92\xb2\x57\xb5\xf5\xdf\x8b\xa1\x6c\x59\xf9\xda\xed\x02\x7d\xa8\x1f\x76\x15\x6a\x38\x33\x3c\x73\x66\x0e\xed\x30\xbc\x64\x0e\x47\x61\xb8\x5e\x73\xe6\xd0\x5e\xe7\x0e\xa2\x0b\x21\x25\x2d\xd7\x75\xf0\xb7\xd8\x1c\xfc\x3d\x58\xaf\x3f\x82\x48\x01\xff\x84\xe8\x4b\xa9\x1d\x73\x42\xab\x87\xaa\x40\xf8\x30\xbd\x7a\x9c\xde\x4d\x3f\xd4\x35\x04\x61\x38\xbb\xba\x1e\x85\xe1\x1f\xb3\xfb\xcf\xa3\xf5\x3a\x9a\xe1\x42\x68\x55\xd7\xf4\x7c\xcb\x92\x4c\x28\xa4\x3d\x75\x3d\x9a\x5e\x3d\x8e\xc6\xb7\x93\xc6\x28\x9d\xea\xba\xf6\x11\x50\x5a\x7c\x27\xcc\xec\x6a\xda\x84\xf9\x89\x28\xb3\xab\xe9\x7b\x51\x3a\x7e\xa6\x1a\x66\x98\x1a\x54\x09\xc2\xb5\x2e\x15\x87\x6b\x6d\xc0\x65\xc2\x42\x9b\x03\x90\xc7\x66\xb3\xe2\x3b\x50\xe0\xdd\x4f\xb0\x5e\x47\x63\xce\x0d\x5a\x5b\xd7\x41\x70\x89\xcc\xc0\x5c\x98\x5e\xf0\xdf\xe0\x18\x84\xe1\xbc\x8c\x47\x70\x97\xa6\x68\x20\xd5\x06\xa6\x5a\xc1\x44\xe7\x45\x66\x50\x59\xb1\x44\x18\x2b\x55\x32\x09\xb7\x4c\x28\x87\x8a\x51\xe6\x13\xad\x9c\x61\x89\xf3\x1b\xfe\xa9\x4b\x03\x93\xd2\xd0\xa1\x2a\x98\xe8\x52\x39\xa1\x16\x07\x70\x89\x0e\x13\x7a\x84\x2d\x50\x16\x7e\x5d\xaf\xf3\xe6\x79\xca\x72\xb4\xb0\x83\xd0\xd6\xf5\x6f\x61\x18\x04\x8f\x08\x8e\x3d\x21\x14\x46\x2c\x85\xc4\x05\x82\xd3\x20\x94\x33\x9a\x97\x09\x02\x05\xb2\x28\x53\x60\x16\x18\x48\x64\xbc\xf1\xae\xca\x94\x25\xae\x34\x68\x80\x29\xfe\x2c\xd3\xdf\x75\x69\x31\xf2\x20\x17\xcc\x3a\x70\x99\x41\x04\x8e\x09\xe3\x68\x61\x85\x90\xb1\x25\x42\x8c\xa8\xa0\x30\x7a\x29\xbc\x47\x8b\x66\x29\x12\xb4\x20\x14\x4c\x3d\x6a\x4c\x8a\x7f\x23\x87\x0b\xa6\x9e\x6c\x0f\x26\xfa\xa3\x2e\xd0\x30\x47\xf0\xf8\x35\x1f\x77\xa2\x4d\xa1\x0d\x73\x18\xc1\x23\x02\x33\x08\xb6\x2c\x0a\x59\x91\xcb\xa9\x76\xd8\x62\xb3\x07\x84\xb6\xed\xe3\xe6\x9d\xc4\xdb\x1c\x52\xcf\x0f\x04\xcb\x72\xf4\xf6\xda\x65\x68\x20\x36\x4c\x71\x4b\x48\xac\x50\xca\x28\x08\x6e\x54\x43\xa3\x44\x2b\x45\xb8\x6b\x45\xc7\xa3\x2c\x0a\x89\xcc\x7a\x28\x6d\x19\xe7\xc2\x79\x1c\x53\x83\x36\x03\xd6\xd4\xb6\x1b\x38\xe9\xd6\xb6\x22\xd3\x37\x73\xdf\xbf\x7e\x12\x8a\xd3\x2e\x2b\xb8\xc7\x44\xab\xe8\x67\xfa\xcb\xd3\x6f\x86\x0a\x57\x4c\x82\xfe\xbf\xa0\xe1\x03\xe1\x28\x7c\xf9\xbb\x68\x0a\x97\xf9\x4a\xb0\x58\x2f\xa9\x1e\x82\xb7\x60\xf5\x08\xeb\x95\x2e\x25\x07\x29\x9e\xb6\xb4\x4d\xb5\xc9\x09\x22\x70\x19\x73\x0d\x56\xe3\xdb\x09\x14\x68\x84\xe6\x90\x31\xaa\x55\x5e\x48\x74\xc8\x41\x2b\xa0\xa1\x18\x5d\x7d\x2b\x84\xa9\x9a\x69\x48\xa9\xbc\xae\x6a\xaf\x65\x2d\xaa\x44\x6a\x8b\x1c\x32\x34\xe8\xb3\x0b\xc3\x71\x74\x1b\x4d\xa2\x30\xdc\x97\xb1\x81\x54\xa2\x73\x68\x00\xd3\x94\xbc\x2c\x11\x52\xa3\x73\xd8\x8e\x63\xe8\x4e\xe3\x7b\x9f\x1e\x45\xff\x5e\x89\x3d\x13\x13\xad\x52\x61\xf2\x6d\xcd\x83\x30\xfc\x5d\x17\x08\x77\xa5\xd9\x42\xd4\x84\x6e\x80\x94\xc4\x19\x9f\xa4\xf7\x68\xf0\xcf\x52\x18\xcc\x51\xb9\x28\x0c\x9f\x4f\x4a\xcf\x88\x79\x19\xff\x0b\x13\x47\xe4\xeb\x0c\xca\x87\xd7\x83\x92\x50\x22\x22\xa0\xea\x1a\xa7\x3f\x9c\xaa\xc1\x4d\x0a\x4c\x55\x90\x48\x66\x44\x2a\x92\xc6\x48\x21\x72\xe4\xbb\x96\x49\x11\x25\x75\x8a\x2f\x68\xc2\xa4\x84\xd2\x82\x56\x23\x08\xc3\xfe\xe9\xf9\xc7\xe1\xc9\xd1\xf0\x68\x38\x3c\x3f\x38\x3f\x1f\x1e\x0f\xa1\x7f\x74\x3e\x3c\x0f\xc3\x88\x08\xc4\xd4\x13\x51\x8e\xaa\x2f\x94\x67\x4d\x8e\x4c\xad\x32\x21\x9b\x26\x66\xd6\x96\x66\x67\x41\xaf\x63\xb4\x54\xab\xed\x8c\xf3\xbd\xef\x0d\x3d\xf4\xcc\xd1\xf1\x3c\xec\x72\xc5\x2a\x1b\x05\x01\xd1\xdd\x42\xca\x84\xcb\xd2\x52\xca\xaa\x17\x04\xc1\xb5\x36\x3d\x08\xc3\x3f\x30\x86\x99\x8e\x75\xce\x9e\xe0\xd7\xfb\xdf\xe0\xb3\xe3\x84\xf1\x56\x5c\x83\x30\x1c\x97\x2e\xd3\xc6\x4f\xb4\xb9\x58\x28\xe6\xb4\xa9\xc8\xe0\xe3\xfb\x1f\xda\xb6\x6b\x49\x83\xd9\x8f\x7b\x92\xfc\x91\x68\x82\xcd\x08\x37\x3f\x61\xd8\x0e\x8a\xed\x08\xb1\x05\x26\x22\x15\xc8\x1b\x8c\x84\x05\xb6\x30\xe8\x49\x41\x0d\x41\xa6\x0e\x4d\x6e\x77\x64\xe3\xc2\x63\x90\xef\xb0\xb0\x10\xa3\xd4\x2b\x4f\xbd\x07\x6f\xf8\x0b\xc5\x6f\xcc\xec\x88\x52\x18\x44\x0d\x67\xf6\x8e\x9b\x7c\x0c\x52\x46\x80\xd4\xa4\x09\xf2\x76\xca\x6e\x9b\x53\xa7\x29\x68\x85\x50\x91\x98\xfa\x56\xa1\x97\xd4\x24\xd4\xb3\x39\xc9\xb7\xa7\x6e\x30\x8c\xe0\x02\x53\x6d\xbc\x70\x51\x3d\xfd\xa8\xae\xac\xc3\x1c\x4a\xc5\x49\x91\xda\xc8\xa4\x5a\x0a\x58\x92\x60\xe1\x08\xab\x1e\x30\x70\x54\xf6\x95\x90\x12\x62\x84\x84\x19\x43\x68\xe8\xd2\x41\x5c\x79\x2a\xa0\x5a\x08\x85\xd4\x45\x24\x50\x68\x29\xb2\x25\x9e\x50\x1c\x83\xcd\x92\x6b\x94\x68\xbb\x7a\xa3\xac\x13\xae\x6c\x9a\xf2\x30\x82\xb1\xaa\xe0\x93\x5e\xa2\x51\x3e\x0b\x89\x4b\x41\xd2\x96\x17\x7e\x76\xc4\x95\xdf\xb4\x68\x0d\xfe\x0a\xc2\x51\xcf\xfa\xec\xad\xd3\x9a\x37\xf3\xcb\x96\x49\xb6\xdb\xec\x13\x2e\x58\xc5\x62\x89\x80\xdf\x9c\x61\xbe\x06\xf3\x9d\x66\xcd\x90\x36\x23\x1f\x6d\x45\xdd\x63\x40\x3d\xd4\x68\x1d\xbe\xa0\xd1\xed\x5b\xba\xd7\xa0\xe7\xe7\x6d\x8b\xa0\xd3\xf0\x84\x58\x3c\x23\x91\x50\xb0\xa0\x24\x57\xda\xf8\x02\xb4\x3c\x89\x7c\xf5\xbb\xbe\x7d\xda\x09\x9d\x14\x62\xed\x32\x02\x74\x49\x5c\x5a\x36\xad\x16\x1b\x64\x4f\x5c\xaf\x94\x6f\x75\x1b\x01\x55\xf7\x7e\x6f\x93\xbf\x74\x15\xe3\xee\x40\x1c\xbe\x94\xcc\x38\x34\xb2\xf2\x98\x77\xa3\x92\xeb\xf6\x54\xaf\xf6\xf1\x66\x0c\x28\x6d\x72\x26\xdb\x43\x64\xbe\xbb\x7d\xbf\x4b\x7f\xda\xdd\x0b\xee\xbb\xff\x28\x82\x0b\x4a\x16\xf6\xd9\xb6\x9e\x0d\xda\x42\x2b\x72\x4d\xd3\x56\x28\x38\x3a\x83\xcc\xd8\x28\x38\x6e\xa8\x50\x30\xe3\x2c\x70\x96\xb3\x05\x51\x8d\x46\x71\x21\x19\xf5\x40\xa2\xad\x7b\x7e\xdd\xd8\xf9\x8c\xb5\x51\xb8\xa3\xca\x33\x7e\xbd\x3b\x33\x02\x22\x44\x2b\xd0\x97\xe8\x98\x90\x4d\x4b\xb6\x8b\x8d\xd2\x8c\xe0\xf9\xb7\x81\xbd\xfe\x04\xc1\xad\xe6\x28\x81\x44\x7a\x33\x63\x0e\x37\x9f\xe6\x0f\xff\x18\x9c\xfd\x65\xf3\xa0\x1d\x93\xf0\x48\x6a\xf2\xc0\xbe\x6d\xbe\xb8\x6a\x33\x2f\x63\xf0\xcb\x9b\x4e\x4a\x9b\xf6\x9f\xce\xff\x9d\x3f\xf7\x4b\x9b\xe0\xb8\xdf\xfb\xbc\x39\xec\xf7\x66\x9b\xe1\x71\x6f\xd6\x3c\x0d\x8e\x68\x6d\xd8\x9b\x6d\xbc\x70\x18\xa6\x16\xd8\xbd\x2d\xd0\xd5\xdb\xe7\x58\xd7\x9b\xf5\x5a\x28\x2e\x98\xa2\x2b\x08\x44\x33\xaf\xe0\xcf\x16\xaf\x21\xfa\x64\xdd\xeb\x45\x9f\x35\x9d\xe5\x81\x7d\xf3\x6f\xa3\x2f\xae\x7a\xc7\xac\xae\x37\x1d\x09\xdb\xde\xef\xa3\x19\x49\xde\x5d\x9a\xd6\x75\xb0\x7b\xdc\xd0\xe7\x85\x87\xbd\x59\xd7\xc9\x27\xba\x48\x36\xc8\xbd\xb1\xa7\x8d\xda\x91\x8f\x7b\x56\xf9\x6e\xdc\x16\x95\x0a\xb5\x5e\x6f\x2f\x7a\xcd\xf7\x23\xf8\x70\x31\xbb\xa4\xeb\xdd\xce\x94\x2e\xc9\x3b\xfb\xcd\xf8\x20\xf1\x35\x1d\x41\x57\xa9\xee\x97\x2e\xf2\x52\xf5\x55\x79\xeb\xc6\x62\x7e\x71\xf3\x55\x5d\x18\xa6\x92\x6c\x04\x77\x92\xc3\x3d\xe3\x86\xc1\x4c\x33\xfe\x55\x8d\x0f\x26\x30\xd5\x23\x38\x3c\x3c\x3d\x3d\x3b\x3d\x1b\x9c\x0c\xfb\x5f\xd5\xcd\xf5\x7c\x02\x13\xcd\x9b\xcd\xd3\x7e\x7f\xd0\x3f\x39\x3b\xdd\x74\xaf\x18\xff\xdb\xac\xee\xb5\xac\x1c\x26\x99\x12\x09\xf4\x60\x9c\xe5\xc8\x59\xfc\x2c\xbd\xfe\xf9\xf1\xc9\xd1\xc9\xe0\xec\x7c\xf8\x46\x7a\xfd\x41\xff\xe8\xb0\x5b\x90\x77\x1a\x6a\xf3\xaa\xc3\xce\x88\xb1\x83\xfe\xa0\xf7\x79\xd3\x1e\xc9\xcb\x20\x71\x68\xbb\xe0\xff\xf6\xf5\x6b\xca\x47\x7a\xdf\x5c\x37\x2f\x30\x63\x32\x25\xd1\xe8\x34\xf4\xcb\xef\x96\x6f\x99\xbf\x80\x87\xd0\xf9\xde\xdd\xa2\x34\x08\xbf\xc0\xdc\xb1\xbc\xa0\x7b\xe9\xfe\xf3\x43\x5b\x72\xb7\xfd\xb9\xe0\xfd\x6f\xbf\xdf\xfd\xbc\x75\xbf\xdd\xff\xda\x10\x86\xc1\x7f\x02\x00\x00\xff\xff\x7e\x51\x7e\x10\x90\x10\x00\x00")

func templatesNoncompCcmMdBytes() ([]byte, error) {
	return bindataRead(
		_templatesNoncompCcmMd,
		"templates/NONCOMP/ccm.md",
	)
}

func templatesNoncompCcmMd() (*asset, error) {
	bytes, err := templatesNoncompCcmMdBytes()
	if err != nil {
		return nil, err
	}

	info := bindataFileInfo{name: "templates/NONCOMP/ccm.md", size: 4240, mode: os.FileMode(420), modTime: time.Unix(1531907004, 0)}
	a := &asset{bytes: bytes, info: info}
	return a, nil
}

var _templatesNoncompNcmMd = []byte("\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\xff\xc4\x58\x5f\x6f\xdb\x38\x12\x7f\xd7\xa7\x18\x14\xb8\x62\x57\x70\x55\xc7\x4d\xd3\xc4\x77\x38\x5c\xe2\x26\xdd\x02\x8d\x9b\x3a\xc6\x06\x07\xf4\x65\x24\x8e\x2c\x5e\x28\x52\x4b\x52\x76\x7d\xb6\xbe\xfb\x61\x28\x5b\x56\xd2\xa4\xbd\x05\x0e\x38\x3d\xb4\x0a\x35\x9c\x19\xfe\x7e\xf3\x8f\x8e\xe3\xf7\xe8\x69\x1c\xc7\x9b\x8d\x40\x4f\xee\xaa\xf4\x90\x5c\x48\xa5\x78\xb9\x69\xa2\xbf\xa5\xf6\xf5\xdf\xa3\xcd\xe6\x15\xc8\x1c\xe8\x0f\x48\xbe\xd4\xc6\xa3\x97\x46\xcf\xd7\x15\xc1\x8b\xe9\xe5\xdd\xf4\xf3\xf4\x45\xd3\x44\x71\x3c\xbb\xbc\x1a\xc7\xf1\xef\xb3\x9b\x4f\xe3\xcd\x26\x99\xd1\x42\x1a\xdd\x34\xfc\x7e\x8d\x59\x21\x35\xf1\x96\xa6\x19\x4f\x2f\xef\xc6\xe7\xd7\x93\x56\x28\x9f\x9a\xa6\x09\x06\x48\x39\x7a\xc6\xca\xec\x72\xfa\xa7\xad\xcc\x2e\xa7\xcf\x59\xe9\xe9\x99\x1a\x98\x51\x4e\x56\x67\x04\x57\xa6\xd6\x02\xae\x8c\x05\x5f\x48\x07\x9d\x0f\xc0\x1a\xdb\xcd\x5a\xec\x31\x81\x67\x9f\x68\xb3\x49\xce\x85\xb0\xe4\x5c\xd3\x44\xd1\x7b\x42\x0b\xb7\xd2\x0e\xa2\xff\x12\xc6\xdb\x3a\x1d\xc3\xe7\x3c\x27\x0b\xb9\xb1\x30\x35\x1a\x26\xa6\xac\x0a\x4b\xda\xc9\x25\xc1\xb9\xd6\x35\x2a\xb8\x46\xa9\x3d\x69\x64\xcf\x27\x46\x7b\x8b\x99\x0f\x1b\xfe\x69\x6a\xde\xe5\x79\xb9\xd6\x5e\xea\x05\xec\x90\x81\x5f\x36\x9b\xb2\x7d\x9d\x62\x49\x0e\xf6\x90\xb9\xa6\xf9\x35\x8e\xa3\xe8\x8e\xc0\xe3\x3d\x41\x65\xe5\x52\x2a\x5a\x10\x78\x03\x52\x7b\x6b\x44\x9d\x11\xb0\x62\x47\x2a\x07\x74\x80\xa0\x08\x45\xab\x5c\xd7\x39\x66\xbe\xb6\x64\x01\xb5\x78\xe0\xd9\x6f\xa6\x76\x94\x04\x50\x2b\x74\x1e\x7c\x61\x89\x40\x50\x86\x82\x1c\xac\x08\x0a\x5c\x12\xa4\x44\x1a\x2a\x6b\x96\x32\x68\x74\x64\x97\x32\x23\x07\x52\xc3\x34\xa0\x84\x4a\xfe\x9b\x04\x5c\xa0\xbe\x77\x03\x98\x98\x57\xa6\x22\x8b\x9e\xe1\x08\x6b\xc1\xee\xc4\xd8\xca\x58\xf4\x94\xc0\x1d\x01\x5a\x02\x57\x57\x95\x5a\xb3\xca\x27\xf1\x68\xb7\x1d\xec\x96\x3d\xc7\x3b\x1f\xf2\x10\x0f\x04\x0e\x4b\x0a\xf2\xc6\x17\x64\x21\xb5\xa8\x85\x63\x24\x56\xa4\x54\x12\x45\x1f\x75\x1b\x36\x99\xd1\x9a\xb2\x10\x37\xab\xd6\x8b\x4a\x11\x3a\x12\x8c\xa5\xab\xd3\x52\xfa\x00\x64\x6e\xc9\x15\x80\x2d\x99\x7d\xcb\x59\x9f\xcc\xf5\xf3\x64\x76\x9f\xef\xa5\x16\xbc\xcb\x49\x11\x40\x31\x3a\xf9\x33\x09\x15\xe2\x6d\x46\x9a\x56\xa8\xc0\xfc\x5f\xe2\x6e\xce\xc0\xc9\xc0\x77\x1f\x3e\xe9\x8b\x00\x3d\xa6\x66\xc9\x04\x48\xd1\x81\x33\x60\x70\x57\xa6\x56\x02\x94\xbc\xdf\xc5\x69\x6e\x6c\xc9\x90\x80\x2f\xd0\xb7\xd8\x9c\x5f\x4f\xa0\x22\x2b\x8d\x80\x02\x99\x9c\xb2\x52\xe4\x49\x80\xd1\xc0\x45\x2f\xb9\xfc\x56\x49\xbb\x6e\xab\x5d\x1c\x3f\xc9\xe3\xa0\x8b\x53\xd2\x99\x32\x4c\x65\x41\x96\x82\x7b\x71\x7c\x9e\x5c\x27\x93\x24\x8e\x0f\xbc\xb5\x18\x2a\xf2\x9e\x2c\x50\x9e\xb3\x96\x25\x41\x6e\x4d\x09\xbb\x7a\x0b\xfd\x72\x7b\x13\xfc\x63\xf3\x3f\xe2\x34\xc4\x5e\x66\x74\x2e\x6d\xb9\x23\x39\x8a\xe3\xdf\x4c\x45\xf0\xb9\xb6\x3b\x8c\x5a\xd3\x2d\x92\x8a\x91\x0f\x4e\x06\x8d\x96\xfe\xa8\xa5\xa5\x92\xb4\x4f\xe2\xf8\x61\x2d\x0c\x21\x70\x5b\xa7\xff\xa2\xcc\x33\x85\xbd\x52\x38\xff\xbe\x14\x32\x63\xcc\x3c\xe9\xbe\x70\xfe\xd3\xba\x19\x7d\xcc\x01\xf5\x1a\x32\x85\x56\xe6\x32\x6b\x85\x34\x91\x20\xb1\x4b\x12\xc8\x89\x14\xa7\x46\x60\x34\x43\xa5\xa0\x76\x60\xf4\x18\xe2\x78\xf8\xee\xec\xd5\xe8\xe4\x78\x74\x3c\x1a\x9d\xbd\x3e\x3b\x1b\xbd\x1d\xc1\xf0\xf8\x6c\x74\x16\x58\x9b\x17\xa8\xef\x39\xe4\x98\x7e\xa9\x43\xd8\x94\x84\x7a\x55\x48\xd5\xa6\x2d\x3a\x57\xdb\xbd\x04\x7f\x4e\xc9\x31\x57\xbb\xaa\x16\xb2\x3d\x08\x06\xe8\xd1\xf3\xf1\x02\xec\x6a\x85\x6b\x97\x44\x11\xc7\xb7\x83\x1c\xa5\x2f\xf2\x5a\xa9\xf5\x20\x8a\xa2\x2b\x63\x07\x10\xc7\xbf\x53\x0a\x33\x93\x9a\x12\xef\xe1\x97\x9b\x5f\xe1\x93\x17\x8c\xf1\xae\x7b\x46\x71\x7c\x5e\xfb\xc2\xd8\x50\xc3\x6e\xe5\x42\xa3\x37\x76\xcd\x02\xaf\x9e\x7f\x78\xdb\x3e\x07\x2d\x15\x3f\x4f\x42\xd6\xc7\x6d\x11\x5c\xc1\xb8\x85\x92\x82\x7b\x28\x76\x89\xe8\x2a\xca\x64\x2e\x49\xb4\x18\x49\x07\xb8\xb0\x14\x82\x82\x33\x82\x45\x3d\xd9\xd2\xed\x83\x4d\xc8\x80\x41\xb9\xc7\xc2\x41\x4a\xca\xac\x42\xe8\xcd\x83\xe0\x4b\xb6\xdf\x8a\xb9\x31\xbb\x70\x94\xb4\x31\x73\x50\xdc\xfa\x63\x89\x3d\x02\xe2\x2c\xcd\x48\x74\x75\x75\x97\x9d\x26\xcf\xc1\x68\x82\x35\xb7\xcb\x90\x2a\xfc\x91\x93\x84\x93\xb6\x24\x9d\xb5\xa1\x1b\x8d\x12\xb8\xa0\xdc\xd8\xd0\xaa\x98\xcf\x50\x9c\xd7\xce\x53\x09\xb5\x16\xdc\x83\x3a\xcb\xdc\xa7\x34\x60\x96\x51\xe5\x19\xab\x01\x20\x78\xa6\x7d\x25\x95\x82\x94\x20\x43\x6b\x19\x0d\x53\x7b\x48\xd7\x21\x14\x48\x2f\xa4\x26\xce\x22\x6e\x49\xe4\xd8\xb2\xe3\x38\x61\x3b\x96\xda\x25\xdf\xf6\x9e\xdd\xea\x47\xed\xbc\xf4\x75\x9b\x94\x6f\x12\x38\xd7\x6b\xf8\x60\x96\x64\x75\xf0\x42\xd1\x52\x72\x33\x2b\xab\x50\x3b\xd2\x75\xd8\xb4\xe8\x04\xfe\x0a\xd2\x73\xce\x06\xef\x9d\x37\x46\xb4\x05\xcc\xd5\x59\xb1\xdf\x1c\x1c\xae\x70\x8d\xa9\x22\xa0\x6f\xde\x62\xe0\xe0\x76\xdf\xa5\x66\xc4\x9b\x49\x8c\x77\x6d\x3c\x60\xc0\x39\xd4\x76\x37\x7a\x14\x46\xd7\x4f\x75\xba\x16\xbd\x50\x70\x3b\x04\xbd\x81\x7b\xa2\xea\x41\x10\x49\x0d\x0b\x76\x72\x65\x6c\x20\xa0\x8b\x93\x24\xb0\xdf\xd7\x1d\xdc\xce\xf8\xa4\x90\x1a\x5f\x30\xa0\x4b\x8e\xa5\x65\x9b\x6a\xa9\x25\xbc\x17\x66\xa5\x43\xaa\xbb\x04\x98\xdd\x9b\x83\x4c\xf9\x58\x55\x4a\xfb\x03\x09\xf8\x52\xa3\xf5\x64\xd5\x3a\x60\x3e\x2f\xba\x93\x80\xd4\x99\xaa\x79\xbe\xc0\xdd\xa1\xc6\x90\x29\x42\xcd\xce\x9a\x1c\x5c\x25\xb5\x50\xe4\x06\x5c\xcf\x4d\xe8\xfc\x42\x62\x55\x58\x5c\x94\x90\x15\xa8\x17\x34\xe0\x38\xf7\x90\x15\x94\xf1\x11\x07\xdd\x1b\xef\x9f\xdd\x5c\xef\x99\x2f\x8d\xe7\x0a\xd0\xd7\x8e\xd2\x42\x2e\x15\xd7\xfe\x97\xfd\x6d\xd1\xce\x2c\xd4\x5a\xfa\x24\x3a\x7e\x08\x14\xa3\xd1\x11\xf1\xdd\x51\x45\x5b\xb9\xb4\xb1\x25\xaa\x0e\xf7\x22\x14\xa4\x50\xa2\x54\xf0\x66\xff\x41\x84\x82\xf5\x36\x81\x0b\xc6\x17\x0e\x00\x77\x9a\x2d\xb9\xca\x68\x56\xcd\x0d\x42\x6a\x38\x3e\x85\xc2\xba\x24\x3a\x69\xa3\xb7\x42\xeb\x1d\x08\x2c\x71\xc1\xd9\xc1\xdd\xa3\x52\xc8\x69\x9b\x19\xe7\x1f\xce\x44\x7b\x9d\xa9\xb1\x9a\xf6\xd1\xfd\x20\x25\xa2\xc7\x95\x2d\x8a\xe3\x6e\x74\x78\x4f\x1e\xa5\x6a\x6b\x47\xb7\xd8\xb6\xc4\x31\x3c\xbc\x97\x1c\x1a\x65\x14\x5d\x1b\x41\x0a\x78\x9c\xd8\xce\xd0\xd3\xf6\xc3\xed\xfc\x1f\x47\xa7\x7f\xd9\xce\x8d\x47\x05\x77\xdc\xf6\xe6\xf8\x6d\xfb\xc5\xaf\xb7\xb7\x75\x0a\x61\x79\xdb\x73\x64\xdb\xfd\xd3\xfb\xbf\xf7\xe7\x61\x69\x1b\xbd\x1d\x0e\x3e\x6d\xdf\x0c\x07\xb3\xed\xe8\xed\x60\xd6\xbe\x1d\x1d\xf3\xda\x68\x30\xdb\x86\x0e\x67\x39\x6a\xfa\x73\x0d\xdf\x02\x82\x8f\x4d\xb3\xdd\x6c\xa4\x16\x12\xf5\xa4\xb6\x16\x92\x59\x98\x35\x1e\x2c\x5e\x41\xf2\xc1\xf9\xef\x17\x83\xd7\x7c\x96\x39\x7e\x0b\x5f\x93\x2f\x7e\xfd\x8c\x58\xd3\x6c\x7b\xbd\x76\x77\xd5\x48\x66\xdc\x9b\x3f\xe7\x79\xd3\x44\xfb\xd7\x2d\x3f\x8f\x34\x1c\xc4\xfa\x4a\x3e\xf0\x8c\xdb\x22\xf7\xc4\x9e\xce\x6a\xaf\xcf\xdd\xe0\x3a\x94\x8d\x1d\xa9\x4c\xd4\x66\xb3\x1b\x41\xdb\xab\x1a\xbc\xb8\x98\xbd\xe7\xc1\x73\x2f\xca\xf3\xfb\x5e\x7e\x7b\xfe\x3a\x0b\x9c\x8e\xa1\xdf\x52\x6f\x96\x3e\x09\x3d\xf5\xab\x0e\xd2\xad\xc4\xed\xc5\xc7\xaf\xfa\xc2\xa2\xce\x8a\x31\x7c\x56\x02\x6e\x50\x58\x84\x99\x41\xf1\x55\x9f\xbf\x9e\xc0\xd4\x8c\xe1\xcd\x9b\x77\xef\x4e\xdf\x9d\x1e\x9d\x8c\x86\x5f\xf5\xc7\xab\xdb\x09\x4c\x8c\x68\x37\x4f\x87\xc3\xa3\xe1\xc9\xe9\xbb\x6d\x7f\x16\xfa\xdf\x7a\x75\x63\xd4\xda\x53\x56\x68\x99\xc1\x00\xce\x8b\x92\x04\xa6\x0f\xdc\x1b\x9e\xbd\x3d\x39\x3e\x39\x3a\x3d\x1b\x3d\xe1\xde\xf0\x68\x78\xfc\xa6\x4f\xc8\x33\xa3\xc2\xf6\xbb\xd9\xe1\x94\x23\xf6\x68\x78\x34\xf8\xb4\xed\x8e\x14\xfa\x35\xc7\xd0\x6e\x21\xfc\x1d\xf8\x6b\xe9\xe3\xc1\xa4\x1d\x8c\x2f\xa8\x40\x95\x73\x31\xeb\xa5\xf1\xe3\x6b\xee\x53\xe2\x8f\xe0\x61\x74\x7e\x34\x04\xd5\x96\xe0\x25\xdc\x7a\x2c\x2b\x1e\xa0\x0f\xcf\x4f\x65\x59\xdd\xee\x87\x8b\xe7\x2f\xe2\x3f\x7c\x9e\x1a\xc4\x0f\xbf\x7b\xc4\x71\xf4\x9f\x00\x00\x00\xff\xff\xa6\xce\x19\xbf\x1a\x11\x00\x00")

func templatesNoncompNcmMdBytes() ([]byte, error) {
	return bindataRead(
		_templatesNoncompNcmMd,
		"templates/NONCOMP/ncm.md",
	)
}

func templatesNoncompNcmMd() (*asset, error) {
	bytes, err := templatesNoncompNcmMdBytes()
	if err != nil {
		return nil, err
	}

	info := bindataFileInfo{name: "templates/NONCOMP/ncm.md", size: 4378, mode: os.FileMode(420), modTime: time.Unix(1531908010, 0)}
	a := &asset{bytes: bytes, info: info}
	return a, nil
}

// Asset loads and returns the asset for the given name.
// It returns an error if the asset could not be found or
// could not be loaded.
func Asset(name string) ([]byte, error) {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	if f, ok := _bindata[cannonicalName]; ok {
		a, err := f()
		if err != nil {
			return nil, fmt.Errorf("Asset %s can't read by error: %v", name, err)
		}
		return a.bytes, nil
	}
	return nil, fmt.Errorf("Asset %s not found", name)
}

// MustAsset is like Asset but panics when Asset would return an error.
// It simplifies safe initialization of global variables.
func MustAsset(name string) []byte {
	a, err := Asset(name)
	if err != nil {
		panic("asset: Asset(" + name + "): " + err.Error())
	}

	return a
}

// AssetInfo loads and returns the asset info for the given name.
// It returns an error if the asset could not be found or
// could not be loaded.
func AssetInfo(name string) (os.FileInfo, error) {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	if f, ok := _bindata[cannonicalName]; ok {
		a, err := f()
		if err != nil {
			return nil, fmt.Errorf("AssetInfo %s can't read by error: %v", name, err)
		}
		return a.info, nil
	}
	return nil, fmt.Errorf("AssetInfo %s not found", name)
}

// AssetNames returns the names of the assets.
func AssetNames() []string {
	names := make([]string, 0, len(_bindata))
	for name := range _bindata {
		names = append(names, name)
	}
	return names
}

// _bindata is a table, holding each asset generator, mapped to its name.
var _bindata = map[string]func() (*asset, error){
	"templates/COMP/ccm.md": templatesCompCcmMd,
	"templates/COMP/ncm.md": templatesCompNcmMd,
	"templates/NONCOMP/ccm.md": templatesNoncompCcmMd,
	"templates/NONCOMP/ncm.md": templatesNoncompNcmMd,
}

// AssetDir returns the file names below a certain
// directory embedded in the file by go-bindata.
// For example if you run go-bindata on data/... and data contains the
// following hierarchy:
//     data/
//       foo.txt
//       img/
//         a.png
//         b.png
// then AssetDir("data") would return []string{"foo.txt", "img"}
// AssetDir("data/img") would return []string{"a.png", "b.png"}
// AssetDir("foo.txt") and AssetDir("notexist") would return an error
// AssetDir("") will return []string{"data"}.
func AssetDir(name string) ([]string, error) {
	node := _bintree
	if len(name) != 0 {
		cannonicalName := strings.Replace(name, "\\", "/", -1)
		pathList := strings.Split(cannonicalName, "/")
		for _, p := range pathList {
			node = node.Children[p]
			if node == nil {
				return nil, fmt.Errorf("Asset %s not found", name)
			}
		}
	}
	if node.Func != nil {
		return nil, fmt.Errorf("Asset %s not found", name)
	}
	rv := make([]string, 0, len(node.Children))
	for childName := range node.Children {
		rv = append(rv, childName)
	}
	return rv, nil
}

type bintree struct {
	Func     func() (*asset, error)
	Children map[string]*bintree
}
var _bintree = &bintree{nil, map[string]*bintree{
	"templates": &bintree{nil, map[string]*bintree{
		"COMP": &bintree{nil, map[string]*bintree{
			"ccm.md": &bintree{templatesCompCcmMd, map[string]*bintree{}},
			"ncm.md": &bintree{templatesCompNcmMd, map[string]*bintree{}},
		}},
		"NONCOMP": &bintree{nil, map[string]*bintree{
			"ccm.md": &bintree{templatesNoncompCcmMd, map[string]*bintree{}},
			"ncm.md": &bintree{templatesNoncompNcmMd, map[string]*bintree{}},
		}},
	}},
}}

// RestoreAsset restores an asset under the given directory
func RestoreAsset(dir, name string) error {
	data, err := Asset(name)
	if err != nil {
		return err
	}
	info, err := AssetInfo(name)
	if err != nil {
		return err
	}
	err = os.MkdirAll(_filePath(dir, filepath.Dir(name)), os.FileMode(0755))
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(_filePath(dir, name), data, info.Mode())
	if err != nil {
		return err
	}
	err = os.Chtimes(_filePath(dir, name), info.ModTime(), info.ModTime())
	if err != nil {
		return err
	}
	return nil
}

// RestoreAssets restores an asset under the given directory recursively
func RestoreAssets(dir, name string) error {
	children, err := AssetDir(name)
	// File
	if err != nil {
		return RestoreAsset(dir, name)
	}
	// Dir
	for _, child := range children {
		err = RestoreAssets(dir, filepath.Join(name, child))
		if err != nil {
			return err
		}
	}
	return nil
}

func _filePath(dir, name string) string {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	return filepath.Join(append([]string{dir}, strings.Split(cannonicalName, "/")...)...)
}

