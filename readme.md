# Kanban 

Kanban Project: Client & Server Documentation, API Documentation

# Link Demo
    Backend: https://kanban-project-backend.herokuapp.com/ ( Heroku )
    Frontend: https://kanban-a98c9.firebaseapp.com/ (Firebase)


# Client & Server Documentation

## Client

    Tools: HTML, CSS, JAVASCRIPT, Vue JS

### Dependencies 
|   Package Name                |   Version     |
| ---------------               | ------------  |
|  bootstrap                    | ^4.4.1        |
|  bootstrap-vue                | ^2.4.1        |
|  vue                          | ^2.6.11       |
|  vue-hot-reload-api           | ^3.4.1        |


### Running Client

    npm start


## Server

    Tools: NodeJS, Express, sequelize, postgresql

### Dependencies 
|   Package Name    |   Version     |
| ---------------   | ------------  |
|  bcryptjs         | ^2.4.3        |
|  cors             | ^2.8.5        |
|  dotenv           | ^8.2.0        |
|  express          | 4.17.1        |
|  jsonwebtoken     | ^8.5.1        |
|  pg               | ^7.18.1       |
|  sequelize        | ^5.21.3       |



### Example .env

    jwt_secret_key="kanbanselaludihati"


### Default Port

    3000

### Running Server

    npm run dev


# API Documentation

## Users 

| Url                   | Method    |   Description |
| -----------------     | --------- | ------------- |
| /users/register       | POST      | Membuat user baru
| /users/login          | POST      | User Login

## Projects 

| Url                   | Method    |   Description |
| -----------------     | --------- | ------------- |
| /projects             | GET       | Mendapatkan list project
| /projects             | POST      | Menambahkan project baru
| /projects/:id         | PUT       | Mengubah project
| /projects/:id         | DELETE    | Menghapus project project

## Tasks 

| Url                   | Method    |   Description |
| -----------------     | --------- | ------------- |
| /tasks                | POST      | Menambahkan task baru
| /tasks/:id            | PUT       | Mengubah task
| /tasks/:id            | DELETE    | Menghapus task
| /tasks/:id            | PATCH     | Mengubah task hanya category id nya saja


## Table Responses

| Code   | Description    | 
| -------------     | ------------- |
| 200     | Response Sukses      | 
| 201     | Data berhasil ditambahkan      | 
| 400     | Request yang diberikan tidak lengkap atau salah      | 
| 403     | Tidak memiliki otoritas      | 
| 404     | Data tidak ditemukan / tidak ada      | 
| 500     | Error dari sisi server / tidak diduga-duga :v      | 
