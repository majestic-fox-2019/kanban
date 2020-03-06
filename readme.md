# Kanban 

## Client
https://jovipetra.firebaseapp.com/ 

## Server
https://kanban-jovi.herokuapp.com

## User auth
- url : `/user/`

    - #### Login
        Type : `POST`
        url : `/user/login` 
        Body : 
        ````
        {
            email : String,
            password : String
        }
        ````  
        Response : 
        ```
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb3ZpQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDgkS3ZVbkdjb01RdjBsMDhna0toSnhJZWN2eXpJbzF3Unp3b0RJSnh3L01kOHlYSHBGcFpMUm0iLCJpYXQiOjE1ODIxMjAxNDB9.-kmgjkJiVQL-e7lwoJXa8IOn8INkNo7ZWh8yJGNAHZ8"
        ```
        On Fail : 
        - Unregistered email : 
        ````
        {
            "msg": "user not found"
        }
        ````
        - Wrong password : 
        ````
        {
            "msg": "invalid password"
        }
        ````
    - #### Register
        Type : `POST`
        url : `/user/register` 
        Body : 
        ````
        {
            email : String,
            password : String
        }
        ````  
        Response : 
        ```
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb3ZpQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDgkS3ZVbkdjb01RdjBsMDhna0toSnhJZWN2eXpJbzF3Unp3b0RJSnh3L01kOHlYSHBGcFpMUm0iLCJpYXQiOjE1ODIxMjAxNDB9.-kmgjkJiVQL-e7lwoJXa8IOn8INkNo7ZWh8yJGNAHZ8"
        ```
        On Fail : 
        - Null email : 
        ````
        {
            "msg": "User.email cannot be null"
        }
        ````
        - Null password : 
        ````
        {
            "msg": "User.password cannot be null"
        }
        ````
## Task 
- url : `/task/`
- headers : { token : `STRING` }

- ##### Token required
    response body if token is not provided in the headers : 
    ```
    {
        "msg" : "invalid token"
    }
    ```

    - #### Add new Task
        Type : `POST`
        url : `/task/` 
        Body : 
        ````
        {
            title : String,
            category : String,
            status : String,
        }
        ````  
        Response : 
        ```
        {
            "id": 22,
            "title": "test",
            "category": "ini test Task di dalam project",
            "status": 'backlog,
            "UserId": 1,
            "updatedAt": "2020-02-19T14:38:52.952Z",
            "createdAt": "2020-02-19T14:38:52.952Z",
            "ProjectId": null
        }
        ```
    - #### See all Tasks
        Type : `GET`
        url : `/task/` 
        Response : 
        ```
        [
            {
                "title": 0,
                "id": 22,
                "category": "test",
                "status": "backlog",
                "due_date": null,
                "UserId": 1,
                "updatedAt": "2020-02-19T14:38:52.952Z",
                "createdAt": "2020-02-19T14:38:52.952Z",
                "ProjectId": null
            },
            ...
        ]
        ```
    - #### See a Task
        Type : `GET`
        url : `/task/:id` 
        Response : 
        ```
        {
            "status": 0,
            "id": 22,
            "category": "test",
            "status": "backlog",
            "due_date": null,
            "UserId": 1,
            "updatedAt": "2020-02-19T14:38:52.952Z",
            "createdAt": "2020-02-19T14:38:52.952Z",
            "ProjectId": null
        }
        ```
    - #### Update a Task
        Type : `UPDATE`
        url : `/task/:id`,
        Body : 
        ````
        {
            title : String,
            category : String,
            status : String,
        }
        ````   
        Response : 
        ```
        {
            1
        }
        ```
    - #### Delete a Task
        Type : `DELETE`
        url : `/task/:id`,
        Response : 
        ```
        {
            1
        }
        ```