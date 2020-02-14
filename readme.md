# Kanban 

Dokumentasi RESTFUL API MyTodo.

### environment variabeles

```PORT = 
PORT
JWT_SECRET
CLIENT_ID_GOOGLE
```

## USAGE

```text
javascript
npm install
npm run dev
```

## BASE URL

```
http://localhost:3000
```

##  ACCESS

```````text
Access server port: 3000
Access client port: 1234
```````

## USER ROUTES

| Routing             | HTTP | Header(s)                         | Body                                                         | Response                                                  | Description       |
| ------------------- | ---- | --------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- | ----------------- |
| /users/register     | POST | application/x-www-form-urlencoded | name : String (***required***), email : String (***required***), password : String (***required***) | Error: Internal server error Success: add new user        | Create new user   |
| /users/login        | POST | application/x-www-form-urlencoded | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login user          | normal user login |
| /users/login/google | POST | application/x-www-form-urlencoded | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login google member | google user login |



## USER REGISTER

- **URL's**

  ```
  /users/register
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `name:string` , `email:string` , `password:string`

- **Headers**

  - application/x-www-form-urlencoded

- **HTTP Method**

  `POST`

- **Success Response**

  - Code : 201 CREATED

  - Content :

    ```
    {
        "user": {
            "id": 3,
            "email": "azp@gmail.com",
            "password": "$2b$08$HUDRcjzjEsQYvy2HVsdtkeBH46CJigTrWQO8WroBa0xA5jUMgS.ve",
            "name": "azp",
            "updatedAt": "2020-02-13T17:06:40.371Z",
            "createdAt": "2020-02-13T17:06:40.371Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTgxNjEzNjAwfQ.DRJCc6p1CodG1KgdiBExf2Rhs7hto9eXX2UQFHY-hnk"
    }
    ```

- **Error Response**

  - Validation name

    - Code : 400 Bad Request

    - Content :

      ```
      "Please enter your name"
      ```

  - Validation password

    - Code : 400 Bad Request

    - Content :

      ```
      "Please enter your password"
      ```

  - Validation Email

    - Code : 400 Bad Request

    - Content :

      ```
      "Please enter your email"
      ```

  - Validation Unique Email

    - Code : 400 Bad Request

    - Content :

      ```
      "email already exist"
      ```

  - Validation Unique name

    - Code : 400 Bad Request

    - Content :

      ```
      "name already exist"
      ```

  - Validation min length password

    - Code : 400 Bad Request

    - Content :

      ```
      "password length min character 6""name already exist"
      ```

  - Validation format email

    - Code : 400 Bad Request

    - Content :

      ```
      "format email wrong"
      ```

## USER LOGIN

- **URL's**

  ```
  /users/login
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `email:string` , `password:string`

- **Headers**

  - application/x-www-form-urlencoded

- **HTTP Method**

  `POST`

- **Success Response**

  - Code : 201 CREATED

  - Content :

    ```
    {
        "user": {
            "id": 3,
            "email": "azp@gmail.com",
            "password": "$2b$08$HUDRcjzjEsQYvy2HVsdtkeBH46CJigTrWQO8WroBa0xA5jUMgS.ve",
            "name": "azp",
            "createdAt": "2020-02-13T17:06:40.371Z",
            "updatedAt": "2020-02-13T17:06:40.371Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTgxNjI5NDAzfQ.FscbwJzA8NibGNxZ8_QKVZNBp7O7GMeG30iaIF32hKk"
    }
    ```

- **Error Response**

  - Validation email or password

    - Code : 400 Bad Request

    - Content :

      ```
      "email/password wrong"
      ```

    

## USER LOGIN GOOGLE

- **URL's**

  ```
  /users/login/google
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `email:string` , `password:string`

- **Headers**

  - Require : idToken:string

- **HTTP Method**

  `POST`

- **Success Response**

  - Code : 201 CREATEDz

  - Content :

    ```
    {
        "user": {
            "id": 3,
            "email": "azp@gmail.com",
            "password": "$2b$08$HUDRcjzjEsQYvy2HVsdtkeBH46CJigTrWQO8WroBa0xA5jUMgS.ve",
            "name": "azp",
            "createdAt": "2020-02-13T17:06:40.371Z",
            "updatedAt": "2020-02-13T17:06:40.371Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTgxNjI5NDAzfQ.FscbwJzA8NibGNxZ8_QKVZNBp7O7GMeG30iaIF32hKk"
    }
    ```

- **Error Response**

  - Validation internal server

    - Code : 500 internal server error

    - Content :

      ```
      "internal server error"
      ```

    

## KANBAN GET ALL

- **URL's**

  ```
  /kanbans/
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : none

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    [
        {
            "id": 3,
            "title": "coba lagi",
            "category": "to-do",
            "assignTo": "uta",
            "description": "desc",
            "UserId": 1,
            "createdAt": "2020-02-13T12:37:13.847Z",
            "updatedAt": "2020-02-13T12:43:56.460Z"
        },
        {
            "id": 1,
            "title": "coba dulu",
            "category": "to-do",
            "assignTo": "putra",
            "description": "ini desc",
            "UserId": 1,
            "createdAt": "2020-02-13T12:30:03.374Z",
            "updatedAt": "2020-02-13T16:31:01.551Z"
        },
        {
            "id": 2,
            "title": "tambah baru",
            "category": "done",
            "assignTo": "putra",
            "description": "desc",
            "UserId": 1,
            "createdAt": "2020-02-13T12:30:47.144Z",
            "updatedAt": "2020-02-13T16:32:30.666Z"
        }
    ]
    ```

- **Error Response**

  - Authentication & authorize

    - Code : 401 Unauthorized

    - Content :

      ```
      "Unauthorized Invalid Token"
      ```

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

    

## KANBAN GET ONE

- **URL's**

  ```
  /kanbans/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "id": 3,
        "title": "coba lagi",
        "category": "to-do",
        "assignTo": "uta",
        "description": "desc",
        "UserId": 1,
        "createdAt": "2020-02-13T12:37:13.847Z",
        "updatedAt": "2020-02-13T12:43:56.460Z"
    }
    ```

  **Error Response**

  - Authentication & authorize

    - Code : 401 Unauthorized

    - Content :

      ```
      "Unauthorized Invalid Token"
      ```

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

    

## KANBAN UPDATE

- **URL's**

  ```
  /kanbans/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `title:string` , `description:string` , `assignTo:string`, `category:string` , `UserId:integer`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `PUT`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "id": 3,
        "title": "coba update title",
        "category": "back-log",
        "assignTo": "uta",
        "description": "desc",
        "UserId": 1,
        "createdAt": "2020-02-13T12:37:13.847Z",
        "updatedAt": "2020-02-13T23:33:05.403Z"
    }
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

  - Authorization assignTo

    - Code : 401 Unauthorized

    - Content :

      ```
      "Unauthorized Invalid Token"
      ```

