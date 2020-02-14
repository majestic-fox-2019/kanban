# Kanban 

<h3>All Routers</h3>
<pre>


POST | http://localhost:3000/loginGoogle
 * Get login with your google acccount, using Google OAuth 2.0.

POST | http://localhost:3000/register
* Create a new account by entering certain data.

POST | http://localhost:3000/login
 * Get login with account that was created before, on the register menu.
 
 //*Authentication Required*

 GET | http://localhost:3000/categories
 * Get all **'Categories'** from server.

 GET | http://localhost:3000/categories/{id}
 * Get one **'Categories'** from server based on '*id*' data.

POST | http://localhost:3000/categories
* Add new data to **'Categories'**.

PATCH | http://localhost:3000/categories/{id}
* Edit **'Categories'** data that has the same '*id*' as the params in the url.

DELETE | http://localhost:3000/categories/{id}
* Delete **'Categories'** data that has the same '*id*' as the params in the url

GET | http://localhost:3000/tasks
 * Get all **'Tasks'** from server.

GET | http://localhost:3000/tasks/{id}
 * Get one **'Tasks'** from server based on '*id*' data.

POST | http://localhost:3000/tasks
* Add new data to **'Tasks'**.

PATCH | http://localhost:3000/tasks/{id}
* Edit **'Tasks'** data that has the same '*id*' as the params in the url.

DELETE | http://localhost:3000/tasks/{id}
* Delete **'Tasks'** data that has the same '*id*' as the params in the url

</pre>

<br>
<br>
<br>

<h3>All Request</h3>
<pre>

//*Authentication Not Required*

POST | http://localhost:3000/loginGoogle

    1. Enter your google email
    2. Enter your google password
 


POST | http://localhost:3000/register

    1. Enter your name
    2. Enter your email
    3. Enter your password

POST | http://localhost:3000/login

    1. Enter your email
    2. Enter your password

 

 GET | http://localhost:3000/categories

    nothing request

 GET | http://localhost:3000/categories/{id}

 
    1. Enter params at URL

POST | http://localhost:3000/categories

    1. Enter new title

PATCH | http://localhost:3000/categories/{id}

    1. Enter params at URL
    2. Enter new title

DELETE | http://localhost:3000/categories/{id}

    1. Enter params at URL

GET | http://localhost:3000/tasks

    nothing request

GET | http://localhost:3000/tasks/{id}

    1. Enter params at URL

POST | http://localhost:3000/tasks

    1. Enter new title
    2. Automatically get category id

PATCH | http://localhost:3000/tasks/{id}

    1. Enter params at URL
    2. Enter new title

DELETE | http://localhost:3000/tasks/{id}

    1. Enter params at URL

</pre>

<br>
<br>
<br>

<h3>All Success Respons</h3>
<pre>

POST: **200** | http://localhost:3000/loginGoogle

    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MSwibmFtZSI6Im5hbmRhIiwiaWF0IjoxNTgxNjM4MTcwfQ5Uf5KAynZ-t1iYMApr9ikGbFXt8U5s04DOi4V3WqIME"
    }
 


POST: **201** | http://localhost:3000/register

    {
        "id": 1,
        "name": "nanda",
        "email": "nanda@gmail.com",
        "password":     "$2b$10$CVylJQ36l55jGtmLCwjfdOlL5vyJkfoXFA9grh.8I3oaQupPxLa8q",
        "updatedAt": "2020-02-12T11:55:53.759Z",
        "createdAt": "2020-02-12T11:55:53.759Z"
    }

POST: **200** | http://localhost:3000/login

    {
        "token":    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MSwibmFtZSI6Im5hbmRhIiwiaWF0IjoxNTgxNjM4MTcwfQ5Uf5KAynZ-t1iYMApr9ikGbFXt8U5s04DOi4V3WqIME"
    }

 

GET: **200** | http://localhost:3000/categories

    [
        {
            "id": 1,
            "title": "Backlog",
            "createdAt": "2020-02-12T11:55:36.584Z",
            "updatedAt": "2020-02-14T03:05:22.889Z",
            "Tasks": 
            [
                {
                    "id": 11,
                    "title": "User a mail service for incoming emails .get rid out of our custom EC2 POP server",
                    "CategoryId": 1,
                    "createdAt": "2020-02-12T11:55:36.681Z",
                    "updatedAt": "2020-02-14T00:22:03.668Z"
                },
                ...
            ]
        }
        ...
    ]

GET: **200** | http://localhost:3000/categories/{id}

    {
        "id": 1,
        "title": "Nanda",
        "createdAt": "2020-02-11T12:52:30.146Z",
        "updatedAt": "2020-02-11T12:52:30.146Z"
}

