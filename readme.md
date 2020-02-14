# Kanban

## kanban

| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /tasks     | POST   | Membuat task baru                      |
| /tasks/:id | GET    | Mendapatkan data task yang akan diedit |
| /tasks/:id | GET    | Mendapatkan data todo berdasarkan id   |
| /tasks/:id | PUT    | Mengubah data task berdasarkan id      |
| /tasks/:id | DELETE | Menghapus data task berdasarkan id     |

## Table Responses

| Code | Description                                     |
| ---- | ----------------------------------------------- |
| 200  | Response Sukses                                 |
| 201  | Data berhasil ditambahkan                       |
| 400  | Request yang diberikan tidak lengkap atau salah |
| 403  | Tidak memiliki otoritas                         |
| 404  | Data tidak ditemukan / tidak ada                |
| 500  | Error dari sisi server / tidak diduga-duga :v   |

### 1. POST / tasks

_Request header:_

```javascript
{
    "Content-Type": "application/json"
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "title": "memasak",
    "category": "Todo"
}
```

_Response :_

```javascript
{
    "id": 26,
    "title": "memasak",
    "category": "Todo"
    "due_date": "2020-12-12T00:00:00.000Z",
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```

### 2. GET /tasks

<br>

_Response :_

```javascript
{
    "id": 26,
    "title": "memasak",
    "category": "Todo"
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
},
{
    "id": 27,
    "title": "menggoreng",
    "category": "Todo"
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```

### 3. GET /tasks/:id

_Example Input (Request Params) :_

```javascript
localhost: 3000 / tasks / 1;
```

_Response :_

```javascript
{
    "id": 1,
    "title": "menggoreng",
    "category": "Todo"
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"

}
```

_If the "id" wasn't found, the response will be :_

```javascript
"ID not found";
```

### 4. PUT /tasks/:id

_Example Input (Request Params) :_

```javascript
localhost: 3000 / tasks / 1;
```

_Example Input (Request Body) :_

```javascript
{
"title": "menggoreng",
"category": "Todo"
}
```

_Response :_

```javascript
{
    "id": 1,
    "title": "menggoreng",
    "category": "Todo"
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"

}
```

### 5. DELETE /tasks/:id

_Example Input (Request Params) :_

```javascript
localhost: 3000 / tasks / 1;
```

_Response :_

```javascript
{
    "id": 1,
    "title": "mandiin buaya",
    "category": "Done"
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```

# Third Party

    Google OAUTH

# Server Documentation

## Server

    Tools: NodeJS, Express, sequelize, postgresql

### Dependencies

| Package Name | Version |
| ------------ | ------- |
| bcryptjs     | ^2.4.3  |
| cors         | ^2.8.5  |
| dotenv       | ^8.2.0  |
| express      | 4.17.1  |
| googleapis   | ^39.2.0 |
| jsonwebtoken | ^8.5.1  |
| pg           | ^7.18.1 |
| sequelize    | ^5.21.3 |

### Example .env

    PORT=3000
    secretCode="cialobaobao"

### Default Port

    3000

# Client Documentation

## Client

    Tools: NodeJS, Express, sequelize, postgresql

### Dependencies

| Package Name       | Version |
| ------------------ | ------- |
| axios              | ^0.19.2 |
| bootstrap          | ^4.4.1  |
| bootstrap-vue      | ^2.4.1  |
| sass               | 1.25.0  |
| vue                | ^2.6.11 |
| vue-hot-reload-api | ^2.3.4  |

### devDependencies

| Package Name                  | Version |
| ----------------------------- | ------- |
| @vue/component-compiler-utils | ^3.1.1  |
| parcel-bundler                | ^1.12.4 |
| pug                           | ^2.0.4  |
| typescrypt                    | 3.7.5   |
| vue-template-compiler         | ^2.6.11 |

### Example .env

    PORT=3000
    secretCode="cialobaobao"

### Default Port

    3000
