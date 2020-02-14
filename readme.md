# Kanban Todo API documentation
created by Muhammad Ali Mazhuda
<br>


1. Login
* url : http://https://api-kanban.herokuapp.com/login
* method : POST
* header : none
* parameter sent :
    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|email       |String |required
    | 2|password    |String |required

* response : 
    ```
    {
        "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "email": "example@mail.com"
    }
    ```

2. Register
* url : http://https://api-kanban.herokuapp.com/register
* method : POST
* header : none
* parameter sent : 

    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|email       |String |required
    | 2|password    |String |required
* response : 
    ```
    {
        "id": x,
        "email": "example@mail.com",
        "password": "xxxxxxxxxxxxxxxxxxxxxxxxx",
        "updatedAt": "2020-02-14T15:07:07.957Z",
        "createdAt": "2020-02-14T15:07:07.957Z"
    }
    ```
<br>

3. Get category
* url : https://api-kanban.herokuapp.com/category/:projectId
* method : get
* header : {token : "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
* parameter sent : none
* response : 
    ```
    [
        {
            "id": 1,
            "name": "Backlog",
            "createdAt": "2020-02-14T13:47:57.  002Z",
            "updatedAt": "2020-02-14T13:47:57.  002Z",
            "Tasks": [
                {
                    "id": 2,
                    "name": "test",
                    "CategoryId": 1,
                    "createdAt":    "2020-02-14T14:51:50.380Z",
                    "updatedAt":    "2020-02-14T14:51:50.380Z",
                    "ProjectId": 1
                }
            ]
        }
    ]
    ```
<br>

4. Add Project

* url : https://api-kanban.herokuapp.com/project
* method : POST
* header : {token : "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
* parameter sent : 

    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|name       |String |required
    | 2|description    |String |required
* response : 
    ```
    {
        "id": x,
        "name": xxxx,
        "description": xxxx,
        "UserId": x,
        "updatedAt": "2020-02-14T17:03:22.500Z",
        "createdAt": "2020-02-14T17:03:22.500Z"
    }
    ```
<br>

5. Add Task

* url : https://api-kanban.herokuapp.com/task
* method : POST
* header : {token : "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
* parameter sent : 

    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|name       |String |required
    | 2|description    |String |required
    | 3|ProjectId    |Integer |required
* response : 
    ```
    {
        "id": x,
        "name": xxxx,
        "CategoryId": xxxx,
        "ProjectId": xxxx,
        "updatedAt": "2020-02-14T17:08:38.947Z",
        "createdAt": "2020-02-14T17:08:38.947Z"
    }
    ```
<br>

6. Update Task

* url : https://api-kanban.herokuapp.com/task/id
* method : PUT
* header : {token : "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
* parameter sent : 

    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|name       |String |optional
    | 2|description    |String |optional
    | 3|ProjectId    |Integer |optional
* response : 
    ```
    [ x ]
    ```
<br>

7. Delete Task

* url : https://api-kanban.herokuapp.com/task/id
* method : PUT
* header : {token : "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
* parameter sent : 

    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|taskId       |Numbe |required
* response : 
    ```
    1 / 0
    ```
<br>

## HTTP Error Code
---

|No|Code    |Name           |Comment
|--|--------|---------------|---------
| 1|400     |Bad Request    |Missing field on request
| 2|404     |Not Found      |Id not found
| 3|500     |Server Error   |Server Error