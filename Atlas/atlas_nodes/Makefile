RED_DIR=../../node-red
TARGET=$(RED_DIR)/nodes/atlas_nodes
all: install

install:
	ln -sf ../../Atlas/atlas_nodes  $(RED_DIR)/nodes/
	npm install
clean:
	rm -f $(TARGET)
	
.PHONY: all install clean
