# Kanban Server
Kanban App is an app for scheduling and controlling your organization activities.

&nbsp;

## RESTful endpoints
POST /register
POST /login
POST /tasks
POST /organizations
GET /tasks
GET /tasks/:id
PUT /tasks/:id
PATCH /tasks/:id
DELETE /tasks/:id



### POST /register

> Create new account

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": string,
  "password": string
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>"
}
```

_Response (400 - Bad Request)_
```
{
  errors
}
```

### POST /login

> Sign In User

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": string,
  "password": string
}
```

_Response (200 - OK)_
```
{
  accessToken
}
```

_Response (400 - Bad Request)_
```
{
  errors
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### PATCH /users/:id

> Update user organization by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{ id: integer}
```

_Request Body_
```
{
  "OrganizationId": "<OrganizationId to get insert into>"
}
```

_Response (200 - OK)_
```
  {
    "id": <given id by system>,
    "email": "<posted email>",
    "password": "<posted password>"
  }
```
_Response (400 - Bad Request)_
```
{
  Validation Error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```


### POST /tasks

> Create new task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": string,
  "status": string,
  "UserId": integer,
  "email": string,
  "OrganizationId": integer
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "status": "<posted status>",
  "email": "<posted email>",
  "updatedAt": "<new Date()>"
}
```

_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```
### POST /organizations

> Create new task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": string
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted name>"
}
```

_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### GET /tasks

> Get all tasks

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": <given id by system>,
        "name": "<posted name>",
        "status": "<posted status>",
        "email": "<posted email>",
        "updatedAt": "<new Date()>"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### GET /tasks/:id

> Get task by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{ id: integer}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    {
    "id": <given id by system>,
    "name": "<posted name>",
    "status": "<posted status>",
    "email": "<posted email>",
    "updatedAt": "<new Date()>"
    }
  }
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```


### PUT /tasks/:id

> Update task by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{ id: <posted id>}
```

_Request Body_
```
{
  "name": string,
  "status": string,
  "UserId": integer,
  "email": string,
  "OrganizationId": integer
}
```

_Response (200 - OK)_
```
  {
    "id": <given id by system>,
    "name": "<posted name>",
    "status": "<posted status>",
    "email": "<posted email>",
    "updatedAt": "<new Date()>"
  }
```
_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```


### PATCH /tasks/:id

> Update task status by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{ id: integer}
```

_Request Body_
```
{
  "status": "<status to get insert into>"
}
```

_Response (200 - OK)_
```
  {
    "id": <given id by system>,
    "name": "<posted name>",
    "status": "<posted status>",
    "email": "<posted email>",
    "updatedAt": "<new Date()>"
  }
```
_Response (400 - Bad Request)_
```
{
  Validation Error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```


### DELETE /tasks/:id

> Delete task by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{ id: integer}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    message : "task success to delete"
  }
```
_Response (404 - Not Found)_
```
{
  "message": "not found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Invalid request"
}
```

---


