# SQLite Node.js

## Overview

This example create a sqlite database that has structure as below
```
user
│
└───post
    │
    └───comment
```

The database is stored in file named *userPostComment.sqlite*.

## Run

First, install nodejs dependencies.
```shell
npm install
```

To create database (it will delete the old *userPostComment.sqlite* file), run
```shell
node createData
```

## References

* [SQLite Node.js tutorial](https://www.sqlitetutorial.net/sqlite-nodejs/)
* [Node SQLite3 API](https://github.com/mapbox/node-sqlite3/wiki/API)