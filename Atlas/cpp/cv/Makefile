RED_DIR=../../../node-red
IO_JS=../../../io-js/utils/autogen/run.py
CV_NODE=../../atlas_nodes/cv
all: build install

build:
	mkdir -p build
	cd build; cmake ..; make
	$(IO_JS) -c config_cv.py
	cd $(CV_NODE)/addon/;node-gyp rebuild 

install:
	cp haarcascade_frontalface_alt.xml $(RED_DIR) 
	
clean:
	rm -rf build
	rm -rf $(CV_NODE)
	rm -f $(RED_DIR)/haarcascade_frontalface_alt.xml 
.PHONY: all build install
