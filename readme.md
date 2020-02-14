Link Deploy:

https://kanbanfancy.firebaseapp.com


# Kanban 

Route on My Kanban API is:
<br>
## 1. POST /api/register

    To Register to Kanban Fancy

* **URL:**

http://localhost:3000/api/register

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8"
}
```

* **REQUEST BODY**
```javascript
{
    "name": "<<your_name>>",
    "email": "<<your_email>>",
    "password": "<<your_password>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "id": 1,
    "name": "fajrin",
    "email": "fajrin@oke.com",
    "password": "$2b$10$YOA.1DTgLgpxlQyg0pEImevUpw3BcRxmjdALJB0BZdZj.voB046Ti",
    "updatedAt": "2020-02-08T09:50:25.644Z",
    "createdAt": "2020-02-08T09:50:25.644Z"
}
```

If request failed because validations error:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_that_empty>>"
    }
]
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 2. POST      /api/login

    Logged in on Kanban Fancy

* **EXAMPLE URL:**

http://localhost:3000/api/login


* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8"
}
```

* **REQUEST BODY**
```javascript
{
    "email": "<<your_email>>",
    "password": "<<your_password>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "token": "<<jwt_token>>"
}
```
If request failed because email already exist:

* Status Code: 400

```javascript
[
    {
        "msg": "Email already exist."
    }
]
```

If request failed because user not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```


## 3. POST /api/projects/:projectid/tasks
    Add/Create task on project

* **EXAMPLE URL:**

http://localhost:3000/api/projects/1/tasks

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **REQUEST BODY**

```javascript
{
    "title": "Coding",
    "description": "Code somecode on codewars.",
    "category": "Done"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "id": 1,
    "title": "Coding",
    "description": "Code somecode on codewars",
    "category": "Done",
    "ProjectId": 1,
    "updatedAt": "2020-02-14T15:48:12.936Z",
    "createdAt": "2020-02-14T15:48:12.936Z"
}
```

If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_is_empty>>"
    }
]
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```


## 4. POST      /api/projects 
    Add project

* **EXAMPLE URL:**

http://localhost:3000/api/projects

* **REQUEST HEADER**
```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **REQUEST BODY**
```javascript
{
    "title": "Development E-Commerce",
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "id": 1,
    "title": "Development E-Commerce",
    "UserId": 1,
    "updatedAt": "2020-02-14T15:51:59.264Z",
    "createdAt": "2020-02-14T15:51:59.264Z"
}
```

If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_that_empty"
    }
]
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```


## 5. GET   /api/projects
    List all projects

* **EXAMPLE URL:**

