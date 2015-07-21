RED_DIR=../../../node-red
IO_JS=../../../io-js/utils/autogen/run.py
GROVE_NODE=../../atlas_nodes/grove
all: build

build:
	mkdir -p build
	cd build; cmake ..; make
	$(IO_JS) -c config_grove.py
	cd $(GROVE_NODE)/addon/;node-gyp rebuild
clean:
	rm -rf build
	rm -rf $(GROVE_NODE)
.PHONY: all build 
