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

var _templatesCompCcmMd = []byte("\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\xff\xcc\x58\x6d\x6f\xdb\x38\x12\xfe\xae\x5f\x31\x28\x70\xc5\xae\xe0\xaa\x89\x9b\x34\x89\xef\x70\xb8\xc4\x49\xba\xc5\x25\xde\xd4\x0e\x36\x38\xa0\x5f\xc6\xe2\xc8\xe2\x86\x22\xb5\x24\x65\x47\x67\xfb\xbf\x1f\x86\xf4\x6b\x93\xb4\xb8\x97\x0f\xa7\x0f\xad\x42\x0d\xc9\x87\xcf\x3c\xf3\x42\xa7\xe9\x25\x7a\xea\xa5\xe9\x7c\x2e\xd0\x93\xbb\xae\x3c\x64\x3c\xb4\x5c\x26\x7f\x19\xdb\xf7\x7f\x4d\xe6\xf3\x77\x20\x0b\xa0\x3f\x20\xfb\xd2\x18\x8f\x5e\x1a\xbd\x7d\xbb\x6f\x6b\x82\x37\x83\xab\x87\x37\xcb\x25\x24\x69\x3a\xbc\xba\xee\xa5\xe9\x6f\xc3\xbb\x9b\xde\x7c\xbe\x33\x61\x48\x13\x69\xf4\x72\xb9\x3f\x7a\x8b\x79\x29\x35\xf1\x22\xcb\x65\x6f\x70\xf5\xd0\x3b\xbf\xed\x7f\x3b\xb1\x18\x98\xe5\x32\xc0\x20\xe5\xe8\x87\x58\x86\x57\x83\x37\xcb\xe5\x7f\x09\x65\x78\x35\xf8\x31\x94\x9d\x5d\x06\x06\x86\x54\x58\xd2\x39\xc1\xb5\x69\xb4\x80\x6b\x63\xc1\x97\xd2\xc1\x66\x3e\xf0\xda\x71\xb2\x16\x6b\x7a\xe1\xd5\x27\xd9\xdb\xfb\x5c\x08\x4b\xce\x2d\x97\x49\x72\x49\x68\x61\x24\x6d\x27\xf9\x37\x7c\x93\xa4\xe9\xa8\x19\xf7\xe0\xd7\xa2\x20\x0b\x85\xb1\xd0\x37\x55\x5d\x5a\xd2\x4e\x4e\x09\xce\xb5\x6e\x50\xc1\x2d\x4a\xed\x49\x23\x1f\xa3\x6f\xb4\xb7\x98\xfb\x60\xfc\x0f\xd3\x58\xe8\x37\x96\x4f\xd8\x42\xdf\x34\xda\x4b\x3d\x79\x0f\x97\xe4\x29\xe7\x57\x58\xf1\xe7\xe0\xa7\xf9\xbc\x8a\xef\x03\xac\xc8\xc1\x73\x8e\xdd\x72\xf9\x73\x9a\x26\xc9\x03\x81\xc7\x47\x82\xda\xca\xa9\x54\x34\x21\xf0\x06\xa4\xf6\xd6\x88\x26\x27\xe0\x2d\x1d\xa9\x02\xd0\x01\x82\x22\x14\x71\x1f\xdd\x14\x98\xfb\xc6\x92\x05\xd4\x62\x0f\xf3\x2f\xa6\x71\x94\x05\xee\x6b\x74\x1e\x7c\x69\x89\x40\x50\x8e\x82\x1c\xcc\x08\x4a\x9c\x12\x8c\x89\x34\xd4\xd6\x4c\x65\x58\xd1\x91\x9d\xca\x9c\x1c\x48\x0d\x83\x00\x14\x95\xfc\x27\x09\xb8\x40\xfd\xe8\x3a\xd0\x37\xef\x4c\x4d\x16\x3d\x13\x15\xc6\xc2\xbe\x7d\x63\x6b\x63\xd1\x53\x06\x0f\x04\x68\x09\x5c\x53\xd7\xaa\xe5\x25\x07\xc6\xd3\x86\xa5\x2d\x35\x3c\x6d\xbb\x6f\xb5\x03\x7c\x83\xa1\x08\xb2\x21\x70\x58\x51\xb0\x37\xbe\x24\x0b\x63\x8b\x5a\x38\x66\x62\x46\x4a\x65\x49\xf2\x59\x47\x75\xe5\x46\x6b\xf6\x80\xd1\x7c\x3c\x46\x51\x2b\x42\x17\xa8\x74\xcd\xb8\x92\x3e\xf0\x58\x58\x72\x25\x60\xf4\xf2\xee\xc6\xf9\xae\x97\x5b\x36\x7d\x11\xfb\xf6\xf3\xa3\xd4\x82\x67\x39\x29\x02\x27\x46\x67\xff\x41\x6c\x06\x2d\x0e\x49\xd3\x0c\x15\x98\xff\x23\x4d\xde\x33\xa9\x32\x68\x61\x97\x5a\xe9\xcb\xe0\x16\x1c\x9b\x29\x3b\x47\x8a\x0d\x73\x1d\x26\x7e\x66\x1a\x25\x40\xc9\xc7\x95\x86\x0b\x63\x2b\xe6\x0b\x7c\x89\x3e\x12\x77\x7e\xdb\x87\x9a\xac\x34\x02\x4a\x64\xc7\x55\xb5\x22\x4f\x02\x8c\x06\x4e\xbf\x3b\x98\xae\x9e\x6a\x69\xdb\x98\x85\x19\xd4\x73\x67\x77\x36\x62\x26\x9d\x2b\xe3\x48\x40\x49\x96\x02\xce\x34\x3d\xcf\x6e\xb3\x7e\x96\xa6\x5b\xef\x46\x8a\x15\x79\x4f\x16\xa8\x28\x78\x95\x29\x41\x61\x4d\x05\xab\x12\x00\xbb\x15\x60\x8b\xe5\x2e\x40\x66\x1c\xdf\xd3\x40\x90\x6a\x6e\x74\x21\x6d\xb5\x12\x45\x92\xa6\xbf\x98\x3a\x86\x71\xa4\x2d\x82\x88\xe4\x2a\x16\x55\x80\x1b\x56\xb4\xf4\x47\x23\x2d\x55\xa4\x7d\x96\xa6\xfb\x19\x36\x68\x65\xd4\x8c\x7f\xa7\xdc\xb3\x3a\x77\x12\xec\xfd\xf3\x04\xcb\x7c\xb1\x4c\x48\xef\x1a\x17\x3f\xcc\xc6\xc9\xe7\x02\x50\xb7\x90\x2b\xb4\xb2\x90\x79\x34\xd2\x44\x82\xc4\x3a\xa6\x0a\x22\xc5\xa1\x14\x9c\x9c\xa3\x52\xd0\x38\x30\xba\x07\x69\x7a\x70\x72\xf6\xae\xfb\xf1\xa8\x7b\xd4\xed\x9e\xbd\x3f\x3b\xeb\x1e\x77\xe1\xe0\xe8\xac\x7b\x96\xa6\x19\x8b\x0a\xf5\x23\x0b\x92\x15\x21\x75\x50\x52\x45\xa8\x67\xa5\x54\x31\xca\xd1\xb9\xc6\xae\x2d\xf8\xf3\x98\x1c\x7b\x6d\x95\x04\x43\x72\x08\x86\x81\x7a\xf4\x7c\xbc\x40\xbb\x9a\x61\xeb\xb2\x24\xe1\x60\x70\x50\xa0\xf4\x65\xd1\x28\xd5\x76\x92\x24\xb9\x36\xb6\x03\x69\xfa\x1b\x8d\x61\x68\xc6\xa6\xc2\x47\xf8\xe9\xee\x67\xb8\xf1\x82\x39\x5e\x95\xf7\x24\x4d\xcf\x1b\x5f\x1a\x1b\x52\xde\x48\x4e\x34\x7a\x63\x5b\x36\x78\xf7\xfa\xc3\xd3\x38\x58\x2d\x95\x3f\x8e\x56\x5e\x8b\xcb\x30\xb8\x92\x39\x0b\xe9\x07\xd7\x34\xac\xf2\x8b\xab\x29\x97\x85\x24\x11\xf9\x91\x0e\x70\x62\x29\x08\x82\x03\x84\x4d\x3d\xd9\xca\xad\x85\x26\x64\x38\x7f\xb5\xe6\xc1\xc1\x98\x94\x99\x05\xd9\xdd\x07\xc3\xb7\xbc\x7f\x34\x73\x3d\x86\x70\x98\x45\xbd\x6c\x17\x8e\x78\x2c\x31\x22\x20\x0e\xda\x9c\xc4\x26\x05\xaf\x82\xd5\x14\x05\x18\x4d\xd0\x72\xd9\x0d\x01\xc3\x1f\x39\x54\x38\x86\x2b\x2e\xf9\x41\xb6\x49\x37\x83\x0b\x2a\x8c\x0d\x55\x8d\x7d\x19\xf2\x78\xeb\x3c\x55\xd0\x68\xc1\xe5\x6a\xb3\x33\x97\x34\x0d\x98\xe7\x54\x7b\xe6\xaa\x03\x08\x9e\x5d\x3e\x93\x4a\xc1\x98\x20\x47\x6b\x99\x0d\xd3\x78\x18\xb7\x41\x06\xa4\x27\x52\x13\x47\x10\x57\x2f\x72\xbc\xb3\x63\x8d\xf0\x3e\x96\xe2\x90\x8f\x65\x6a\x35\xfa\x59\x3b\x2f\x7d\x13\x03\xf2\x43\x06\xe7\xba\x85\x4f\x66\x4a\x56\x07\x14\x8a\xa6\x92\xeb\x5e\x55\x87\x0c\x32\x6e\xc3\xa4\xc9\xc6\xe0\xcf\x20\x3d\xc7\x6b\x40\xef\xbc\x31\x22\xe6\x33\xd7\xe4\xe5\x7a\x72\x00\x5c\x63\x8b\x63\x45\x40\x4f\xde\x62\xf0\xc1\x68\x5d\xd0\x86\xc4\x93\x49\xf4\x56\x15\x3f\x70\xc0\xf1\x13\x0b\x21\xc1\xbe\x8c\x6e\x5f\x2a\x8a\x91\xbd\x90\x7f\x37\x0c\x7a\x03\x8f\x44\xf5\x9e\x88\xa4\x86\x09\x83\x9c\x19\x1b\x1c\xb0\xd1\x49\x16\xbc\xbf\xbb\x76\x80\x9d\xf3\x49\x61\x6c\x7c\xc9\x84\x4e\x59\x4b\xd3\x18\x66\x63\x4b\xf8\x28\xcc\x4c\x87\x30\x77\x2b\xe5\x84\x49\x52\xe7\xaa\x11\x14\x36\xce\x4d\x8c\xd2\x20\x17\xb4\xde\x01\x3d\xb1\x4b\xc1\x97\xc6\xd1\x26\x45\x52\xcc\x96\x4d\x15\x48\x0a\x55\x62\xe4\x31\x7f\x24\x0b\x6f\xe1\xef\xd4\xd6\x28\x60\xe4\x25\x0f\x04\x19\xdd\x6d\xc1\x54\xdf\x62\x1e\xd3\x9a\x39\x01\x5f\x1a\xb4\x9e\xac\x6a\x83\x73\x77\x8f\xc7\x67\xd8\xd0\xf7\x6c\x9e\x88\xb9\x46\x1b\x5b\xa1\xda\xb0\x55\x86\x14\x12\x92\x8a\x0a\x27\x5a\x7f\x10\x21\xc5\x1c\x65\x70\xc1\xac\xc0\x96\x96\xcd\xca\x96\x5c\x6d\x34\x2f\xcd\x29\x5d\x6a\x38\x3a\x85\xd2\xba\x2c\x39\xce\xe0\x81\x6d\xb4\xf1\x2b\xb6\x79\xf1\x5a\xa1\xf3\x32\x0f\x94\xc1\xdb\x90\x76\xef\xca\xd6\xc9\x1c\x15\x5c\x62\x85\x13\x0a\x1a\xba\x7a\x62\xa6\xa5\x9e\x04\xed\xdc\xe2\xef\xc6\x42\x53\xc3\xc4\xa2\x88\xd9\x79\xc5\x7c\x8c\xb1\x2c\x49\x58\xde\x0c\x9a\x75\x48\x56\xa3\x62\x95\xec\x65\x19\x16\x2e\xba\x3d\x56\x57\x8b\xa0\xf7\x98\x97\x31\x38\xf3\x9c\x9c\x33\x96\xe5\x4d\x3e\xcf\x02\x7a\x63\xe5\x44\x6a\x54\xaa\x5d\x2b\x40\xac\x53\xf9\xba\xca\x66\x30\xa4\x1a\xa5\x0d\x41\x59\xa1\x2a\x1a\x1d\x8a\x35\x73\x68\x2c\x88\x70\x32\x66\x3f\xe8\xdf\xa2\x87\xb1\xf4\xe4\x3a\xab\x2f\x6e\xfd\x05\xf3\x5c\x0a\xd2\xbe\x03\xde\xa2\x76\xb5\xb1\x7e\x5d\x8d\x26\x4a\x4e\x28\xe4\x0b\x8d\xbe\xb1\xa8\x40\x48\x87\x8e\xab\x3a\x93\xe3\xc2\x71\xb4\xd1\xef\x9c\x47\x2d\xd0\x0a\x20\x45\xb9\xb7\x81\xda\xda\xcc\x56\x3d\x73\x7c\x2b\x54\x93\xfb\x66\x45\xa5\x05\x57\x1a\xeb\x21\x97\x36\x6f\xa4\xcf\x5e\x4f\xff\x49\x4c\xfe\xab\xce\xe2\x92\x3c\x4a\x15\x33\xec\x66\x30\x36\x0d\x3d\xd8\xbf\x56\xbe\xd4\x54\x24\xc9\xad\x11\xa4\x80\xfb\xb2\xc5\x10\x3d\x2d\x3e\x8d\xee\xff\x76\x78\xfa\xa7\xc5\xbd\xf1\xa8\xe0\x81\x5b\x84\x7b\x7c\x5a\x7c\xf1\xed\x62\xd4\x8c\x21\x0c\x2f\x76\xc0\x2d\x36\xff\xec\xfc\xbf\xf3\xe7\x76\x68\x91\x1c\x1f\x74\x6e\x16\x1f\x0e\x3a\xc3\x45\xf7\xb8\x33\x8c\x6f\x87\xc7\x9d\x9b\xf8\x67\xe8\x06\x2c\xea\x09\xbd\xdc\x20\xf2\x8d\x2c\xa0\x5d\x2e\x17\xf3\xb9\xd4\x42\xa2\xe6\xfe\x13\xb2\x61\x68\xd5\xf6\x06\xaf\x21\xfb\xe4\xfc\xf3\xc1\x80\x9f\x4f\x75\x8f\x4f\xe1\x6b\xf6\xc5\xb7\xaf\x98\x2d\x97\x8b\x9d\x0e\xe5\x13\xdf\x01\xe2\xf1\xf9\xf9\x66\xc2\x16\xf0\x66\xea\x4e\x89\xbf\xc3\x36\x48\x7b\xe5\x2d\xe6\x7d\x3e\x7f\xd6\xad\xc7\x9b\x31\xbc\xb9\x18\x5e\x72\x9b\xbe\x9e\xc4\x77\x9e\xf5\xcc\xc5\xf9\xfb\x3c\x38\xab\x07\xbb\x7d\xc5\xdd\xd4\x67\xa1\xb1\xf8\xaa\x83\x75\xb4\x18\x5d\x7c\xfe\xaa\x2f\x2c\xea\xbc\xec\xc1\xaf\x4a\xc0\x1d\x0a\x8b\x30\x34\x28\xbe\xea\xf3\xf7\x7d\x18\x98\x1e\x7c\xf8\x70\x72\x72\x7a\x72\x7a\xf8\xb1\x7b\xf0\x55\x7f\xbe\x1e\xf5\xa1\x6f\x44\x9c\x3c\x38\x38\x38\x3c\xf8\x78\x7a\xb2\xd8\x6d\x08\xff\xb7\xa8\xee\x8c\x6a\x3d\xe5\xa5\x96\x39\x74\xe0\xbc\xac\x48\xe0\x78\x0f\xde\xc1\xd9\xf1\xc7\xa3\x8f\x87\xa7\x67\xdd\x17\xe0\x1d\x1c\x1e\x1c\x7d\xd8\x75\xd2\x2b\x31\xb3\x78\x16\x44\xa7\x27\x9d\x9b\xc5\xe9\x69\xe7\x66\xb1\x39\x51\xe8\x5b\x16\x7b\x37\x81\xd5\xa7\xf0\x25\xb8\x34\x7a\x94\xdb\xb4\x78\x73\xb8\xa0\x12\x55\xc1\x51\xbf\x53\xeb\xf7\x7f\x48\x78\xc9\xf8\x1b\x96\x98\xa4\xef\x35\x84\x8d\x25\x78\xcb\x35\xab\xaa\xf9\x5a\xb1\x7e\x7e\x68\xc9\x8b\xad\x7e\x5f\x7a\xfd\x87\x8e\xef\x3c\x2f\x5d\x4d\x36\xd7\xa2\x7f\x05\x00\x00\xff\xff\xf6\x68\xdb\x0f\xbb\x12\x00\x00")

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

	info := bindataFileInfo{name: "templates/COMP/ccm.md", size: 4795, mode: os.FileMode(420), modTime: time.Unix(1526324821, 0)}
	a := &asset{bytes: bytes, info: info}
	return a, nil
}

