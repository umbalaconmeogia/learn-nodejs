# JSDOc

## Overview

Use [jsdoc](https://www.npmjs.com/package/jsdoc) to generate documentation from document comment in the code.

To use jsdoc, first install it as global.
```shell
npm install -g jsdoc
```

Create *.jsdoc.json* file in *src* directory, and run command
```shell
jsdoc -c .jsdoc.json
```
It will create the documentation in the directory *../jsdoc*.

## Tips of using jsdoc

### Document format

There are several template for document format (see [jsdoc](https://www.npmjs.com/package/jsdoc)).

Install [minami](https://github.com/Nijikokun/minami) template for the document format.
```shell
npm install --save-dev minami
```

## References

* [jdoc package](https://www.npmjs.com/package/jsdoc)
* [use JSDoc](https://jsdoc.app/)