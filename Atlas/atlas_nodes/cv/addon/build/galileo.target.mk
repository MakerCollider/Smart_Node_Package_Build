# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := galileo
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=galileo' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG'

# Flags passed to all source files.
CFLAGS_Debug := \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-pthread \
	-m32 \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug :=

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-fno-rtti \
	-fno-exceptions

INCS_Debug := \
	-I/home/root/.node-gyp/0.10.38/src \
	-I/home/root/.node-gyp/0.10.38/deps/uv/include \
	-I/home/root/.node-gyp/0.10.38/deps/v8/include \
	-I$(srcdir)/src \
	-I$(srcdir)/../../../cpp/cv

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=galileo' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-pthread \
	-m32 \
	-O2 \
	-fno-strict-aliasing \
	-fno-tree-vrp \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release :=

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-fno-rtti \
	-fno-exceptions

INCS_Release := \
	-I/home/root/.node-gyp/0.10.38/src \
	-I/home/root/.node-gyp/0.10.38/deps/uv/include \
	-I/home/root/.node-gyp/0.10.38/deps/v8/include \
	-I$(srcdir)/src \
	-I$(srcdir)/../../../cpp/cv

OBJS := \
	$(obj).target/$(TARGET)/src/cv_atlas_addon.o \
	$(obj).target/$(TARGET)/src/cv_tool_addon.o \
	$(obj).target/$(TARGET)/src/main.o \
	$(obj).target/$(TARGET)/src/_globalvar.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-pthread \
	-rdynamic \
	-m32

LDFLAGS_Release := \
	-pthread \
	-rdynamic \
	-m32

LIBS := \
	../../../../cpp/cv/bin/libatlas_cv.a \
	/usr/lib/libopencv_calib3d.so /usr/lib/libopencv_core.so /usr/lib/libopencv_features2d.so /usr/lib/libopencv_flann.so /usr/lib/libopencv_highgui.so /usr/lib/libopencv_imgcodecs.so /usr/lib/libopencv_imgproc.so /usr/lib/libopencv_ml.so /usr/lib/libopencv_objdetect.so /usr/lib/libopencv_photo.so /usr/lib/libopencv_shape.so /usr/lib/libopencv_stitching.so /usr/lib/libopencv_superres.so /usr/lib/libopencv_ts.a /usr/lib/libopencv_video.so /usr/lib/libopencv_videoio.so /usr/lib/libopencv_videostab.so 

$(obj).target/galileo.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/galileo.node: LIBS := $(LIBS)
$(obj).target/galileo.node: TOOLSET := $(TOOLSET)
$(obj).target/galileo.node: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(obj).target/galileo.node
# Add target alias
.PHONY: galileo
galileo: $(builddir)/galileo.node

# Copy this to the executable output path.
$(builddir)/galileo.node: TOOLSET := $(TOOLSET)
$(builddir)/galileo.node: $(obj).target/galileo.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/galileo.node
# Short alias for building this executable.
.PHONY: galileo.node
galileo.node: $(obj).target/galileo.node $(builddir)/galileo.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/galileo.node

