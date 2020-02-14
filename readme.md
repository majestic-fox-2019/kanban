# Kanban 

### Client Endpoint:

```
https://kanban-v2.firebaseapp.com
```



### Server  Endpoint:

```
https://kanban-v2.herokuapp.com
```



### Before you do anything else..

```
$ npm install
```



### API Documentation:

```
https://documenter.getpostman.com/view/9957966/SzKPUgKC
```



### Environtment Variables:

```
JWT_SECRET = < Your preferred JsonWebToken secret >
DEFAULT_PASSWORD = < Your preferred default password >
```



### Additional Information:



#### Middlewares:

​	This API uses 4 middlewares: 

- Authentication => verifies the token sent on headers from client
- Authorization => verifies ownership of elements within every action made from the client
- ErrorHandler => handles all errors from the server and sends them to the client
- MemberFind => converts userEmail to userId

