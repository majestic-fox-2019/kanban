# Kanban 

## Getting Started

#### Install Package

```javascript
npm install
```



## ROUTE

#### Routes /tasks

| Method | Route      | Description                |
| ------ | ---------- | -------------------------- |
| POST   | /tasks     | Create a tasks             |
| GET    | /tasks     | Get all list taskss        |
| GET    | /tasks/:id | Get  a tasks based on id   |
| PUT    | /tasks/:id | Update a tasks based on id |
| DELETE | /tasks/:id | Delete a tasks based on id |

#### Route /user

| Method | Route          | Description    |
| ------ | ---------      | -------------- |
| POST   | /user/register | Create an user |
| POST   | /user/login    | Login an user |



## 1. POST /tasks (create)

#### Schema:
​	Value :

* title: string,
* description: string,

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



##### Request Body:

```json
{
	"title": "belajar masak",
	"description":"belajar masak lagi"
}
```

#### Response:

##### 		success:

* 201

```json
{
    "id": 16,
    "title": "belajar masak",
    "description": "belajar masak lagi",
    "updatedAt": "2020-02-14T10:54:12.837Z",
    "createdAt": "2020-02-14T10:54:12.837Z"
}
```
##### 	error:

* 400

    ```json
    {
    "message": "Validation error: description must be filled"
    }
   ```





# 2. Get /tasks 
##### Request Parameter:

```javascript
http://localhost:3000/tasks
```
##### Request Header:

```json
{
	"token": your_OwnToken
}
```



#### Response:

##### 		success:

- 200

```json
[
    {
        "id": 15,
        "title": "belajar masak",
        "description": "belajar masak lagi",
        "createdAt": "2020-02-14T09:42:18.954Z",
        "updatedAt": "2020-02-14T09:42:18.954Z"
    }
]
```

# . Get /tasks/:id 
##### Request parameter:

```javascript
http://localhost:3000/tasks/12
```

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



#### response:

##### 		success:

- 200

```json
{
    "id": 11,
    "title": "berenang",
    "description": "berenang",
    "createdAt": "2020-02-14T08:44:32.290Z",
    "updatedAt": "2020-02-14T08:44:32.290Z"
}
```

##### 		error:

- 404

```json
{
    "message": "command not found"
}
```



# 4. Put /tasks/:id (update)

##### request parameter:

```javascript
http://localhost:3000/tasks/12
```

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



##### request body:

```javascript
{
    "title": "berlari",
    "description": "berlari di taman",
    "createdAt": "2020-02-03T08:44:32.290Z",
    "updatedAt": "2020-02-03T08:44:32.290Z"
}
```

##### response :

##### 	Success

- 200

```javascript
{
    "id": 12,
    "title": "berlari",
    "description": "berlari di taman",
    "createdAt": "2020-02-03T08:44:32.290Z",
    "updatedAt": "2020-02-03T11:07:34.782Z"
}
```

##### 	Error

- 400

```json
{
 "message": "Validation error: description must be filled"
 }
```

- 404

```json
{
    "message": "command not found"
}
```



# 5. Delete tasks/:id

##### Request parameter:

```javascript
http://localhost:3000/tasks/12
```

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



##### Response:

##### 	Success

- 200

```javascript
{
    "id": 12,
    "title": "berlari",
    "description": "berlari di taman",
    "createdAt": "2020-02-03T08:44:32.290Z",
    "updatedAt": "2020-02-03T11:07:34.782Z"
}
```

##### Error:

- 404

```json
{
    "message": "command not found"
}
```



## 6. POST /register

##### Request body:

```json
{
    "id": 51,
    "username": "user",
    "password": "user",
    "email": "tambah@email.com"
}
```

##### Response:

##### 	Success

- 201

```json
{
    "id": 51,
    "username": "user",
    "password": "$2a$10$4KE6cyadeGnkmJotn6y4E.UBL6avbTx0Nod.VUjnE69m3l.U0PIi.",
    "email": "tambah@email.com",
    "updatedAt": "2020-02-08T08:31:08.131Z",
    "createdAt": "2020-02-08T08:31:08.131Z"
}
```

##### 	Error

- 400

```json
{
 "message": "Validation error: username must be filled"
 }
```



## 7.POST LOGIN

##### Request Body

```json
{
  "email": "tambah@email.com",  
  "password": "user"
}
```

##### Response:

- 201

```json
{
  "token":your own token
}
```



- 404

```json
{
 "message": "Username or password wrong'"
 }
```

