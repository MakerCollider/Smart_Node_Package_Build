RED_DIR=../../../node-red
IO_JS=../../../io-js/utils/autogen/run.py
INDOOR_NODE=../../atlas_nodes/indoor
all: build

build:
	mkdir -p build
	cd build; cmake ..; make
	$(IO_JS) -c config_indoor.py
	cd $(INDOOR_NODE)/addon/;node-gyp rebuild
clean:
	rm -rf build
	rm -rf $(INDOOR_NODE)
.PHONY: all build 