var _templatesCompNcmMd = []byte("\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\xff\xc4\x58\x6d\x4f\x1b\x3b\x16\xfe\x3e\xbf\xe2\x08\x69\xab\x7b\x47\xe9\x14\x28\x14\xc8\xae\x56\x0b\x14\x7a\xd1\x42\x4a\x03\xba\xd5\x4a\xfd\x72\x62\x9f\xc9\xf8\xe2\xb1\xe7\xda\x9e\x84\x6c\x92\xff\xbe\x3a\xf6\x24\x24\x05\x6e\xb5\x2f\xd2\xce\x87\x76\xf0\xf8\xd8\x8f\x9f\xe7\xbc\x39\x79\xfe\x11\x03\xf5\xf3\x7c\x3e\x97\x18\xc8\x5f\xd6\x01\x0a\x1e\x5a\x2e\xb3\xbf\x8c\xdc\xbb\xbf\x66\xf3\xf9\x5b\x50\x25\xd0\xef\x50\x7c\x69\x6d\xc0\xa0\xac\x79\x7a\xbb\x9f\x35\x04\x3b\x83\x8b\xaf\x3b\xcb\x65\x96\xe7\xc3\x8b\xcb\x7e\x9e\xff\x3a\xbc\xbd\xee\xcf\xe7\x1b\xf3\x87\x34\x56\xd6\x2c\x97\xdb\xa3\x37\x28\x2a\x65\x88\xd7\x58\x2e\xfb\x83\x8b\xaf\xfd\xd3\x9b\xf3\xef\x0d\xcb\x81\x5d\x2e\x23\x0a\xd2\x9e\x7e\x08\x65\x78\x31\xf8\xef\xa1\x0c\x2f\x06\x3f\x86\xb2\xb1\xcb\xc0\xc2\x90\x4a\x72\x46\x10\x5c\xda\xd6\x48\xb8\xb4\x0e\x42\xa5\x3c\xac\xed\x81\xd7\x4e\xc6\x46\xae\xd8\x85\x57\x9f\x6c\x6b\xef\x53\x29\x1d\x79\xbf\x5c\x66\xd9\x47\x42\x07\x77\xca\xf5\xb2\x7f\x4f\x9a\xbb\x76\xd4\x87\xcf\x65\x49\x0e\x4a\xeb\xe0\xdc\xd6\x4d\xe5\xc8\x78\x35\x21\x38\x35\xa6\x45\x0d\x37\xa8\x4c\x20\x83\x7c\x8c\x73\x6b\x82\x43\x11\xe2\xe4\x7f\xd8\xd6\xc1\xc0\x06\x1e\x6e\x4d\x50\x66\x0c\x1d\x61\xf0\xd3\x7c\x5e\xa7\xd7\x01\xd6\xe4\xe1\x39\xa7\x7e\xb9\xfc\x39\xcf\xb3\xec\x2b\x41\xc0\x07\x82\xc6\xa9\x89\xd2\x34\x26\x08\x16\x94\x09\xce\xca\x56\x10\xf0\x16\x9e\x74\x09\xe8\x01\x41\x13\xca\xb4\x8d\x69\x4b\x14\xa1\x75\xe4\x00\x8d\xdc\xc2\xf8\x8b\x6d\x3d\x15\x91\xeb\x06\x7d\x80\x50\x39\x22\x90\x24\x50\x92\x87\x29\x41\x85\x13\x82\x11\x91\x81\xc6\xd9\x89\x8a\x2b\x7a\x72\x13\x25\xc8\x83\x32\x30\x88\x40\x51\xab\x7f\x92\x84\x33\x34\x0f\xbe\x07\xe7\xf6\xad\x6d\xc8\x61\x60\x62\xe2\x58\xdc\xf7\xdc\xba\xc6\x3a\x0c\x54\xc0\x57\x02\x74\x04\xbe\x6d\x1a\x3d\xe3\x25\x5f\x64\x26\x99\x3d\xed\x5b\x6f\x00\x5f\x63\x28\xa3\x9b\x10\x78\xac\x29\xce\xb7\xa1\x22\x07\x23\x87\x46\x7a\x66\x62\x4a\x5a\x17\x59\x76\x65\x92\x37\x09\x6b\x0c\x89\xe8\x4e\xd3\x84\xa2\xd1\x84\x9e\x24\x73\xe9\xdb\x51\xad\x42\x24\xb2\x74\xe4\x2b\xc0\x24\xeb\xe6\xce\x62\x53\xd6\xd9\xeb\xb2\xae\x3f\x3f\x28\x23\xd9\xca\x2b\x19\x49\xb1\xa6\xf8\x0f\x82\x31\x3a\xdf\x90\x0c\x4d\x51\x83\xfd\x3f\x3a\xe1\x3d\xb3\xa8\xa2\xf8\x9b\x5c\xaa\x50\x45\x1d\x70\x64\x27\xac\x86\x92\x6b\xa6\x7a\xcc\xf4\xd4\xb6\x5a\x82\x56\x0f\x9d\xd3\x96\xd6\xd5\xcc\x0f\x84\x0a\x43\x22\xea\xf4\xe6\x1c\x1a\x72\xca\x4a\xa8\x90\x95\xaa\x1b\x4d\x81\x24\x58\x03\x9c\x5e\x37\x30\x5d\x3c\x36\xca\xcd\x52\x96\xcd\xf3\x17\xe5\xed\xad\xdd\x97\x8c\xd0\x96\x15\xae\xc8\x51\x04\x9a\xe7\xa7\xc5\x4d\x71\x5e\xe4\xf9\x93\x9c\x89\x53\x4d\x21\x90\x03\x2a\x4b\x5e\x65\x42\x50\x3a\x5b\x43\x97\xe3\x61\x33\xc5\x3f\x81\xb9\x8d\x98\x19\xc8\x1f\x89\x1e\x9d\x53\x58\x53\x2a\x57\x77\x5e\x90\xe5\xf9\x2f\xb6\x21\xf8\xdc\xba\x8e\xb7\x04\x22\xb1\xab\x59\x97\x08\x37\xae\xe8\xe8\xf7\x56\x39\xaa\xc9\x84\x22\xcf\xb7\x73\x68\x74\x8e\xbb\x76\xf4\x1b\x89\xc0\x02\x6f\xa4\xd0\xfb\xe7\x29\x94\x55\x64\xbf\x20\xb3\x39\xb9\xfc\x61\xbe\xcd\xae\x4a\x40\x33\x03\xa1\xd1\xa9\x52\x89\x34\x49\xf9\x15\x34\xd9\x85\x12\x94\x44\x9a\x03\x28\x4a\x2d\x50\x6b\x68\x7d\x12\xf1\xe4\x64\xff\x70\x7f\xf7\xe0\x64\xff\x04\xde\xc1\xee\xd1\xc9\xdb\xfd\x0f\x07\xfb\x07\xfb\xfb\x27\x51\xc4\xfb\x0a\xcd\x03\x7b\x25\xfb\x85\x32\xd1\x9f\x6a\x42\x33\xad\x94\x4e\xc1\x8d\xde\xb7\x6e\x35\x83\x3f\x8f\xc8\xb3\x74\x5d\xee\x8b\x39\x21\x4e\x8c\xfc\x63\xe0\x33\x46\xee\xf5\x14\x67\xbe\xc8\x32\x0e\x01\x0f\x25\xaa\x50\x95\xad\xd6\xb3\x5e\x96\x65\x97\xd6\xf5\x20\xcf\x7f\xa5\x11\x0c\xed\xc8\xd6\xf8\x00\x3f\xdd\xfe\x0c\xd7\x41\x32\xd1\x5d\x11\xcf\xf2\xfc\xb4\x0d\x95\x75\x31\xd3\xdd\xa9\xb1\xc1\x60\xdd\x8c\x27\xbc\x7d\xfd\x61\x33\x0e\x51\x47\xd5\x8f\x63\x94\xd7\xe2\x6a\x0b\xbe\x62\xce\x62\xd2\xc1\x15\x0d\x5d\x9c\xfa\x86\x84\x2a\x15\xc9\xc4\x8f\xf2\x80\x63\x47\xd1\x2b\x98\x61\x9e\x1a\xc8\xd5\x7e\xe5\x6d\x52\xc5\xf3\xd7\x2b\x1e\x3c\x8c\x48\xdb\x69\xf4\xbd\xfb\x38\xf1\x0d\xef\x9f\xa6\xf9\x3e\x43\xd8\x2b\x92\xd3\x3c\x2d\x9c\xf0\x38\x62\x44\x40\x1c\xba\x82\xe4\x3a\xf3\x76\x21\x6b\xcb\x12\xac\x21\x98\x71\x75\x8d\x51\xc3\x1f\x39\x5e\x38\x92\x6b\x32\x22\xf9\x6e\xb6\x5f\xc0\x19\x95\xd6\xc5\x62\xc6\x5a\xc6\xf4\x3d\xf3\x81\x6a\x68\x8d\xe4\x2a\xb5\xde\x99\x2b\x99\x01\x14\x82\x9a\xc0\x5c\xf5\x00\x21\xb0\xe4\x53\xa5\x35\x8c\x08\x04\x3a\xc7\x6c\xd8\x36\xc0\x68\x16\xdd\x80\xcc\x58\x19\xe2\x30\xe2\xa2\x45\x9e\x77\xf6\xec\x23\xbc\x8f\xa3\x34\x14\x52\x75\xea\x46\xaf\x8c\x0f\x2a\xb4\x29\x2a\xdf\x17\x70\x6a\x66\xf0\xc9\x4e\xc8\x99\x88\x42\xd3\x44\x71\xb9\xab\x9b\x98\x46\x46\xb3\x68\x34\x5e\x4f\xf8\x33\xa8\xc0\x71\x10\xd1\xfb\x60\xad\x4c\x59\xcd\xb7\xa2\x5a\x19\x47\xc0\x0d\xce\x70\xa4\x09\xe8\x31\x38\x8c\x1a\xdc\xad\xea\xd8\x90\xd8\x98\x64\xbf\x2b\xf4\x91\x03\x8e\x9f\x54\xff\x08\xb6\xdd\xe8\xe6\xa5\x5a\x98\xd8\x8b\x59\x78\xcd\x60\xb0\xf0\x40\xd4\x6c\x39\x91\x32\x30\x66\x90\x53\xeb\xa2\x00\x6b\x3f\x29\xa2\xfa\x9b\x6b\x47\xd8\x82\x4f\x0a\x23\x1b\x2a\x26\x74\xc2\xbe\x34\x49\x61\x36\x72\x84\x0f\xd2\x4e\x4d\x0c\x73\xdf\x79\x4e\x34\x52\x46\xe8\x56\x52\xdc\x58\xd8\x14\xa5\xd1\x5d\xd0\x05\x0f\xf4\xc8\x92\x42\xa8\xac\xa7\x75\x9e\x24\x0e\xf0\xf8\x57\x5b\x47\x9e\x62\xb9\xd8\xf9\xfc\x77\xf0\x01\xeb\x66\x07\xde\xc0\xce\x95\x79\x80\x33\x1b\x82\xa6\x9d\xe8\x4a\xb7\x4f\x80\xea\xef\x71\x8f\x68\xc5\x9e\x84\x2f\x2d\xba\x40\x4e\xcf\xa2\xc0\xf7\xd5\x9a\xb6\x15\xd0\xd8\x2c\x44\x06\xfb\x20\x34\xa1\x61\x66\x6c\x09\xbe\x51\x46\x6a\xf2\x3d\xae\x23\x36\x36\x22\x52\x61\x53\x39\x1c\xd7\x20\x2a\x34\x63\xea\x71\x50\x05\x10\x15\x09\xe6\xb3\xb7\x7e\x63\xfb\xe1\xed\xcd\xea\xe8\xb5\x0d\x9c\x6a\x36\x57\x47\xe5\xa0\x54\x9a\x6b\xce\x9b\x2d\xb3\x6e\x5b\x68\x8d\x0a\x45\x76\xb0\xad\x0a\x53\xbf\x56\xfd\xd9\x51\x65\x4a\x91\xc6\xba\x1a\xf5\x5a\xe4\x2a\x66\xbe\x98\x0b\x75\x44\xb3\xfa\x20\x63\x66\x3c\x2c\xe0\x8c\xc5\x84\x27\x35\xd7\x2b\x3b\xf2\x8d\x35\xbc\x34\x97\x23\x65\xe0\xe0\x18\x2a\xe7\xa3\x03\x5f\x3c\x32\x7b\xca\x8c\xa3\xe3\xde\xe0\x6f\xd6\x41\xdb\xc0\xd8\xa1\x4c\xf5\xa1\x3b\x7b\x0a\xf0\x22\xcb\x38\xb6\x78\x6b\x0e\x02\x72\x06\x35\xbb\xe8\x56\x8a\xe3\xa8\x41\xbf\x25\x67\xb7\x08\x86\x80\xa2\x4a\x99\x41\x08\xf2\xde\x3a\x8e\x2d\x0a\xa2\x00\x63\x03\x58\xa7\xc6\xca\xa0\xd6\xb3\x95\xaa\x72\x55\x47\x56\x75\xbe\x80\x21\x35\xa8\x5c\xcc\x08\x35\xea\xb2\x35\xb1\x5d\x88\xb4\x3b\x90\x58\xe3\x38\x72\x18\x83\xcf\x61\x80\x91\x0a\xac\x7e\xfa\xe2\x57\x5f\x50\x08\x25\xc9\x84\x1e\x04\x87\xc6\x37\xd6\x75\x45\xd3\xd0\x58\xab\x31\xc5\x64\x65\x30\xb4\x0e\x35\x48\xe5\xd1\xb3\xc6\x4c\x8e\x8f\xc7\x31\xd6\xbc\xf5\x01\x8d\x44\x27\x81\x34\x89\xe0\x94\x40\x0d\x8d\x9d\x76\x7d\x7a\x7a\x2b\x75\x2b\x42\xdb\x51\xe9\xc0\x57\xd6\x05\x10\xca\x89\x96\xfd\x22\xfb\xbe\xdc\xc4\x7a\xd3\x75\x34\x1f\x29\xa0\xd2\x29\xa9\xaf\x07\x53\xb3\xd2\x87\xed\xfb\xea\x4b\xcd\x4c\x96\xdd\x58\x49\x1a\xb8\x21\x5c\x0c\x31\xd0\xe2\xd3\xdd\xfd\xdf\xf6\x8e\xff\xb4\xb8\xb7\x01\x35\x7c\xe5\xd6\xe4\x1e\x1f\x17\x5f\xc2\x6c\x71\xd7\x8e\x20\x0e\x2f\x36\x20\x2d\xd6\xff\x6c\xfc\xbf\xf1\xe7\xd3\xd0\x22\x3b\xdc\xed\x5d\x2f\xde\xef\xf6\x86\x8b\xfd\xc3\xde\x30\xbd\xed\x1d\xf6\xae\xd3\x9f\xb1\x0b\x71\x1c\x6b\x2f\x77\xa6\x7c\xd7\x8b\x68\x97\xcb\xc5\x7c\xae\x8c\x54\x68\xce\x5b\xe7\xa0\x18\xc6\x1e\x71\x6b\xf0\x12\x8a\x4f\x3e\x3c\x1f\x8c\xf8\xf9\x54\xf7\xf8\x18\xbf\x16\x5f\xc2\xec\x95\x69\xcb\xe5\x62\xa3\x33\xfa\xc4\xb7\x8d\x74\x7c\x7e\xbe\x33\x78\x02\xbc\x36\xdd\xe8\x2a\x6e\x71\x16\x1d\xba\x53\x8b\x79\x9f\xcf\x9f\x5d\x0b\xd2\x9d\x1b\x76\xce\x86\x1f\xf9\x3e\xb0\x32\xe2\xdb\xd5\xca\x72\x71\xfa\x4e\x44\xb1\xfa\xb0\xd9\xca\xdc\x4e\x42\x11\x7b\x99\x6f\x26\xce\x4e\x33\xee\xce\xae\xbe\x99\x33\x87\x46\x54\x7d\xf8\xac\x25\xdc\xa2\x74\x08\x43\x8b\xf2\x9b\x39\x7d\x77\x0e\x03\xdb\x87\xf7\xef\x8f\x8e\x8e\x8f\x8e\xf7\x3e\xec\xef\x7e\x33\x57\x97\x77\xe7\x70\x6e\x65\x32\x1e\xec\xee\xee\xed\x7e\x38\x3e\x5a\x6c\x36\xa2\xff\x5b\x54\xb7\x56\xcf\x02\x89\xca\x28\x01\x3d\x38\xad\x6a\x92\x38\xda\x82\xb7\x7b\x72\xf8\xe1\xe0\xc3\xde\xf1\xc9\xfe\x0b\xf0\x76\xf7\x76\x0f\xde\x6f\x8a\xf4\x4a\x8b\xb6\x78\xd6\xb3\x1d\x1f\xf5\xae\x17\xc7\xc7\xbd\xeb\xc5\xfa\x44\xb1\x55\x5a\x6c\x5d\x41\xba\x4f\xf1\x4b\x94\x34\x29\xca\x9d\x61\xba\xb2\x9c\x51\x85\xba\xe4\x58\xdf\x68\x2f\xb6\x7f\xa2\x78\x69\xf2\x77\x2c\x31\x49\x7f\xd4\x83\xb6\x8e\xe0\x0d\xdc\x71\x7d\xe4\xeb\xcc\xea\xf9\xe1\x4c\x5e\xac\xfb\xe1\xea\xf5\x9f\x50\xfe\xe0\x79\xe9\x4a\xb4\xba\x8f\x65\xff\x0a\x00\x00\xff\xff\x12\x2d\xe0\xc7\x14\x13\x00\x00")

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

	info := bindataFileInfo{name: "templates/COMP/ncm.md", size: 4884, mode: os.FileMode(420), modTime: time.Unix(1526324810, 0)}
	a := &asset{bytes: bytes, info: info}
	return a, nil
}

