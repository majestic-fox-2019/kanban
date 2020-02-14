# kanban
KANBAN API
<br>
<br>
<br>

### **POST /register**
---
*Create a new user.*
> Request Body:
* Schema

  Value:
    - name: string,
    - email: string,
    - password: string,

  Example
    ```javascript
    {
    "name": "Ajeng",
    "email": "ajeng@gmail.com"
    "password": "ajenghacktiv8"
    }
    ```

<br>

> Response:
* 201


  Example:
  ```javascript
  {
    "id": 6,
    "name": "Ajeng",
    "email": "ajeng@gmail.com"
    "password": "$2a$10$.nhegcxKFs56KKw1XTOf..fptzznZT4.ZshIwlNz5Uuvg7tGRcrCu",
    "updatedAt": "2020-02-14T17:46:58.266Z",
    "createdAt": "2020-02-14T17:46:58.266Z"
  }
  ```

* 400

  Example:
  ```javascript
  {
    "email": "E-mail should not be empty!"
  } 
  ```

* 500

<br>

### **POST /login**
---
*User login.*
> Request Body:
* Schema

  Value:
    - email: string,
    - password: string,

  Example
    ```javascript
    {
    "email": "ajeng@gmail.com"
    "password": "ajenghacktiv8"
    }
    ```

<br>

> Response:
* 201

  Example:
  ```javascript
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAZ21haWwuY29tIiwiaWF0IjoxNTgxNzAyMjI2fQ.D44jSOpp5j1yAE_KklMKUYqTc-pwALusakfwWpIdz3M",
    "UserId": 1
  }
  ```


* 400

  Example:
  ```javascript
  "Invalid email / password!"
  ```

* 404

  Example:
  ```javascript
  "User not found!" 
  ```

* 500

<br>

### **POST /login/google**
---
*User login with google.*
> Request Body:
* Schema

  Value:
    - email: string,
    - password: string,

  Example
    ```javascript
    {
    "email": "ajeng@gmail.com"
    "password": "ajenghacktiv8"
    }
    ```

<br>

> Response:
* 201

  Example:
  ```javascript
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…cwMX0.FrhEDezYKS6WlHtR7VRj9RtCXLF-CA1diMgLCqsGeG0", 
    UserId: 4
  }
  ```


* 500

<br>

### **POST /kanban**
---
*Create a new kanban.*
> Request Body:
* Schema

  Value:
    - title: string,
    - description: string,

  Example
  ```javascript
  {
    "title": "Create Kanban App",
    "description": "Learn how to create RESTful API"
  }
  ```
<br>

> Response:
* 201

  Example:
  ```javascript
  {
    "id": 13,
    "title": "tes",
    "description": "tes",
    "status": "backlog",
    "UserId": 1,
    "updatedAt": "2020-02-14T17:54:38.632Z",
    "createdAt": "2020-02-14T17:54:38.632Z"
  }
  ```

* 400

  Example:
  ```javascript
  {
    "message": "Validation error: Title must be filled!"
  }
  ```

* 500

<br>

### **GET /kanban**
---
*Show all kanban list.*

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 1,
    "title": "Create kanban",
    "description": "Learn how to create RESTful API",
    "status": "backlog"
    "due_date": "2020-02-08"
  },
  {
    "id": 2,
    "title": "Create kanban",
    "description": "Learn how to create RESTful API",
    "status": "backlog"
    "due_date": "2020-02-08"
  } 
  ```

* 500

<br>
<br>

### **GET /kanban/:id**
---
*Show kanban list by id.*
> Request Params:

  id: integer <br>
  example: http://localhost:3000/kanban/2

<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 2,
    "title": "Create kanban",
    "description": "Learn how to create RESTful API",
    "status": "backlog",
    "due_date": "2020-02-08"
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Error 404, command not found!"
  }
  ```

<br>

### **PUT /kanban/:id**
---
*Update kanban list by id.*

> Request params:<br>

  id: integer <br>
  example: http://localhost:3000/kanban/2

<br>

> Request Body:
* Schema

  Value:
    - title: string,
    - description: string,
    - status: string,

  Example
  ```javascript
  {
    "title": "Create kanban",
    "description": "Learn how to create RESTful API",
    "status": "todo"
    "due_date": "2020-02-08"
  }
  ```
<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 2,
    "title": "Create kanban",
    "description": "Learn how to create RESTful API",
    "status": "todo",
    "due_date": "2020-02-08"
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Validation error: Title must be filled!"
  }
  ```

* 400

  Example:
  ```javascript
  {
    "message": "Error 404, command not found!"
  }
  ```

* 500

<br>

### **DELETE /kanban/:id**
---
*Delete kanban list by id.*

> Request params: <br>

  id: integer <br>
  example: http://localhost:3000/kanban/3

<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 2,
    "title": "Create kanban",
    "description": "Learn how to create RESTful API",
    "status": "done",
    "due_date": "2020-02-08"
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Error 404, command not found!"
  }
  ```

* 500