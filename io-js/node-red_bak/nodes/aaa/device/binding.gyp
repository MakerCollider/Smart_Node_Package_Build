
# ----------------------------------------------------------------------------
# This file was automatically generated by io-js-autogen Version 0.0.1
#
# Do not make changes to this file unless you know what you are doing--modify the
# ext.gypi instead.
# -----------------------------------------------------------------------------


#skeleton of node-gyp file

{
  'targets' : [{

    'target_name' : 'galileo',

    'sources' : [
      'src/face_detection_addon.cpp',
      'src/main.cpp',
      'src/_globalvar.cpp'
      
    ],

    'include_dirs' : [
      'src/',
      '../../../face_detection',
      
    ],

    'libraries' : [
      #'-L/io/library/path/,
      #'-liolib'
    ],

    'includes': ['ext.gypi']

  }]
}