var _templatesNoncompCcmMd = []byte("\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\xff\xcc\x58\xdb\x6e\xe3\x38\x12\x7d\xd7\x57\x14\x1a\xd8\xc1\x8c\xe0\x56\x1c\xe7\xee\x5d\x2c\xd6\x71\x92\x9e\x00\x89\x27\x6d\x07\x13\x2c\xd0\x2f\x94\x58\xb2\xb8\xa1\x48\x0d\x49\xd9\xad\xb5\xf5\xef\x8b\xa2\x6c\x59\xce\xa5\x83\xbd\x3c\xac\x1e\xba\x6d\xaa\x8a\x3c\x3c\x75\xea\xe2\x84\xe1\x15\x73\x38\x0c\xc3\xd5\x8a\x33\x87\xf6\x26\x77\x10\xd1\x52\x5d\x07\x7f\x89\xcd\xc1\x5f\x83\xd5\xea\x33\x88\x14\xf0\x0f\x88\xbe\x96\xda\x31\x27\xb4\xda\x7d\x7a\xac\x0a\x84\x4f\x93\xeb\xa7\x4f\x75\x0d\x41\x18\x4e\xaf\x6f\x86\x61\xf8\xfb\xf4\xe1\x6e\xb8\x5a\x75\x1c\xa6\x38\x17\x5a\xd5\xf5\xfe\xea\x3d\x4b\x32\xa1\x90\x36\xa9\xeb\xe1\xe4\xfa\x69\x38\xba\x1f\xbf\x74\x4c\x27\xba\xae\x3d\x0c\x94\x16\x3f\xc4\x32\xbd\x9e\x7c\xaa\xeb\xff\x12\xca\xf4\x7a\xf2\x31\x94\xce\x29\x13\x0d\x53\x4c\x0d\xaa\x04\xe1\x46\x97\x8a\xc3\x8d\x36\xe0\x32\x61\xa1\xf5\x07\xda\xbb\x71\x56\x7c\x4b\x2f\xbc\xfb\x04\x7b\x67\x8f\x38\x37\x68\x6d\x5d\x07\xc1\x15\x32\x03\x33\x61\x7a\xc1\xbf\x11\x9b\x20\x0c\x67\x65\x3c\x84\xdf\xd2\x14\x0d\xa4\xda\xc0\x44\x2b\x18\xeb\xbc\xc8\x0c\x2a\x2b\x16\x08\x23\xa5\x4a\x26\xe1\x9e\x09\xe5\x50\x31\xba\xca\x58\x2b\x67\x58\xe2\xbc\xc3\xdf\x75\x69\x60\x5c\x1a\xba\x65\x05\x63\x5d\x2a\x27\xd4\xfc\x00\xae\xd0\x61\x42\x1f\x61\xc3\xa1\x85\x9f\x57\xab\xbc\xf9\x3c\x61\x39\x5a\x78\xcd\xb3\xad\xeb\x5f\xc2\x30\x08\x9e\x10\x1c\x7b\x46\x28\x8c\x58\x08\x89\x73\x04\xa7\x41\x28\x67\x34\x2f\x13\x04\x3a\xd2\xa2\x4c\x81\x59\x60\x20\x91\xf1\xe6\x1c\x55\xa6\x2c\x71\xa5\x41\x03\x4c\xf1\x3d\xcc\xbf\xea\xd2\x62\xe4\xf9\x2f\x98\x75\xe0\x32\x83\x08\x1c\x13\xc6\xd1\xc2\x12\x21\x63\x0b\x84\x18\x51\x41\x61\xf4\x42\xf8\x1d\x2d\x9a\x85\x48\xd0\x82\x50\x30\xf1\x40\x99\x14\xff\x44\x0e\x97\x4c\x3d\xdb\x1e\x8c\xf5\x67\x5d\xa0\x61\x8e\x88\xf2\x6b\xfe\xdc\xb1\x36\x85\x36\xcc\x61\x04\x4f\x08\xcc\x20\xd8\xb2\x28\x64\x45\x5b\x4e\xb4\xc3\x96\xa5\x1d\x35\xe4\xb6\x3b\x37\xef\x00\x6f\x31\xa4\x5e\x3a\x08\x96\xe5\xe8\xed\xb5\xcb\xd0\x40\x6c\x98\xe2\x96\x98\x58\xa2\x94\x51\x10\xdc\xaa\x46\x61\x89\x56\x8a\x22\xa0\x15\x5d\x8f\x50\x14\x12\x99\xf5\x54\xda\x32\xce\x85\xf3\x3c\xa6\x06\x6d\x06\xac\x89\x72\xf7\xe0\xa4\x1b\xe5\x8a\x4c\xdf\xc4\xbe\x7b\xfd\x2c\x14\x27\x2f\x2b\xb8\xe7\x44\xab\xe8\x3f\xc8\x4f\xaf\xc7\x29\x2a\x5c\x32\x09\xfa\xff\x4c\x97\x8f\x44\xac\xf0\x7a\xe8\xd2\x2b\x5c\xe6\x43\xc3\x62\xbd\xa0\x00\x09\xde\xb2\xd7\x23\xf2\x97\xba\x94\x1c\xa4\x78\xde\xe8\x38\xd5\x26\x27\xce\xc0\x65\xcc\x35\xe4\x8d\xee\xc7\x50\xa0\x11\x9a\x43\xc6\x28\x78\x79\x21\xd1\x21\x07\xad\x80\xca\x70\x07\xd3\xf5\xf7\x42\x98\xaa\xa9\xc6\x04\xea\x75\xc0\x7b\xad\xa0\x51\x25\x52\x5b\xe4\x90\xa1\x41\x8f\x33\x0c\x47\xd1\x7d\x34\x8e\xc2\x70\x17\xe1\x86\x66\x89\xce\xa1\x01\x4c\x53\xda\x65\x81\x90\x1a\x9d\xc3\xa6\x15\x40\xb7\x13\xec\xb0\x3c\x78\xc8\x84\xe3\x47\x3a\xf0\x72\x4d\xb4\x4a\x85\xc9\x37\xc2\x08\xc2\xf0\x57\x5d\x20\xfc\x56\x9a\x0d\x6d\x0d\x88\x86\x5c\x49\xc2\xf2\x70\xfd\x8e\x06\xff\x28\x85\xc1\x1c\x95\x8b\xc2\x70\xbf\xd2\x7a\xbd\xcc\xca\xf8\x1f\x98\x38\x52\x68\xa7\xd0\x3e\xbe\x2e\xb4\xc4\x17\xc9\x04\x55\xd7\x38\xfd\xb0\x2a\x07\xb7\x29\x30\x55\x41\x22\x99\x11\xa9\x48\x1a\x23\x85\xc8\x91\x6f\xf3\x2a\x45\x94\x94\x4e\x3e\xc8\x09\x93\x12\x4a\x0b\x5a\x0d\x21\x0c\xfb\x67\x17\x9f\x07\xa7\xc7\x83\xe3\xc1\xe0\xe2\xe0\xe2\x62\x70\x32\x80\xfe\xf1\xc5\xe0\x22\x0c\x23\x12\x15\x53\xcf\x24\x48\x52\x84\x50\x5e\x49\x39\x32\xb5\xcc\x84\x6c\x32\x9d\x59\x5b\x9a\xad\x05\xbd\x8e\xd1\x52\xd4\x36\x85\xd0\x17\x08\x6f\xe8\xa9\x67\x8e\xae\xe7\x69\x97\x4b\x56\xd9\x28\x08\x28\x19\x2c\xa4\x4c\xb8\x2c\x2d\xa5\xac\x7a\x41\x10\xdc\x68\xd3\x83\x30\xfc\x1d\x63\x98\xea\x58\xe7\xec\x19\x7e\x7e\xf8\x05\xee\x1c\x27\x8e\x37\x6d\x3e\x08\xc3\x51\xe9\x32\x6d\x7c\xd9\x9b\x89\xb9\x62\x4e\x9b\x8a\x0c\x3e\xbf\xff\x90\xdb\x36\x61\x0d\x66\x1f\x67\x2c\xed\x47\x2d\x19\x6c\x46\xbc\xf9\x32\xc4\xb6\x54\x6c\xea\x8c\x2d\x30\x11\xa9\x40\xde\x70\x24\x2c\xb0\xb9\x41\x2f\x0a\x4a\x12\x32\x75\x68\x72\xbb\x15\x1b\x17\x9e\x83\x7c\xcb\x85\x85\x18\xa5\x5e\x7a\xe9\x3d\x7a\xc3\x9f\xe8\xfc\xc6\xcc\x0e\x09\xc2\x61\xd4\x68\x66\xb7\x71\x83\xc7\x20\x21\x02\xa4\xc4\x4d\x90\xb7\xa5\x78\x93\xb0\x3a\x4d\x41\x2b\x84\x8a\x5a\xb0\x4f\x1a\x7a\x49\xe9\x42\x79\x9c\x53\xfb\xf7\xd2\x0d\x06\x11\x5c\x62\xaa\x8d\xef\x6e\x14\x4f\x5f\xcf\x2b\xeb\x30\x87\x52\x71\x6a\x5b\xed\xc9\xd4\xda\x14\xb0\x24\xc1\xc2\x11\x57\x3d\x60\xe0\x28\xec\x4b\x21\x25\xc4\x08\x09\x33\x86\xd8\xd0\xa5\x83\xb8\xf2\x52\x40\x35\x17\x0a\x29\x8b\xa8\x8b\xa1\xa5\x93\x2d\xe9\x84\xce\x31\xd8\x2c\xb9\xa6\x5d\x6d\x56\x6f\x95\x75\xc2\x95\x4d\x52\x1e\x45\x30\x52\x15\x7c\xd1\x0b\x34\xca\xa3\x90\xb8\x10\xd4\xff\xf2\xc2\x57\x91\xb8\xf2\x4e\xf3\xd6\xe0\xcf\x20\x1c\xe5\xac\x47\x6f\x9d\xd6\xbc\xa9\x69\xb6\x4c\xb2\xad\xb3\x07\x5c\xb0\x8a\xc5\x12\x01\xbf\x3b\xc3\x7c\x0c\x66\xdb\xc6\x36\x45\x72\x46\x3e\xdc\x74\x7e\xcf\x01\xe5\x50\xd3\x10\xf1\x85\x8c\xee\xdf\x6a\x8e\x0d\x7b\xbe\x06\xb7\x0c\x3a\x0d\xcf\x88\xc5\x9e\x88\x84\x82\x39\x81\x5c\x6a\xe3\x03\xd0\xea\x24\xf2\xd1\xef\xee\xed\x61\x27\x74\x53\x88\xb5\xcb\x88\xd0\x05\x69\x69\xd1\xa4\x5a\x6c\x90\x3d\x73\xbd\x54\x3e\xd5\x6d\x04\x14\xdd\x87\x9d\x4d\xfe\x72\xab\x18\xb7\x17\xe2\xf0\xb5\x64\xc6\xa1\x91\x95\xe7\xbc\x7b\x2a\x6d\xdd\xde\xea\x95\x1f\x6f\xca\x80\xd2\x26\x67\xb2\xbd\x44\xe6\xb3\xdb\xe7\xbb\xf4\xb7\xdd\xbe\xe0\x3e\xfb\x8f\x23\xb8\x24\xb0\xb0\x43\xdb\xee\x6c\xd0\x16\x5a\xd1\xd6\x54\x6d\x85\x82\xe3\x73\xc8\x8c\x8d\x82\x93\x46\x0a\x05\x33\xce\x02\x67\x39\x9b\x93\xd4\xa8\x14\x17\x92\x51\x0e\x24\xda\xba\xfd\x99\x64\xbb\x67\xac\x8d\xc2\xad\x54\xf6\xf4\xf5\x6e\xcd\x08\x48\x10\x6d\xfb\xbe\x42\xc7\x84\x6c\x52\xb2\x5d\x6c\x3a\xcd\x10\xf6\x7f\x93\xbc\xd5\x89\x82\xe0\x5e\x73\x94\x40\xcd\x7c\x3d\x65\x0e\xd7\x5f\x66\x8f\x7f\x3b\x3c\xff\xd3\xfa\x51\x3b\x26\xe1\x89\xfa\xca\x23\xfb\xbe\xfe\xea\xaa\xf5\xac\x8c\xc1\x2f\xaf\x3b\xe0\xd6\xed\x3f\x9d\xff\x3b\x5f\x77\x4b\xeb\xe0\xa4\xdf\xbb\x5b\x1f\xf5\x7b\xd3\xf5\xe0\xa4\x37\x6d\x3e\x1d\x9e\xf4\xee\x9a\xaf\xbe\x85\x18\xa6\xe6\xf8\xf6\x54\x41\xe3\xbc\x47\x5b\xd7\xeb\xd5\x4a\x28\x2e\x98\xa2\xa1\x05\xa2\xa9\xef\xef\x7b\x8b\x37\x10\x7d\xb1\xee\xf5\xa2\xc7\x4f\xb7\x7a\x64\xdf\xfd\xdb\xe8\xab\xab\xde\x31\xab\xeb\x75\xa7\xad\x7d\xa1\xe1\xb1\xb9\x3e\x3d\x2f\x1c\x76\x80\x5b\xd7\x4e\x5f\x78\x60\x95\x4f\xb3\x4d\xb4\x88\xf7\xd5\xea\xd5\x98\xd7\xfc\xac\x82\x4f\x97\xd3\x2b\x9a\xef\xb6\x4e\x34\x2c\x6f\x3d\xd7\xa3\x83\xc4\x07\x6b\x08\xdd\x66\xf4\xb0\x70\x91\xef\x46\xdf\x94\xb7\x6e\x2c\x66\x97\xb7\xdf\xd4\xa5\x61\x2a\xc9\x86\xf0\x9b\xe4\xf0\xc0\xb8\x61\x30\xd5\x8c\x7f\x53\xa3\x83\x31\x4c\xf4\x10\x8e\x8e\xce\xce\xce\xcf\xce\x0f\x4f\x07\xfd\x6f\xea\xf6\x66\x36\x86\xb1\xe6\x8d\xf3\xa4\xdf\x3f\xec\x9f\x9e\x9f\xad\xbb\x53\xc4\xff\x16\xd5\x83\x96\x95\xc3\x24\x53\x22\x81\x1e\x8c\xb2\x1c\x39\x8b\xf7\xe0\xf5\x2f\x4e\x4e\x8f\x4f\x0f\xcf\x2f\x06\x6f\xc0\xeb\x1f\xf6\x8f\x8f\xba\x41\x7a\x27\x67\xd6\xaf\x92\xe8\xfc\xac\x77\xb7\x3e\x3f\xef\xdd\xad\xdb\x1b\xf9\x46\xb7\xde\x1b\x1f\x37\xaf\xfc\x1b\x1f\xd2\x26\xa2\xd4\xdb\x9b\x71\xf3\x12\x33\x26\x53\x6a\x10\x9d\xe4\xdd\xff\x15\xfa\x96\xf1\x0b\x96\x88\xa4\x1f\x4d\x11\xa5\x41\xf8\x09\x66\x8e\xe5\x05\xcd\xa2\xdb\xe7\x43\x4b\xda\x6c\xf3\xc7\x89\xf7\x7f\x25\xff\xe0\x79\x6b\x9e\x6d\x67\xe9\x7f\x05\x00\x00\xff\xff\x81\x8a\x0b\xdf\xf8\x10\x00\x00")

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

	info := bindataFileInfo{name: "templates/NONCOMP/ccm.md", size: 4344, mode: os.FileMode(420), modTime: time.Unix(1526324851, 0)}
	a := &asset{bytes: bytes, info: info}
	return a, nil
}

