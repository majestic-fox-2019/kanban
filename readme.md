# Kanban 
Kanban by Muhammad Anova Nurfaqih
## URL's
- Register
```
Method : "POST"
URL : "http://localhost:3000/register"
```
- Login
```
Method : "POST"
URL : "http://localhost:3000/login"
```
- Add Task
```
Method : "POST"
URL : "http://localhost:3000/task"
```
- Get List Task
```
Method : "GET"
URL : "http://localhost:3000/tasks"
```
- Edit / Update Task
```
Method : "GET"
URL : "http://localhost:3000/task/:id"
Method : "PUT"
URL : "http://localhost:3000/task/:id"
```
- Delete Task
```
Method : "DELETE"
URL : "http://localhost:3000/task/:id"
```
## POST/Register
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Register user successfull",
  "payload": {
      "id": 1,
      "name": "Muhammad Anova Nurfaqih",
      "email": "anova@gmail.com",
      "password": "$2b$10$imvloXP4Y7z0rBJh4qRH8.LF0bcgSWrK1h6vP5.wawjE1fjyV9deO",
      "updatedAt": "2020-02-12T14:16:00.623Z",
      "createdAt": "2020-02-12T14:16:00.623Z"
  }
}

status code (400) :
{
  "name": "Name must be filled",
  "email": "Email must be filled",
  "password": "Password must be filled"
}

status code (500) :
{
  "message": "Error not found"
}
```
## POST/login
- Response
```
status code (200) :
{
    "code": 200,
    "message": "Login successfull",
    "payload": {
        "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU",
        "users": {
            "name": "Muhammad Anova Nurfaqih",
            "email": "anova@gmail.com"
        }
    }
}

status code (400) :
{
  "email": 'Email must be filled',
  "password": 'Password must be filled'
}

status code (500) :
{
  "message": "Error not found"
}
```
## POST/task
- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "id": 1,
  "title": "Install Express JS",
  "category": "backlog"
  "updatedAt": "2020-02-12T14:16:00.623Z",
  "createdAt": "2020-02-12T14:16:00.623Z"
  "UserId": 1
}

status code (400) :
{
  "title": "Title must be filled",
  "category": "Category must be filled"
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```
## GET/tasks
- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
[
  {
    "id": 1,
    "title": "Install Express JS",
    "category": "backlog"
    "updatedAt": "2020-02-12T14:16:00.623Z",
    "createdAt": "2020-02-12T14:16:00.623Z"
    "UserId": 1
  },
  {
    "id": 2,
    "title": "Install Sequelize",
    "category": "todo"
    "updatedAt": "2020-02-12T14:16:00.623Z",
    "createdAt": "2020-02-12T14:16:00.623Z"
    "UserId": 2
  }
]
status code (500) :
{
  "message": "Error not found"
}
```
## GET/task/:id
- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "id": 1,
  "title": "Install Express JS",
  "category": "backlog"
  "updatedAt": "2020-02-12T14:16:00.623Z",
  "createdAt": "2020-02-12T14:16:00.623Z"
  "UserId": 1
},
status code (402) :
{
  "message": "Bearer is invalid"
}
status code (500) :
{
  "message": "Error not found"
}
```
## PUT/task/:id
- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
[
  {
    "id": 1,
    "title": "Install Express JS",
    "category": "backlog"
    "updatedAt": "2020-02-12T14:16:00.623Z",
    "createdAt": "2020-02-12T14:16:00.623Z"
    "UserId": 1
  },
  [1]
]
status code (400) :
{
  "title": "Title must be filled",
  "category": "Category must be filled"
  "due_date": "Due date must be filled"
}
status code (402) :
{
  "message": "Bearer is invalid"
}
status code (403) :
{
  "message": "No access"
}
status code (500) :
{
  "message": "Error not found"
}
```
## DELETE/task/:id
- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "id": 1,
  "title": "Install Express JS",
  "category": "backlog"
  "updatedAt": "2020-02-12T14:16:00.623Z",
  "createdAt": "2020-02-12T14:16:00.623Z"
  "UserId": 1
}
status code (402) :
{
  "message": "Bearer is invalid"
}
status code (403) :
{
  "message": "No access"
}
status code (500) :
{
  "message": "Error not found"
}
```