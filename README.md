# kanban
KANBAN API
<br>
<br>
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
    "id": 1,
    "title": "Create Kanban App",
    "description": "Learn how to create RESTful API",
    "status": "backlog"
    "due_date": "2020-02-08"
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
    "title": "Create Fancy kanban",
    "description": "Learn how to create RESTful API",
    "status": "false"
    "due_date": "2020-02-08"
  },
  {
    "id": 2,
    "title": "Create Fancy kanban",
    "description": "Learn how to create RESTful API",
    "status": "false"
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
    "title": "Create Fancy kanban",
    "description": "Learn how to create RESTful API",
    "status": "false",
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
    - status: boolean,
    - due_date: date

  Example
  ```javascript
  {
    "title": "Create Fancy kanban",
    "description": "Learn how to create RESTful API",
    "status": "false"
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
    "title": "Create Fancy kanban",
    "description": "Learn how to create RESTful API",
    "status": "false",
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
    "title": "Create Fancy kanban",
    "description": "Learn how to create RESTful API",
    "status": "false",
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