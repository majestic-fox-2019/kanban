# Kanban 
### created by Fadhilah Rayafi Varselia on February 2020

## Routes on Kanban
* ### Route: http://loccalhost:3000/tasks
    - Method : GET
    - Response : 
      * code 200 :
      ```
              [
                {
                  "id": 1,
                  "title": type data string,
                  "status": type data string,
                  "category": type data string,
                  "date": type data date,
                  "UserId": type data number,
                  "createdAt": "type data date",
                  "updatedAt": "type data date"
                }
              ]
      ```
      
      * code 500 :
        ```
          {
            "err": {
              "code": 500,
              "message": "internal server error"
            },
            "msg": "internal server error"
          }
        ```
* ### Route: http://loccalhost:3000/tasks  
    - Method : POST
    - Request headers : 
        ```
        {
          "token": type data string
        }
        ```
    - Request body :
        ```
        {
            "title": type data string,
            "status": type data string,
            "category": type data string,
            "date": type data date,
        }
        ```
    - Response :
       
      * code 200 :
      ```
                {
                  "id": 1,
                  "title": type data string,
                  "status": type data string,
                  "date": type data date,
                  "UserId": type data number,
                  "createdAt": "type data date",
                  "updatedAt": "type data date"
                }
         ``` 
      * code 500 :
        ```
          {
            "err": {
              "code": 500,
              "message": "internal server error"
            },
            "msg": "internal server error"
          }
        ```

      * code 400 :
      ```
        {
          "err": {
            "code": 500,
            "message": [
              "title must be filled",
              "date must be filled",
              ]
          },
          "msg": "internal server error"
        }
      ```

      * code 401 :
        ```
          {
            "err": {
              "code": 401,
              "message": "invalid user"
            },
            "msg": "invalid user"
          }
        ```

      * code 401 :
        ```
          {
            "err": {
              "code": 401,
              "message": "please register or login first to do this task"
            },
            "msg": "please register or login first to do this task"
          }
        ```

* ### Route: http://loccalhost:3000/tasks/:id
    - Method : DELETE
    - Request headers : 
        ```
        {
          "token": type data string
        }
        ```

    - Response : 
      * code 200 :
      ```
                {
                  "id": 1,
                  "title": type data string,
                  "status": type data string,
                  "date": type data date,
                  "UserId": type data number,
                  "createdAt": "type data date",
                  "updatedAt": "type data date"
                }
        ```
          
      * code 500 :
        ```
          {
            "err": {
              "code": 500,
              "message": "internal server error"
            },
            "msg": "internal server error"
          }
        ```

      * code 401 :
        ```
          {
            "err": {
              "code": 401,
              "message": "invalid user"
            },
            "msg": "invalid user"
          }
        ```

      * code 401 :
        ```
          {
            "err": {
              "code": 401,
              "message": "please register or login first to do this task"
            },
            "msg": "please register or login first to do this task"
          }
        ```

* ### Route: http://loccalhost:3000/tasks/next/:id  
    - Method : PUT
    - Request headers : 
        ```
        {
          "token": type data string
        }
        ```
    - Request body :
        ```
        {
            "title": type data string,
            "status": type data string,
            "category": type data string,
            "date": type data date,
        }
        ```
    - Response : 
      * code 200 :
      ```
                {
                  "id": 1,
                  "title": type data string,
                  "status": type data string,
                  "date": type data date,
                  "UserId": type data number,
                  "createdAt": "type data date",
                  "updatedAt": "type data date"
                }
      ```
          
      * code 500 :
        ```
          {
            "err": {
              "code": 500,
              "message": "internal server error"
            },
            "msg": "internal server error"
          }
        ```

      * code 400 :
      ```
        {
          "err": {
            "code": 500,
            "message": [
              "title must be filled",
              "date must be filled",
              ]
          },
          "msg": "internal server error"
        }
      ```

      * code 401 :
        ```
          {
            "err": {
              "code": 401,
              "message": "invalid user"
            },
            "msg": "invalid user"
          }
        ```

      * code 401 :
        ```
          {
            "err": {
              "code": 401,
              "message": "please register or login first to do this task"
            },
            "msg": "please register or login first to do this task"
          }
        ```

