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

## Install

First, install nodejs dependencies.
```shell
npm install
```

## Create database (with data imported)

To create database (it will delete the old *userPostComment.sqlite* file), run
```shell
node createDataPromise
```

## List data in the database

To list data of all tables in the database, run
```shell
node listData
```

## References

* [SQLite Node.js tutorial](https://www.sqlitetutorial.net/sqlite-nodejs/)
* [Node SQLite3 API](https://github.com/mapbox/node-sqlite3/wiki/API)