POST: **201** | http://localhost:3000/categories

    {
        "id": 1,
        "title": "Nanda",
        "updatedAt": "2020-02-11T12:52:30.146Z",
        "createdAt": "2020-02-11T12:52:30.146Z"
    }

PATCH: **200** | http://localhost:3000/categories/{id}

    {
        "id": 2,
        "title": "todo",
        "createdAt": "2020-02-12T11:55:36.584Z",
        "updatedAt": "2020-02-14T04:54:26.736Z"
    }

DELETE: **200** | http://localhost:3000/categories/{id}

    1 //amount of deleted data

GET: **200** | http://localhost:3000/tasks

    [
        {
          "id": 4,
          "title": "New account creation flow",
          "CategoryId": 1,
          "createdAt": "2020-02-12T11:55:36.681Z",
          "updatedAt": "2020-02-12T11:55:36.681Z"
        },
        {
          "id": 5,
          "title": "API",
          "CategoryId": 1,
          "createdAt": "2020-02-12T11:55:36.681Z",
          "updatedAt": "2020-02-12T11:55:36.681Z"
        },
        ...
    ]

GET: **200** | http://localhost:3000/tasks/{id}

    {
        "id": 10,
        "title": "Newspaper - click on post doesn't work on mobile",
        "CategoryId": 2,
        "createdAt": "2020-02-12T11:55:36.681Z",
        "updatedAt": "2020-02-14T00:09:38.964Z"
    }

POST: **201** | http://localhost:3000/tasks

    {
        "id": 10,
        "title": "Newspaper - click on post doesn't work on mobile",
        "CategoryId": 2,
        "createdAt": "2020-02-12T11:55:36.681Z",
        "updatedAt": "2020-02-14T00:09:38.964Z"
    }

PATCH: **200** | http://localhost:3000/tasks/{id}

    {
        "id": 10,
        "title": "todo",
        "createdAt": "2020-02-12T11:55:36.681Z",
        "updatedAt": "2020-02-14T07:01:40.207Z",
        "CategoryId": 2
    }

DELETE: **200** | http://localhost:3000/tasks/{id}

    1 //amount of deleted data

</pre>

<br>
<br>
<br>

<h3>All Error Respons</h3>
<pre>

//*Authentication Not Required*

POST | http://localhost:3000/loginGoogle

    1. 500: "Internal server error!"
        * There was a problem with the server


POST | http://localhost:3000/register

    1. 400: "Some Validation Error"
        * There was an error with the input problem
    2. 500: "Internal server error!"
        * There was a problem with the server


POST | http://localhost:3000/login

    1. 400: "Some Validation Error"
        * There was an error with the input problem
    2. 404: "User is not found!"
        * Incorrect username or password or user not found
    3. 500: "Internal server error!"
        * There was a problem with the server
 

 GET | http://localhost:3000/categories

    1. 500: "Internal server error!"
        * There was a problem with the server


 GET | http://localhost:3000/categories/{id}

    1. 404: "Data is not found!"
        * Data not found on server
    2. 500: "Internal server error!"
        * There was a problem with the server


POST | http://localhost:3000/categories

    1. 400: "Some Validation Error"
        * There was an error with the input problem
    2. 500: "Internal server error!"
        * There was a problem with the server


PATCH | http://localhost:3000/categories/{id}

    1. 400: "Some Validation Error"
        * There was an error with the input problem
    2. 404: "Data is not found!"
        * Data not found on server
    3. 500: "Internal server error!"
        * There was a problem with the server    

DELETE | http://localhost:3000/categories/{id}

    1. 404: "Data is not found!"
        * Data not found on server
    2. 500: "Internal server error!"
        * There was a problem with the server  


GET | http://localhost:3000/tasks

    1. 500: "Internal server error!"
        * There was a problem with the server


GET | http://localhost:3000/tasks/{id}

    1. 404: "Data is not found!"
        * Data not found on server
    2. 500: "Internal server error!"
        * There was a problem with the server


POST | http://localhost:3000/tasks

    1. 400: "Some Validation Error"
        * There was an error with the input problem
    2. 500: "Internal server error!"
        * There was a problem with the server


PATCH | http://localhost:3000/tasks/{id}

    1. 400: "Some Validation Error"
        * There was an error with the input problem
    2. 404: "Data is not found!"
        * Data not found on server
    3. 500: "Internal server error!"
        * There was a problem with the server   


DELETE | http://localhost:3000/tasks/{id}

    1. 404: "Data is not found!"
        * Data not found on server
    2. 500: "Internal server error!"
        * There was a problem with the server  

</pre>