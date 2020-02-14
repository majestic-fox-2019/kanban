# KANBAN



## Table of Content

- **Kanban-API**
  - [Base URL](#base-url)
  - [Installation](#installation)
  - [Usage](#usage)
  - [List of Routes User](#list-of-routes-user)
  - [List of Errors](#list-of-errors)
  - **User Endpoints**
    - [Login](#post-login)
    - [Register](#post-register)
  - **Todo Endpoint**
    - [Show All](#get-tasks)
    - [Create Task](#post-tasks)
    - [Show Task by Id](#get-tasks-by-id)
    - [Change Status Todo Task](#patch-tasks)
    - [Delete Todo Task](#delete-tasks)

------

#### **Base URL :** `http://localhost:3000`

#### **Installation:**

Clone this API from repository and install npm, then on `server` directory install the neccessary npm package

```
$ git clone https://github.com/jetlysandita/kanban.git
$ cd ../server
$ npm install
```

Do the same on `client` directory

#### **Usage:**

Run script from packages by using the command below on `server` directory

```
$ npm run dev
```

Run script from packages by using the command below on `client` directory

```
$ npm start
```

#### List of User Routes:**

| **Route**   | **HTTP** | **Description**                                     |
| ----------- | -------- | --------------------------------------------------- |
| /login      | POST     | Log in and get an access token based on credentials |
| /register   | POST     | Sign up new user                                    |
| /otherlogin | POST     | Sign in OAuth Google Login or other                 |

#### **List of Task Routes:**

| **Route** | **HTTP** | **Description**                                              |
| --------- | -------- | ------------------------------------------------------------ |
| /task     | GET      | Show all task of every user *(login required)*               |
| /task     | POST     | Create new task *(login required)*                           |
| /task/:id | PATCH    | Change category of specified task *(login required)* *(authorization required)* |
| /task/:id | DELETE   | Delete task by id *(login required)* *(authorization required)* |

#### **List of Category Routes:**

| /category     | GET    | Show all task of every user *(login required)*               |
| ------------- | ------ | ------------------------------------------------------------ |
| /category     | POST   | Create new task *(login required)*                           |
| /category/:id | DELETE | Delete task by id *(login required)* *(authorization required)* |

#### **List of Errors:**

| **Code** | **Name**              | **Description**                                |
| -------- | --------------------- | ---------------------------------------------- |
| 400      | Bad Request           | Incorrect user access or form validation       |
| 403      | Forbidden             | Unauthorized access                            |
| 404      | Not Found             | Requested resource not found                   |
| 500      | Internal Server Error | Server currently unable to handle this request |



## **POST Login**

------

- **URL:** `/login`

- **Method:** `POST`

- **Description:** `Log in and get an access token based on credentials`

- **Request body:**

  ```javascript
  {
      "email": "email@domain.com", //required
      "password": "password" //required
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYWZpenVscmlma2loYXdhcmlAZ21haWwuY29tIiwiaWF0IjoxNTgxNjQ0ODM4fQ.cUwd7Tv2KeusXaa58oEeHsF7L9SzK0HxPLWkb8Vfa88",
        "name": "jetly sandita"
    }
    ```

- **Error Response:**

  - **Status:** `400`

    ```javascript
    {
        "message": "Email not found"
    }
    or
    {
        "message": "Password wrong"
  }
    ```

  - **Status:** `500`
  
    ```javascript
    {
        "message": "Server currently unable to handle this request"
    }
    ```

## **POST Register**

------

- **URL:** `/register`

- **Method:** `POST`

- **Description:** `Sign up new user`

- **Request body:**

  ```javascript
  {
      "name": "user", //required
      "email": "email@domain.com", //required
      "password": "password" //required
  }
  ```

- **Success Response:**

  - **Status:** `201`

    ```javascript
    {
        "email": "test@mail.com",
        "name": "jetlya",
    }
    ```

- **Error Response:**

  - **Status:**`400`

    ```javascript
    {
        "name": "Please enter a name",
        "email": "Format email wrong",
        "password": "Please enter a password"
    }
    ```
    
- **Status:** `500`
  
  ```javascript
    {
        "message": "Server currently unable to handle this request"
    }
    ```

## GET Task

------

- **URL:** `/task`

- **Method:** `GET`

- **Description:** `Show all tasks on kanban`

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```javascript
    [
        {
            "id": 1,
            "name": "Backlog",
            "createdAt": "2020-02-11T08:25:50.954Z",
            "updatedAt": "2020-02-11T08:25:50.954Z",
            "Tasks": [
                {
                    "id": 8,
                    "title": "test",
                    "CategoryId": 1,
                    "UserId": 2,
                    "createdAt": "2020-02-12T08:19:56.219Z",
                    "updatedAt": "2020-02-12T12:18:37.047Z",
                    "User": {
                        "id": 2,
                        "name": "jetly",
                        "email": "jetly@gmail.com",
                        "password": "$2b$10$RB0dUxFwIzciNzEOkQxBZugzELv8jzXZQXAav/2AINNc6EU0Qwuxe",
                        "createdAt": "2020-02-12T08:17:59.108Z",
                        "updatedAt": "2020-02-12T08:17:59.108Z"
                    }
                }
            ]
        },
        {
            "id": 2,
            "name": "Development",
            "createdAt": "2020-02-11T08:25:50.954Z",
            "updatedAt": "2020-02-11T08:25:50.954Z",
            "Tasks": [
                {
                    "id": 15,
                    "title": "test",
                    "CategoryId": 2,
                    "UserId": 1,
                    "createdAt": "2020-02-13T08:01:05.555Z",
                    "updatedAt": "2020-02-13T08:01:05.555Z",
                    "User": {
                        "id": 1,
                        "name": "hary",
                        "email": "hary@tirta.com",
                        "password": "$2b$10$z6ulFvPCAJj8bb8HiCyGAecsmQTbZudT5xwK7QN0JD38p5NIX..t2",
                        "createdAt": "2020-02-11T12:41:38.037Z",
                        "updatedAt": "2020-02-11T12:41:38.037Z"
                    }
                }
            ]
        },
        {
            "id": 3,
            "name": "Production",
            "createdAt": "2020-02-11T08:25:50.954Z",
            "updatedAt": "2020-02-11T08:25:50.954Z",
            "Tasks": [
                {
                    "id": 2,
                    "title": "test",
                    "CategoryId": 3,
                    "UserId": 1,
                    "createdAt": "2020-02-11T08:45:16.553Z",
                    "updatedAt": "2020-02-12T12:31:37.752Z",
                    "User": {
                        "id": 1,
                        "name": "hary",
                        "email": "hary@tirta.com",
                        "password": "$2b$10$z6ulFvPCAJj8bb8HiCyGAecsmQTbZudT5xwK7QN0JD38p5NIX..t2",
                        "createdAt": "2020-02-11T12:41:38.037Z",
                        "updatedAt": "2020-02-11T12:41:38.037Z"
                    }
                },
                {
                    "id": 6,
                    "title": "budi",
                    "CategoryId": 3,
                    "UserId": 1,
                    "createdAt": "2020-02-12T05:59:18.006Z",
                    "updatedAt": "2020-02-13T09:39:52.999Z",
                    "User": {
                        "id": 1,
                        "name": "hary",
                        "email": "hary@tirta.com",
                        "password": "$2b$10$z6ulFvPCAJj8bb8HiCyGAecsmQTbZudT5xwK7QN0JD38p5NIX..t2",
                        "createdAt": "2020-02-11T12:41:38.037Z",
                        "updatedAt": "2020-02-11T12:41:38.037Z"
                    }
                },
                {
                    "id": 14,
                    "title": "budi",
                    "CategoryId": 3,
                    "UserId": 1,
                    "createdAt": "2020-02-12T13:44:53.114Z",
                    "updatedAt": "2020-02-13T07:48:20.019Z",
                    "User": {
                        "id": 1,
                        "name": "hary",
                        "email": "hary@tirta.com",
                        "password": "$2b$10$z6ulFvPCAJj8bb8HiCyGAecsmQTbZudT5xwK7QN0JD38p5NIX..t2",
                        "createdAt": "2020-02-11T12:41:38.037Z",
                        "updatedAt": "2020-02-11T12:41:38.037Z"
                    }
                },
                {
                    "id": 10,
                    "title": "test",
                    "CategoryId": 3,
                    "UserId": 1,
                    "createdAt": "2020-02-12T09:06:58.659Z",
                    "updatedAt": "2020-02-13T07:48:00.256Z",
                    "User": {
                        "id": 1,
                        "name": "hary",
                        "email": "hary@tirta.com",
                        "password": "$2b$10$z6ulFvPCAJj8bb8HiCyGAecsmQTbZudT5xwK7QN0JD38p5NIX..t2",
                        "createdAt": "2020-02-11T12:41:38.037Z",
                        "updatedAt": "2020-02-11T12:41:38.037Z"
                    }
                }
            ]
        },
        {
            "id": 4,
            "name": "Done",
            "createdAt": "2020-02-11T08:25:50.954Z",
            "updatedAt": "2020-02-11T08:25:50.954Z",
            "Tasks": [
                {
                    "id": 12,
                    "title": "intall exppress",
                    "CategoryId": 4,
                    "UserId": 1,
                    "createdAt": "2020-02-12T13:44:43.815Z",
                    "updatedAt": "2020-02-13T07:48:04.380Z",
                    "User": {
                        "id": 1,
                        "name": "hary",
                        "email": "hary@tirta.com",
                        "password": "$2b$10$z6ulFvPCAJj8bb8HiCyGAecsmQTbZudT5xwK7QN0JD38p5NIX..t2",
                        "createdAt": "2020-02-11T12:41:38.037Z",
                        "updatedAt": "2020-02-11T12:41:38.037Z"
                    }
                }
            ]
        }
    ]
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "message": "Server currently unable to handle this request"
    }
    ```



## POST Task

------

- **URL:** `/task`

- **Method:** `POST`

- **Description:** `Create new task on user kanban`

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Request body:** Acceptable value of `category` in table category

  ```javascript
  {
      "title": "test",
      "CategoryId": "1"
  }
  ```

- **Success Response:**

  - **Status:** `201`

    ```javascript
    {
        "id": 19,
        "title": "test",
        "CategoryId": 1,
        "UserId": 1,
        "updatedAt": "2020-02-14T09:15:17.071Z",
        "createdAt": "2020-02-14T09:15:17.071Z"
    }
    ```
  
- **Error Response:**

  - **Status:** `400`

    ```javascript
    {
        "title": "Please enter a title",
        "CategoryId": "Please enter a category"
    }
    ```
    
  - **Status:** `500`
  
    ```javascript
    {
        "message": "Server currently unable to handle this request"
    }
    ```
  

## PATCH Task

------

- **URL:** `/task/:id`

- **Method:** `PATCH`

- **Description:** `Change category of specified task` 

- **URL Params:** 

  ```javascript
  "id": 1, //required
  ```

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Request Body:**

  ```javascript
  {
      "category": 1
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```javascript
    {
        "id": 2,
        "title": "test",
        "CategoryId": "1",
        "UserId": 1,
        "createdAt": "2020-02-11T08:45:16.553Z",
        "updatedAt": "2020-02-14T09:18:14.397Z"
    }
    ```
  
- **Error Response:**

  - **Status:** `404`

    ```javascript
    {
        "message": "Not Found"
    }
    ```
    
  - **Status:** `500`
    
    ```javascript
      {
          "message": "Server currently unable to handle this request"
      }
    ```
    
    

## DELETE Task

------

- **URL:** `/task/:id`

- **Method:** `DELETE`

- **Description:** `Delete specified task from list of Kanban tasks`

- **URL Params:** 

  ```javascript
  "id": 1 //required
  ```
  
- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```


- **Success Response:**

  - **Status:** `200`

    ```javascript
    {
        "id": 6,
        "title": "Adding feature socket on app",
        "category": 1,
        "UserId": 2,
        "createdAt": "2020-02-13T09:50:51.289Z",
        "updatedAt": "2020-02-13T09:50:51.289Z"
    }
    ```
  
- **Error Response:**

  - **Status:** `404`

    ```javascript
    {
        "message": "Not Found"
    }
    ```
    
  - **Status:** `500`
    
    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```