## KANBAN DELETE

- **URL's**

  ```
  /kanbans/:id
  ```

- **URL Params** : `id: [string]`

  - Optional : `none`
  
- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `DELETE`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "id": 3,
        "title": "coba update title",
        "category": "back-log",
        "assignTo": "uta",
        "description": "desc",
        "UserId": 1,
        "createdAt": "2020-02-13T12:37:13.847Z",
        "updatedAt": "2020-02-13T23:33:05.403Z"
    }
    
    {
        "id": 4,
        "title": "todo 9",
        "assignTo": "putra",
        "description": "description keren",
        "category": "back-log",
        "UserId": 2,
        "updatedAt": "2020-02-13T23:38:07.380Z",
        "createdAt": "2020-02-13T23:38:07.380Z"
    }
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

  - Authorization assignTo

    - Code : 401 Unauthorized

    - Content :

      ```
      "Unauthorized Invalid Token"
      ```

## KANBAN POST

- **URL's**

  ```
  /kanbans
  ```

- **URL Params**: `id: [string]`

  - Optional : `none`

- **Data Params**

  - Require : `title:string` , `description:string` , `assignTo:string`, `category:string` , `UserId:integer`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "id": 4,
        "title": "todo 9",
        "assignTo": "putra",
        "description": "description keren",
        "category": "back-log",
        "UserId": 2,
        "updatedAt": "2020-02-13T23:38:07.380Z",
        "createdAt": "2020-02-13T23:38:07.380Z"
    }
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```
