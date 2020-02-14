# Kanban

## This project demo

```
https://kanban-919b3.firebaseapp.com/
or click [here](https://kanban-919b3.firebaseapp.com/)
```

## First Config

In folder client

```
npm install
add config/firebaseConfig.js to client folder
```

In folder server

```
npm install
sequelize init
set the config/config.json with your own rules
sequelize db:migrate
```

# Server API

```json
(baseUrl = "http://localhost:3000")
```

or i have deploy to heroku with this

```json
(baseUrl = "https://shielded-escarpment-11569.herokuapp.com")
```

# TODO

## Get Todos

Mengambil semua todo

**URL** : `/todos`

**Method** : `GET`

**Success Status Code** : 200

Response:

```json
{
  "id": 12,
  "status": "backlog",
  "creator": "123skajhd",
  "creatorImg": "https://img.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg?size=338&ext=jpg",
  "title": "again",
  "content": "this is a description",
  "assignTo": null,
  "assignToImg": null,
  "assignToUid": null,
  "updatedAt": "2020-02-14T16:36:14.441Z",
  "createdAt": "2020-02-14T16:36:14.441Z"
}
```

## Post Todo

Menambahkan todo kedalam database

**URL** : `/todos`

**Method** : `POST`

**Auth Required** : YES

**Reques Body** : YES (title, content, creator, creatorImg)

###

Response:

```json
{
  "id": 12,
  "status": "backlog",
  "creator": "123skajhd",
  "creatorImg": "https://img.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg?size=338&ext=jpg",
  "title": "again",
  "content": "this is a description",
  "assignTo": null,
  "assignToImg": null,
  "assignToUid": null,
  "updatedAt": "2020-02-14T16:36:14.441Z",
  "createdAt": "2020-02-14T16:36:14.441Z"
}
```

## Edit Todo

Mengedit todo

**URL** : `/todos/:todoId`

**Method** : `PATCH`

**Reques Body** : YES (title, content)

###

Response:

```json
{
  "id": 12,
  "status": "backlog",
  "creator": "123skajhd",
  "creatorImg": "https://img.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg?size=338&ext=jpg",
  "title": "again",
  "content": "this is a description",
  "assignTo": null,
  "assignToImg": null,
  "assignToUid": null,
  "updatedAt": "2020-02-14T16:36:14.441Z",
  "createdAt": "2020-02-14T16:36:14.441Z"
}
```

## Update Todo Status

Mengedit todo status

**URL** : `/todos/:todoId/status`

**Method** : `PATCH`

**Reques Body** : YES (status)

###

Response:

```json
{
  "id": 12,
  "status": "backlog",
  "creator": "123skajhd",
  "creatorImg": "https://img.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg?size=338&ext=jpg",
  "title": "again",
  "content": "this is a description",
  "assignTo": null,
  "assignToImg": null,
  "assignToUid": null,
  "updatedAt": "2020-02-14T16:36:14.441Z",
  "createdAt": "2020-02-14T16:36:14.441Z"
}
```

## DELETE Todo

Menghapus produk kedalam database

**URL** : `/todos/:productId`

**Method** : `DELETE`

**Auth Required** : YES (Owner Only)

**Success Status Code** : 200

## Find One Todo

Mencari todo secara spesifik by id

**URL** : `/:todoId/findone`

**Method** : `GET`

**Auth Required** : NO

**Success Status Code** : 200

#

# Error

**CODE RESPONSE**

```
403 => diakibatkan oleh email/password salah, token tidak valid yang membuat
aplikasi logout.

401 => request tidak memiliki authorisasi

400 => Bad Request, kesalahan dari client

500 => Error berasal dari internal server
```
