RED_DIR=../../../node-red
IO_JS=../../../io-js/utils/autogen/run.py
EDIROBOT_NODE=../../atlas_nodes/edirobot
all: build

build:
	mkdir -p build
	cd build; cmake ..; make
	$(IO_JS) -c config_edirobot.py
	cd $(EDIROBOT_NODE)/addon/;node-gyp rebuild
clean:
	rm -rf build
	rm -rf $(EDIROBOT_NODE)
.PHONY: all build 
