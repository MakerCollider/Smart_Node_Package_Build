# Atlas: A Mobile First Proramming Framework

## Requirement

* Ubuntu/Yocto/MacOS
* cmake
* gmake
* nodejs (with node-gyp installed)
* opencv > 3.0 beta

## Setup

``` shell
git clone https://github.com/node-red/node-red
# follow node-red/README.md to install

git clone https://github.com/ilc-opensource/io-js
cd io-js
git checkout nodered
cd ..

git clone https://github.com/MakerCollider/Atlas.git
cd Atlas
make
cd atlas_hook
npm install
```

