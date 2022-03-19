# CImg Web Assembly Binding

### What's this
This small utility is a `WASM` binding of the `CImg` cxx library. It exports a subset of APIs from `CImg`, and adds
some useful and handy utilities in order to better support Node.js. Currently supported formats includes `jpeg` & `png`. With `WASM` binding, this small library works just like native js module, without having worry about network, c/c++ build environment and native libraries installation.

### Requirement
This library should be works consistently across any platforms that Node.js v12 and above support(aka wasm support).