build: clean
	go build -o build/main
	GOOS=windows GOARCH=386 go build -o build/main_windows.exe
	zip -r build/main_win.zip build/main_windows.exe
	cp KNSB.log ./build
	cp Yeola.log ./build	
clean:
	rm -rf build
all: build
