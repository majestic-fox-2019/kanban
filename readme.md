# Kanban 



deploy link = kanban-dede.firebaseapp.com



# Routes


#### POST /users/login
User Login.

Authenticate | Authorized
------- | ----------------
No  | No


body request :
* `email type: String` **required**
* `password type: String` **required**



response :

```

//'Success'
{
    "access_token": <token>,
    "userId": <userId>
}

// 'Error'

"email/password salah"

#### 
```

#### `POST /register`
User Register.

Authenticate | Authorized
------- | ----------------
No  | No


body request :
* `name type: String` **required**
* `email type: String` **required**
* `password type: String mininum 6 character` **required**

response :

```
// success
{
    "access_token": <token>,
    "userId": <userId>
}
```




#### `GET /tasks`
GET ALL TASK.
​
Authenticate | Authorized
------- | ----------------
Yes  | No

headers request :
* `access_token type: String` **required**

response :
```js
// success
[
    {
        "id": 33,
        "title": "Play",
        "assignTo": "dedehudianto12@gmail.com",
        "category": "doing",
        "UserId": 1,
        "createdAt": "2020-02-14T06:39:55.162Z",
        "updatedAt": "2020-02-14T06:40:39.638Z"
    },
    {
        "id": 31,
        "title": "Macan Kembang",
        "assignTo": "dedehudianto12@gmail.com",
        "category": "todo",
        "UserId": 1,
        "createdAt": "2020-02-14T06:08:07.650Z",
        "updatedAt": "2020-02-14T06:40:47.266Z"
    }
]

```



#### `POST /tasks`
Create new task.

| Authenticate | Authorized |
| ------------ | ---------- |
| Yes          | No         |

headers request :
* `access_token type: String` **required**

body request :
* `title type: String` **required**


response :
```js
// success
{
    "category": "back-log",
    "id": 35,
    "title": "Mendaki Gunung 3",
    "updatedAt": "2020-02-14T10:26:18.121Z",
    "createdAt": "2020-02-14T10:26:18.121Z",
    "assignTo": null,
    "UserId": null
}

```



#### `DELETE /tasks/{task.id}`
Delete task.

| Authenticate | Authorized |
| ------------ | ---------- |
| Yes          | Yes        |

headers request :

* `access_token type: String` **required**



params request :

* `task.id  type: Integer ` **required**



response :

```
// success
[ 1 ]


// error : 
{
  "message": "you are not authorize"
}
```





### `PUT /tasks/{task.id}`

Update task.

| Authenticate | Authorized |
| ------------ | ---------- |
| Yes          | Yes        |

headers request :

* `access_token type: String` response :

  ```
  // success
  [ 1 ]
  
  
  // error : 
  {
    "message": "you are not authorize"
  }
  ```

* **required**

body request :
* `title type: String` **required**

params request :

* `task.id  type: Integer ` **required**


response :

```
// success
[ 1 ]


// error : 
{
  "message": "you are not authorize"
}
```


### `PATCH /tasks/{task.id}/assign`

headers request :

* `access_token type: String` **required**


params request :

* `task.id  type: Integer ` **required**


response :

```
// success
[
    null,
    {
        "id": 36,
        "title": "SInga",
        "assignTo": "dedehudianto12@gmail.com",
        "category": "todo",
        "UserId": 1,
        "createdAt": "2020-02-14T10:37:03.773Z",
        "updatedAt": "2020-02-14T10:37:26.839Z"
    }
]


// error : 
{
  "message": "you are not authorize"
}
```

### `PATCH /tasks/{task.id}`

headers request :

* `access_token type: String` **required**


params request :

* `task.id  type: Integer ` **required**

body request :
* `category type: String` **required**

response :

```
// success
[ 1 ]


// error : 
{
  "message": "you are not authorize"
}
```