http://localhost:3000/api/projects

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
[
    {
        "id": 9,
        "title": "Tes",
        "UserId": 2,
        "createdAt": "2020-02-13T21:51:09.910Z",
        "updatedAt": "2020-02-13T21:51:09.910Z",
        "Tasks": [
            {
                "id": 70,
                "title": "WOWOAIDAW",
                "description": "Afsafsaasf",
                "category": "Will Do",
                "ProjectId": 9,
                "createdAt": "2020-02-14T09:40:51.680Z",
                "updatedAt": "2020-02-14T09:40:51.680Z"
            },
            {
                "id": 63,
                "title": "Hackytiiasidias",
                "description": "qwdq3wdq31d",
                "category": "On Progress",
                "ProjectId": 9,
                "createdAt": "2020-02-13T23:47:03.834Z",
                "updatedAt": "2020-02-13T23:47:03.834Z"
            },
            {
                "id": 64,
                "title": "asdsad",
                "description": "asdsadaasd",
                "category": "Done",
                "ProjectId": 9,
                "createdAt": "2020-02-13T23:47:09.732Z",
                "updatedAt": "2020-02-13T23:47:09.732Z"
            },
            {
                "id": 65,
                "title": "asdasdasdada",
                "description": "asdadasdsdas",
                "category": "Backlog",
                "ProjectId": 9,
                "createdAt": "2020-02-13T23:47:20.648Z",
                "updatedAt": "2020-02-13T23:47:20.648Z"
            }
        ]
    },
    {
        "id": 11,
        "title": "Hacktiv8",
        "UserId": 2,
        "createdAt": "2020-02-13T23:53:54.353Z",
        "updatedAt": "2020-02-13T23:53:54.353Z",
        "Tasks": [
            {
                "id": 74,
                "title": "mantap ",
                "description": "mantap",
                "category": "Backlog",
                "ProjectId": 11,
                "createdAt": "2020-02-14T09:52:35.661Z",
                "updatedAt": "2020-02-14T09:52:35.661Z"
            },
            {
                "id": 73,
                "title": "mantap ",
                "description": "mantap",
                "category": "Done",
                "ProjectId": 11,
                "createdAt": "2020-02-14T09:42:05.768Z",
                "updatedAt": "2020-02-14T09:42:05.768Z"
            },
            {
                "id": 71,
                "title": "mantap ",
                "description": "mantap",
                "category": "Will Do",
                "ProjectId": 11,
                "createdAt": "2020-02-14T09:41:59.697Z",
                "updatedAt": "2020-02-14T09:41:59.697Z"
            },
            {
                "id": 72,
                "title": "mantap ",
                "description": "mantap",
                "category": "On Progress",
                "ProjectId": 11,
                "createdAt": "2020-02-14T09:42:03.171Z",
                "updatedAt": "2020-02-14T09:42:03.171Z"
            },
            {
                "id": 66,
                "title": "Apa ya",
                "description": "Masih Belom Kepikiran",
                "category": "Backlog",
                "ProjectId": 11,
                "createdAt": "2020-02-13T23:54:09.125Z",
                "updatedAt": "2020-02-13T23:54:09.125Z"
            }
        ]
    }
]
```

If request success but theres no data found:

* Status Code: 404

```javascript
{
    []
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 6. GET   /api/projects/:projectid/tasks 
    Get list all task on some project

* **EXAMPLE URL:**

http://localhost:3000/api/projects/1/tasks

* **REQUEST HEADER**

```javascript
{
    "token": "<<jwt_token>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
[
    {
        "id": 54,
        "title": "a",
        "description": "a",
        "category": "Backlog",
        "ProjectId": 1,
        "createdAt": "2020-02-13T23:03:34.566Z",
        "updatedAt": "2020-02-13T23:03:34.566Z"
    },
    {
        "id": 55,
        "title": "Semester 1 Elektroo",
        "description": "ccd",
        "category": "Backlog",
        "ProjectId": 1,
        "createdAt": "2020-02-13T23:03:45.835Z",
        "updatedAt": "2020-02-14T07:05:43.596Z"
    }
]
```

If request success but theres no data found:

* Status Code: 200

```javascript
{
    []
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 7. PUT   /api/users/:id
    Edit user profile

* **EXAMPLE URL:**

http://localhost:3000/api/users/1

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **REQUEST BODY**
```javascript
{   
    "name" : "<<your_name>>",
    "password": "<<your_password>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "name": "Fajrin Noor Rachman",
    "password": "12345"
}
```


If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_that_empty"
    }
]
```

If request failed because user not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 8. PUT   /api/projects/:id
    Edit project

* **EXAMPLE URL:**

http://localhost:3000/api/projects/1

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **REQUEST BODY**
```javascript
{
    "title": "Hacktiv 8 Jakpus"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "title": "Hacktiv 8 Jakpus"
}
```


If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_that_empty"
    }
]
```

If request failed because project not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 9. PUT   /api/projects/:projectid/tasks/:id
    Edit Task on some Project

* **EXAMPLE URL:**

http://localhost:3000/api/projects/1/tasks/1

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **REQUEST BODY**
```javascript
{   
    "title" : "<<title>>"
    "description" : "<<description>>",
    "category": "<<category>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "title": "Semester 1 Elektroo",
    "description": "So Fun",
    "category": "Done"
}
```


If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_that_empty"
    }
]
```

If request failed because task not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 10. DELETE   /api/projects/:id
    Delete project

* **EXAMPLE URL:**

http://localhost:3000/api/projects/1

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```


* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "id": 1,
    "title": "Hacktiv 8 Jakpus",
    "UserId": 1,
    "createdAt": "2020-02-11T15:37:54.310Z",
    "updatedAt": "2020-02-14T16:08:06.549Z"
}
```

If request failed because project not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 11. DELETE   /api/projects/:projectid/tasks/:id
    Delete Task on some Project

* **EXAMPLE URL:**

http://localhost:3000/api/projects/1/tasks/1

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "title": "Semester 1 Elektroo",
    "description": "So Fun",
    "category": "Done"
}
```

If request failed because user not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```


