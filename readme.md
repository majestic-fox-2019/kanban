# Kanban API Documentation

## Users Routes

### POST /users/login

---

Login with existing account

> #### Headers :

```
none
```

> #### Request Body :

```
{
    email: <your email goes here>,
    password: <your password here>
}
```

> #### Success Reponse

```
200 : {
    token : <your jwt token>
}
```

### POST /users/register

---

Register a new account

> #### Headers :

```
none
```

> #### Request Body :

```
{
    name: <your name here>,
    email: <your email goes here>,
    password: <your password here>
}
```

> #### Success Reponse

```
200 : {
    token : <your jwt token>
}
```

### POST /users/google

---

Login with google account

> #### Headers :

```
none
```

> #### Request Body :

```
{
    idToken: <your token from google redirect>
}
```

> #### Success Reponse

```
200 : {
    token : <your jwt token>
}
```

## Tasks Routes

### GET /tasks/:projectId

---

Get all tasks in specific project

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : [
    {
        "id": 1,
        "title": "Test Task",
        "description": "Task from postman",
        "assigned_to": "malik@gmail.com",
        "status": "backlog",
        "ProjectId": 1,
        "createdAt": "2020-02-10T18:04:53.607Z",
        "updatedAt": "2020-02-10T18:04:53.607Z"
    }
]
```

### POST /tasks/:projectId

---

Post a task into specifec project

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
{
    title: <your title>,
    description: <task description>,
    assigned_to: <your team name>,
    status: <task status>
}
```

> #### Success Reponse

```
200 : {
    "result": {
        "id": 2,
        "title": "Test Task 2",
        "description": "Task from postman 2",
        "assigned_to": "malik@gmail.com",
        "status": "backlog",
        "ProjectId": 1,
        "updatedAt": "2020-02-11T08:46:05.341Z",
        "createdAt": "2020-02-11T08:46:05.341Z"
    },
    "msg": "Task created"
}
```

### DELETE /tasks/:id/:projectId

---

Delete a task

> #### Headers :
>
> You must inside the project to delete a task

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : {
    "result": 1,
    "msg": "Task deleted"
}
```

### PATCH /tasks/:id/:projectId

---

Patch task status

> #### Headers :
>
> You must inside the project to change the status

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
{
    status: <new status>
}
```

> #### Success Reponse

```
200 : {
    "result": 1,
    "msg": "Status updated"
}
```

### PUT /tasks/:id/:projectId

---

Edit a task data

> #### Headers :
>
> You must inside the project to edit task

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
{
    title: <your title>,
    description: <task description>,
    assigned_to: <your team name>
}
```

> #### Success Reponse

```
200 : {
    "result": 1,
    "msg": "Task edited"
}
```

## Projects Routes

### GET /projects

---

Get all user's projects

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : {
    "personal": [
        {
            "UserId": 1,
            "ProjectId": 1,
            "status": "join",
            "createdAt": "2020-02-10T17:59:01.885Z",
            "updatedAt": "2020-02-10T17:59:01.885Z",
            "Project": {
                "name": "Postman Project",
                "owner": 1
            }
        }
    ],
    "other": []
}
```

### GET /projects/user/invitations

---

Get all user's invitations

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : [
    {
        "UserId": 1,
        "ProjectId": 1,
        "status": "pending",
        "createdAt": "2020-02-10T17:59:01.885Z",
        "updatedAt": "2020-02-10T17:59:01.885Z",
        "Project": {
            "name": "Postman Project"
        }
    }
]
}
```

### GET /projects/:projectId

---

Get a project detail

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : {
    "data": {
        "id": 1,
        "name": "Postman Project",
        "owner": 1,
        "members": [
            {
                "name": "ilham malik",
                "email": "ilham@gmail.com"
            }
        ]
    }
}
```

### POST /projects

---

Create new project

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
{
    name: <project name>
}
```

> #### Success Reponse

```
200 : {
    "result": {
        "id": 2,
        "name": "Dokumentasi",
        "owner": 1,
        "updatedAt": "2020-02-11T09:02:54.016Z",
        "createdAt": "2020-02-11T09:02:54.016Z"
    },
    "msg": "New Project Created"
}
```

### DELETE /projects/:projectId

---

Delete a single project

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : {
    "msg": "Project Deleted"
}
```

### PATCH /projects/invite/:projectId

---

Accept project invitation

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : {
    "result": [
        1
    ],
    "msg": "Invitation Accepted"
}
```

### DELETE /projects/leave/:projectId

---

Leave or reject project invitation

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : {
    "result": 1,
    "msg": "You leave the project"
}
```

---

## Error Responses

```
> User errors
400: {
    code: 400,
    msg: <error msg>
}
401: {
    code: 401,
    msg: <error msg>
}
403: {
    code: 403,
    msg: <error msg>
}
404: {
    code: 404,
    msg: <error msg>
}
> Server error
500: {
    code: 500,
    msg: <error msg>
}
```