var _templatesNoncompNcmMd = []byte("\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\xff\xc4\x58\x6d\x6f\xdb\x38\x12\xfe\xae\x5f\x31\x28\x70\xc5\xae\xe0\xaa\x8e\x9b\x57\xdf\xe1\x70\x89\x9b\x74\x0b\x24\x6e\xea\x18\x5b\x1c\xd0\x2f\x23\x71\x64\xf1\x42\x91\x5a\x92\xb2\xeb\xb3\xfd\xdf\x0f\x43\xd9\x8a\x9c\x97\x06\xf7\x02\x9c\x3e\xec\x3a\xd4\x0c\xf9\xf0\x99\x67\x5e\xd4\x38\xfe\x88\x9e\x86\x71\xbc\x5a\x09\xf4\xe4\xae\x4a\x0f\x09\x2f\x6d\x36\xd1\x5f\x52\xfb\xfe\xaf\xd1\x6a\xf5\x0e\x64\x0e\xf4\x07\x24\x5f\x6b\xe3\xd1\x4b\xa3\x1f\x7e\x4d\x97\x15\xc1\x9b\xf1\xe5\xb7\x37\x9b\x4d\x14\xc7\x93\xcb\xab\x61\x1c\xff\x3e\xb9\xbd\x1e\xae\x56\x1d\xfb\x09\xcd\xa4\xd1\x9b\xcd\xfe\xea\x0d\x66\x85\xd4\xc4\x7b\x6c\x36\xc3\xf1\xe5\xb7\xe1\xf9\xcd\xe8\xb1\x63\x3e\x36\x9b\x4d\x40\x41\xca\xd1\xab\x50\x26\x97\xe3\xff\x1e\xca\xe4\x72\xfc\x3a\x94\xce\x29\x63\x03\x13\xca\xc9\xea\x8c\xe0\xca\xd4\x5a\xc0\x95\xb1\xe0\x0b\xe9\xa0\xf5\x07\xde\xbb\x71\xd6\x62\xc7\x2e\xbc\xf8\x44\x7b\x67\x9f\x0b\x61\xc9\xb9\xcd\x26\x8a\x3e\x12\x5a\xb8\x93\xb6\x17\xfd\x7b\xa1\xb9\xab\xd3\x21\x7c\xc9\x73\xb2\x90\x1b\x0b\x63\xa3\x61\x64\xca\xaa\xb0\xa4\x9d\x9c\x13\x9c\x6b\x5d\xa3\x82\x1b\x94\xda\x93\x46\xbe\xca\xc8\x68\x6f\x31\xf3\xc1\xe1\xef\xa6\x66\x2f\xcf\xcb\xb5\xf6\x52\xcf\x60\x4b\x1a\xfc\xb2\x5a\x95\xcd\xcf\x31\x96\xe4\xe0\x29\xaf\x6e\xb3\xf9\x35\x8e\xa3\xe8\x1b\x81\xc7\x7b\x82\xca\xca\xb9\x54\x34\x23\xf0\x06\xa4\xf6\xd6\x88\x3a\x23\xe0\x23\x1c\xa9\x1c\xd0\x01\x82\x22\x14\xcd\x31\xba\xce\x31\xf3\xb5\x25\x0b\xa8\xc5\x1e\xc6\xdf\x4c\xed\x28\x09\x7c\x57\xe8\x3c\xf8\xc2\x12\x81\xa0\x0c\x05\x39\x58\x10\x14\x38\x27\x48\x89\x34\x54\xd6\xcc\x65\xd8\xd1\x91\x9d\xcb\x8c\x1c\x48\x0d\xe3\x00\x14\x95\xfc\x27\x09\xb8\x40\x7d\xef\x7a\x30\x32\xef\x4c\x45\x16\x3d\x13\x13\xd6\xc2\xb9\x23\x63\x2b\x63\xd1\x53\x02\xdf\x08\xd0\x12\xb8\xba\xaa\xd4\x92\xb7\x7c\x96\x99\xc6\xed\xe1\xdc\xb2\x03\xbc\xc5\x90\x07\xa9\x10\x38\x2c\x29\xd8\x1b\x5f\x90\x85\xd4\xa2\x16\x8e\x99\x58\x90\x52\x49\x14\x7d\xd6\x8d\xa2\x32\xa3\x35\x65\x41\x52\x8b\x06\x45\xa5\x08\x1d\x09\xe6\xd2\xd5\x69\x29\x7d\x20\x32\xb7\xe4\x0a\xc0\x26\xac\xdd\x93\xb3\x6e\x58\x97\x2f\x87\xb5\x7d\x7d\x2f\xb5\x60\x2f\x27\x45\x20\xc5\xe8\xe4\x3f\x48\xc8\x20\xc0\x09\x69\x5a\xa0\x02\xf3\x7f\x16\xe2\x94\x99\x94\x41\x00\x5d\x3e\xa5\x2f\x42\x2c\x30\x35\x73\x8e\x88\x14\x2d\x5b\x3d\x66\x7b\x61\x6a\x25\x40\xc9\xfb\xad\x70\x73\x63\x4b\xe6\x08\x7c\x81\xbe\x21\xeb\xfc\x66\x04\x15\x59\x69\x04\x14\xc8\xd1\x2a\x2b\x45\x9e\x04\x18\x0d\x5c\x66\x3b\x98\x2e\x7f\x54\xd2\x2e\x9b\x6a\x1b\xc7\xcf\x86\xb8\xd7\x4a\x98\x74\xa6\x0c\x47\xb9\x20\x4b\x01\x68\x1c\x9f\x27\x37\xc9\x28\x89\xe3\x87\x90\x36\xbc\x2a\xf2\x9e\x2c\x50\x9e\xf3\x2e\x73\x82\xdc\x9a\x12\xb6\xb5\x1e\xba\xa5\xfe\x01\xcc\x6d\xc0\xcc\x40\x7e\x16\xf8\x20\xd0\xcc\xe8\x5c\xda\x72\xab\x84\x28\x8e\x7f\x33\x15\xc1\x97\xda\x6e\x79\x6b\x40\x34\xec\x2a\x8e\x4b\x80\x1b\x76\xb4\xf4\x47\x2d\x2d\x95\xa4\x7d\x12\xc7\xfb\xb5\x34\x08\xe4\xae\x4e\xff\x41\x99\xe7\x00\x77\x4a\xe9\xf4\x69\x29\xe5\x28\xb2\x2e\x48\x77\x8d\xf3\x57\xeb\x6e\xf4\x39\x07\xd4\x4b\xc8\x14\x5a\x99\xcb\xac\x31\xd2\x44\x82\xc4\x36\x93\x20\x27\x52\x9c\x3f\x21\xca\x19\x2a\x05\xb5\x03\xa3\x87\x10\xc7\xfd\x93\xb3\x77\x83\xe3\xc3\xc1\xe1\x60\x70\xf6\xfe\xec\x6c\x70\x34\x80\xfe\xe1\xd9\xe0\x2c\xc4\x6f\x5a\xa0\xbe\x67\x41\xb2\x24\xa4\x0e\x52\x2a\x09\xf5\xa2\x90\xaa\xc9\x6d\x74\xae\xb6\x3b\x0b\x7e\x9d\x92\xe3\xa8\x6d\x4b\x5f\x28\x09\xc1\x30\x50\x8f\x9e\xaf\x17\x68\x57\x0b\x5c\xba\x24\x8a\x58\xfd\x0e\x72\x94\xbe\xc8\x6b\xa5\x96\xbd\x28\x8a\xae\x8c\xed\x41\x1c\xff\x4e\x29\x4c\x4c\x6a\x4a\xbc\x87\x5f\x6e\x7f\x85\x6b\x2f\x98\xe3\x6d\x1f\x8f\xe2\xf8\xbc\xf6\x85\xb1\xa1\xd0\xdd\xc9\x99\x46\x6f\xec\x92\x0d\xde\xbd\xfc\xb0\xdb\x2e\x43\x2d\x15\xaf\xa7\x28\xef\xc7\x4d\x17\x5c\xc1\xbc\x85\xba\x83\x3b\x2a\xb6\x69\xea\x2a\xca\x64\x2e\x49\x34\x1c\x49\x07\x38\xb3\x14\x44\xc1\x59\xc2\xa6\x9e\x6c\xe9\x76\x62\x13\x32\x70\x50\xee\xb8\x70\x90\x92\x32\x8b\x20\xbd\x69\x30\x7c\xcb\xe7\x37\x66\x6e\xc8\x10\x0e\x92\x46\x33\x0f\x1b\x37\x78\x2c\x31\x22\x20\xce\xdc\x8c\x44\x5b\x7c\xb7\x19\x6b\xf2\x1c\x8c\x26\x58\x72\x93\x0d\x49\xc3\x2f\x39\x5d\x38\x91\x4b\xd2\x59\x23\xdd\x68\x90\xc0\x05\xe5\xc6\x86\x7e\xc6\xf1\x0c\x15\x7c\xe9\x3c\x95\x50\x6b\xc1\x8d\xaa\x3d\x99\x9b\x99\x06\xcc\x32\xaa\x3c\x73\xd5\x03\x04\xcf\x61\x5f\x48\xa5\x20\x25\xc8\xd0\x5a\x66\xc3\xd4\x1e\xd2\x65\x90\x02\xe9\x99\xd4\xc4\x59\xc4\x7d\x8b\x1c\x9f\xec\x58\x27\x7c\x8e\xa5\x66\xc9\x37\x0d\x6a\xbb\xfa\x59\x3b\x2f\x7d\xdd\x24\xe5\x87\x04\xce\xf5\x12\x3e\x99\x39\x59\x1d\x50\x28\x9a\x4b\xee\x78\x65\x15\xaa\x48\xba\x0c\x4e\xb3\xd6\xe0\xcf\x20\x3d\xe7\x6c\x40\xef\xbc\x31\xa2\x29\x6a\xae\xce\x8a\x9d\x73\x00\x5c\xe1\x12\x53\x45\x40\x3f\xbc\xc5\x10\x83\xbb\x5d\x2b\x9b\x10\x3b\x93\x18\x6e\x7b\x7d\xe0\x80\x73\xa8\x69\x81\xf4\x48\x46\x37\xcf\xb5\xc3\x86\xbd\x50\x84\x5b\x06\xbd\x81\x7b\xa2\x6a\x4f\x44\x52\xc3\x8c\x41\x2e\x8c\x0d\x01\x68\x75\x92\x84\xe8\x77\xf7\x0e\xb0\x33\xbe\x29\xa4\xc6\x17\x4c\xe8\x9c\xb5\x34\x6f\x52\x2d\xb5\x84\xf7\xc2\x2c\x74\x48\x75\x97\x00\x47\xf7\xf6\xc1\xa6\x7c\xbc\x55\x4a\xbb\x0b\x09\xf8\x5a\xa3\xf5\x64\xd5\x32\x70\x3e\x2d\xda\x9b\x80\xd4\x99\xaa\x79\x08\xc1\xed\xa5\x86\x90\x29\x42\xcd\x60\x4d\x0e\xae\x92\x5a\x28\x72\x3d\xae\xec\x26\x8c\x07\x42\x62\x55\x58\x9c\x95\x90\x15\xa8\x67\xd4\x63\x9d\x7b\xc8\x0a\xca\xf8\x8a\xbd\xf6\x17\xfb\x4f\x6e\x6f\x76\x91\x2f\x8d\xe7\x0a\xd0\xdd\x1d\xa5\x85\x5c\x2a\xee\x02\x6f\xbb\x6e\xd1\xf6\x58\xa8\xb5\xf4\x49\x74\xb8\x4f\x14\xb3\xd1\x06\xe2\xc9\x55\x45\x53\xb9\xb4\xb1\x25\xaa\x96\xf7\x22\x14\xa4\x50\xa2\x54\x40\xb3\x7b\x21\x42\xc1\x3a\x4a\xe0\x82\xf9\x85\x07\x82\xdb\x9d\x2d\xb9\xca\x68\xde\x9a\x1b\x84\xd4\x70\x78\x0a\x85\x75\x49\x74\xdc\xa8\xb7\x42\xeb\x1d\x08\x2c\x71\xc6\xd9\xc1\xdd\xa3\x52\xc8\x69\x9b\x19\xe7\xf7\x07\xa7\xdd\x9e\xa9\xb1\x9a\x76\xea\xde\x4b\x89\xe8\x71\x65\x8b\xe2\xb8\x1d\x2c\x3e\x92\x47\xa9\x9a\xda\xd1\x2e\x36\x2d\x71\x08\xfb\x5f\x47\xcf\xb5\xcc\x28\xba\x31\x82\x14\xf0\xd8\xb1\x9e\xa0\xa7\xf5\xa7\xbb\xe9\xdf\x0e\x4e\xff\xb4\x9e\x1a\x8f\x0a\xbe\x71\x03\x9c\xe2\x8f\xf5\x57\xbf\x5c\xdf\xd5\x29\x84\xe5\x75\x07\xd2\xba\xfd\x4f\xe7\xff\x9d\x3f\x1f\x96\xd6\xd1\x51\xbf\x77\xbd\xfe\xd0\xef\x4d\xd6\x83\xa3\xde\xa4\xf9\x75\x70\xd4\xbb\x6e\xfe\x0c\xbd\xce\xb2\x7e\x9e\x9f\x7f\xf8\xcb\x22\xa0\xdd\x6c\xd6\xab\x95\xd4\x42\xa2\x1e\xd5\xd6\x42\x32\x09\x93\xc8\xde\xe2\x15\x24\x9f\x9c\x7f\xba\x18\xf0\xf3\xad\xa6\xf8\x23\xbc\x4d\xbe\xfa\xe5\x0b\x66\x9b\xcd\xba\xd3\x7f\x3f\xf1\x5c\xdb\x5c\x9f\x9f\x47\x0e\x0f\x80\x5b\xd7\x4e\x03\xbb\xc5\x65\xa8\x07\xdb\x68\x31\xef\xab\xd5\x93\x01\xb4\xf9\xc2\x83\x37\x17\x93\x8f\x3c\x79\xee\x9c\x78\x8e\xdf\x79\xae\xcf\xdf\x67\x21\x58\x43\xe8\x76\xcd\xdb\xb9\x4f\x42\xdb\xfc\xae\x83\x75\x63\x71\x77\xf1\xf9\xbb\xbe\xb0\xa8\xb3\x62\x08\x5f\x94\x80\x5b\x14\x16\x61\x62\x50\x7c\xd7\xe7\xef\x47\x30\x36\x43\xf8\xf0\xe1\xe4\xe4\xf4\xe4\xf4\xe0\x78\xd0\xff\xae\x3f\x5f\xdd\x8d\x60\x64\x44\xe3\x3c\xee\xf7\x0f\xfa\xc7\xa7\x27\xeb\xee\xb8\xf3\xbf\x45\x75\x6b\xd4\xd2\x53\x56\x68\x99\x41\x0f\xce\x8b\x92\x04\xa6\x7b\xf0\xfa\x67\x47\xc7\x87\xc7\x07\xa7\x67\x83\x67\xe0\xf5\x0f\xfa\x87\x1f\xba\x41\x7a\x61\x1a\x58\x3f\x19\x0f\x4e\x4f\x7a\xd7\xeb\xd3\xd3\xde\xf5\xba\xbd\x51\xe8\xc8\xeb\xbd\x41\x77\xfb\x2a\xbc\x09\x21\x6d\x22\xca\x43\x48\x33\x18\x5f\x50\x81\x2a\xe7\xc2\xd5\x49\xd9\xfd\x0f\xe2\xe7\x8c\x1f\xb1\xc4\x24\xfd\x6c\xdc\xa9\x2d\xc1\x5b\xb8\xf3\x58\x56\x3c\x34\xef\x9e\x57\x2d\x79\xb3\xed\x3f\x93\xbc\xfc\xc1\xfe\x93\xe7\xb9\xc1\x7b\x37\xf5\x47\xff\x0a\x00\x00\xff\xff\x0d\x4a\xb3\x74\x82\x11\x00\x00")

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

	info := bindataFileInfo{name: "templates/NONCOMP/ncm.md", size: 4482, mode: os.FileMode(420), modTime: time.Unix(1526324857, 0)}
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

