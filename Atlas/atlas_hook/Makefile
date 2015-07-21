RED_DIR=../../node-red

all: install

install:
	./patch.sh $(RED_DIR)/red.js
	ln -sf ../Atlas/atlas_hook $(RED_DIR)/
	npm install
clean:
	rm -rf $(RED_DIR)/atlas_hook
	echo "TODO: restore $(RED_DIR)/red.js"	

.PHONY: all install clean
