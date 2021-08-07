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

<details>
    <summary>It will show data as below
    </summary>
```
Table "user"
┌─────────┬────┬──────────┐
│ (index) │ id │   name   │
├─────────┼────┼──────────┤
│    0    │ 1  │ 'User 1' │
│    1    │ 2  │ 'User 2' │
└─────────┴────┴──────────┘
Table "post"
┌─────────┬────┬─────────┬────────────┐
│ (index) │ id │ user_id │  content   │
├─────────┼────┼─────────┼────────────┤
│    0    │ 1  │    1    │ 'Post 1.1' │
│    1    │ 2  │    2    │ 'Post 2.2' │
│    2    │ 3  │    2    │ 'Post 2.3' │
│    3    │ 4  │    2    │ 'Post 2.1' │
│    4    │ 5  │    1    │ 'Post 1.2' │
│    5    │ 6  │    1    │ 'Post 1.3' │
└─────────┴────┴─────────┴────────────┘
Table "comment"
┌─────────┬────┬─────────┬─────────────────┐
│ (index) │ id │ post_id │     content     │
├─────────┼────┼─────────┼─────────────────┤
│    0    │ 1  │    1    │ 'Comment 1.1.4' │
│    1    │ 2  │    2    │ 'Comment 2.2.1' │
│    2    │ 3  │    2    │ 'Comment 2.2.2' │
│    3    │ 4  │    2    │ 'Comment 2.2.3' │
│    4    │ 5  │    2    │ 'Comment 2.2.4' │
│    5    │ 6  │    1    │ 'Comment 1.1.1' │
│    6    │ 7  │    3    │ 'Comment 2.3.2' │
│    7    │ 8  │    1    │ 'Comment 1.1.3' │
│    8    │ 9  │    3    │ 'Comment 2.3.4' │
│    9    │ 10 │    4    │ 'Comment 2.1.1' │
│   10    │ 11 │    4    │ 'Comment 2.1.2' │
│   11    │ 12 │    4    │ 'Comment 2.1.3' │
│   12    │ 13 │    4    │ 'Comment 2.1.4' │
│   13    │ 14 │    5    │ 'Comment 1.2.1' │
│   14    │ 15 │    5    │ 'Comment 1.2.2' │
│   15    │ 16 │    5    │ 'Comment 1.2.3' │
│   16    │ 17 │    1    │ 'Comment 1.1.2' │
│   17    │ 18 │    6    │ 'Comment 1.3.1' │
│   18    │ 19 │    6    │ 'Comment 1.3.2' │
│   19    │ 20 │    6    │ 'Comment 1.3.3' │
│   20    │ 21 │    6    │ 'Comment 1.3.4' │
│   21    │ 22 │    3    │ 'Comment 2.3.1' │
│   22    │ 23 │    3    │ 'Comment 2.3.3' │
│   23    │ 24 │    5    │ 'Comment 1.2.4' │
└─────────┴────┴─────────┴─────────────────┘
```
</details>

## References

* [SQLite Node.js tutorial](https://www.sqlitetutorial.net/sqlite-nodejs/)
* [Node SQLite3 API](https://github.com/mapbox/node-sqlite3/wiki/API)