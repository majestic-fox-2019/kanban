# Kanban Dokumentasi

# Deploy pages

client : https://kanban-dawets-713ac.firebaseapp.com<br>
server : https://dawet-kanban.herokuapp.com/

# Route Users

| Route      | Method | Params          | Description                                        |
| ---------- | ------ | --------------- | -------------------------------------------------- |
| /login     | POST    | none            | Login local
| /google/login     | POST    | none            | Login with google auth & store new user
| /register     | POST    | none            | Register new user

## 1. Path /Login (POST METHOD)

## Path

```javascript
    [GitHub](http://localhost:3000/login)
```
## Request Body
| Field       | Data type | Validation Type
| ----------- | --------- | ---------
| name       | STRING    | required
| email | STRING    | required
| password      | INTEGER   | required

## Parameter
**Parameter** is empty.

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "email": "arona.nur.tetulis@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFyb25hIE51ciBUZXR1bGlzIiwiZW1haWwiOiJhcm9uYS5udXIudGV0dWxpc0BnbWFpbC5jb20iLCJpYXQiOjE1ODE3MDAzNTZ9.8rJJPzP6M1ztuO8eXs7L2dgC5X5_kUGXqriWPCB5LME"
} 
```
## 2. Status Code 404 (No Data / Not Found)

```javascript
1. "Email doesn't exist!" (email doesnt exist)
2. "Wrong email or password!" (wrong password)
```

## 2. Path /google/Login (POST METHOD)

## Path

```javascript
    [GitHub](http://localhost:3000/google/login)
```
## Request Body
**Request Body** is empty.


## Parameter
**Parameter** is empty.

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "email": "arona.nur.tetulis@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFyb25hIE51ciBUZXR1bGlzIiwiZW1haWwiOiJhcm9uYS5udXIudGV0dWxpc0BnbWFpbC5jb20iLCJpYXQiOjE1ODE3MDAzNTZ9.8rJJPzP6M1ztuO8eXs7L2dgC5X5_kUGXqriWPCB5LME"
} 
```

## 3. Path /register (POST METHOD)

## Path

```javascript
    [GitHub](http://localhost:3000/register)
```
## Request Body
| Field       | Data type | Validation Type
| ----------- | --------- | ---------
| name       | STRING    | required
| email | STRING    | required
| password      | INTEGER   | required

## Parameter
**Parameter** is empty.

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 5,
    "name": "Arona Nur Tatula",
    "email": "arona.nur@gmail.com",
    "password": "$2a$10$aAZi5/rR4JPdCL0.DVDXVeQb4iTftFe9yJvRzZFm/8bmayM6h/qzO",
    "updatedAt": "2020-02-14T17:19:03.018Z",
    "createdAt": "2020-02-14T17:19:03.018Z"
}
```
## 2. Status Code 400 (Request Body Doesnt Complete The Validation)

```javascript
{
    "name": "Name is required!",
    "email": "Incorrect email format!",
    "password": "Password minimum 6 character"
}
```

# Route Projects

## Authentication
  Headers **token** is required

| Route      | Method | Params          | Description                                        |
| ---------- | ------ | --------------- | -------------------------------------------------- |
| /projects     | GET    | none            | Get All Project List
| /projects     | POST    | none            | Create New Project
| /projects/:project_id     | POST    | project_id            | Delete Project Truncate the relation

## 1. Path /projects (GET METHOD)

## Path

```javascript
    [GitHub](http://localhost:3000/projects)
```
## Request Body
**Request Body** is empty.

## Parameter
**Parameter** is empty.

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
[
    {
        "id": 1,
        "project_name": "Arona",
        "createdAt": "2020-02-14T14:26:21.172Z",
        "updatedAt": "2020-02-14T14:26:21.172Z"
    },
    {
        "id": 2,
        "project_name": "Todos App",
        "createdAt": "2020-02-14T16:17:49.627Z",
        "updatedAt": "2020-02-14T16:17:49.627Z"
    }
]
```
## 2. Status Code 200 (Empty Project)

```javascript
Pojects is empty!
```

## 2. Path /projects (POST METHOD)

## Path

```javascript
    [GitHub](http://localhost:3000/projects)
```
## Request Body
| Field       | Data type | Validation Type
| ----------- | --------- | ---------
| project_name       | STRING    | required

## Parameter
**Parameter** is empty.

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 3,
    "project_name": "Todos",
    "updatedAt": "2020-02-14T17:27:42.890Z",
    "createdAt": "2020-02-14T17:27:42.890Z"
}
```
## 2. Status Code 200 (Request Body Doesnt Complete The Validation)

```javascript
{
    "project_name": "Project name is required!"
}
```

## 3. Path /projects/{project_id} (DELETE METHOD)

## Path

```javascript
    [GitHub](http://localhost:3000/projects/{project_id})
```
## Request Body
**Request Body** is empty.

## Parameter
| Params       | Data type |
| ----------- | --------- |
| project_id       | INTEGER | 

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
  "Data Deleted"
}
```

# Route Tasks

## Authentication
  Headers **token** is required

##

| Route      | Method | Params          | Description                                        |
| ---------- | ------ | --------------- | -------------------------------------------------- |
| /tasks/:project_id     | GET    | project_id            | Get All Task List in Project 
| /tasks/:project_id     | POST    | project_id            | Create Task In The Project
| /tasks/:project_id     | GET    | project_id            | Get All Task List in Project 
| /tasks/:task_id     | GET    | task_id            | Get Task Data By Id
| /tasks/:task_id     | PUT    | task_id           | Update Task By Id
| /tasks/:task_id     | PATCH    | task_id           | Update Task Status
| /tasks/:task_id     | DELETE    | task_id           | Deleted Task By Id
| /tasks/back/:task_id     | PATCH    | task_id           | Reverse Task Status