* ### Route: http://loccalhost:3000/tasks/back/:id  
    - Method : PUT
    - Request headers : 
        ```
        {
          "token": type data string
        }
        ```
    - Request body :
        ```
        {
            "title": type data string,
            "status": type data string,
            "category": type data string,
            "date": type data date,
        }
        ```
    - Response : 
      * code 200 :
      ```
                {
                  "id": 1,
                  "title": type data string,
                  "status": type data string,
                  "date": type data date,
                  "UserId": type data number,
                  "createdAt": "type data date",
                  "updatedAt": "type data date"
                }
      ```
          
      * code 500 :
        ```
          {
            "err": {
              "code": 500,
              "message": "internal server error"
            },
            "msg": "internal server error"
          }
        ```

      * code 400 :
      ```
        {
          "err": {
            "code": 500,
            "message": [
              "title must be filled",
              "date must be filled",
              ]
          },
          "msg": "internal server error"
        }
      ```

      * code 401 :
        ```
          {
            "err": {
              "code": 401,
              "message": "invalid user"
            },
            "msg": "invalid user"
          }
        ```

      * code 401 :
        ```
          {
            "err": {
              "code": 401,
              "message": "please register or login first to do this task"
            },
            "msg": "please register or login first to do this task"
          }
        ```

* ### Route: http://loccalhost:3000/remind-friend 
    - Method : POST
    - Request headers : 
        ```
        {
          "token": type data string
        }
        ```
    - Request body :
        ```
        {
            "email": type data string,
            "inputText": type data string
        }
        ```
    - Response : 
      * code 500 :
        ```
          {
            "err": {
              "code": 500,
              "message": "internal server error"
            },
            "msg": "internal server error"
          }
        ```

* ### Route: http://loccalhost:3000/users  
    - Method : POST
    - Request headers : 
        ```
        {
          "token": type data string
        }
        ```

    - Response : 
      * code 200 :
      ```
                [
                  {
                  "id": 1,
                  "name": type data string,
                  "email": type data string,
                  "password": type data date,
                  "createdAt": "type data date",
                  "updatedAt": "type data date"
                  }
                ]
      ```
                
      * code 500 :
        ```
          {
            "err": {
              "code": 500,
              "message": "internal server error"
            },
            "msg": "internal server error"
          }
        ```

* ### Route: http://loccalhost:3000/register
    - Method : POST
    - Request body :
        ```
        {
            "name": type data string,
            "email": type data string,
            "password": type data date
        }
        ```
    - Response : 
      * code 200 :
        ```
        {
            "id": type data number,
            "name": type data string,
            "email": type data string,
            "password": type data date,
            "createdAt": "type data date",
            "updatedAt": "type data date"
        }
        ```
      * code 500 :
        ```
          {
            "err": {
              "code": 500,
              "message": "internal server error"
            },
            "msg": "internal server error"
          }
        ```     
       * code 400 :
          ```
            {
              "err": {
                "code": 500,
                "message": [
                  "name must be filled",
                  "email must be filled",
                  "password must be filled",
                  "email format infalid",
                  "email already registered"
                  ]
              },
              "msg": "internal server error"
            }
          ```

* ### Route: http://loccalhost:3000/login
    - Method : POST
    - Request body :
        ```
        {
            "email": type data string,
            "password": type data date
        }
        ```
    - Response : 
      * code 200 :
        ```
          {
            "id": type data number,
            "name": type data string,
            "email": type data string,
            "password": type data date,
            "createdAt": "type data date",
            "updatedAt": "type data date"
          }
        ```
      * code 500 :
        ```
          {
            "err": {
              "code": 500,
              "message": "internal server error"
            },
            "msg": "internal server error"
          }
        ```     
       * code 400 :
          ```
            {
              "err": {
                "code": 500,
                "message": [
                  "name must be filled",
                  "email must be filled",
                  "password must be filled",
                  "email format infalid",
                  "email already registered"
                  ]
              },
              "msg": "internal server error"
            }
          ```


