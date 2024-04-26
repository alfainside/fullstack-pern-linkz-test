# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username" : "testuser",
  "password" : "secret",
  "name" : "Test User"
}
```

Response Body (Success) : 

```json
{
  "data" : {
    "username" : "testuser",
    "name" : "Test User"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username" : "testuser",
  "password" : "secret"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "testuser",
    "name" : "Test User",
    "token" : "session_id_generated"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username or password is wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Headers :
- Authorization: token

Response Body (Success) :

```json
{
  "data" : {
    "username" : "testuser",
    "name" : "Test User"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :
- Authorization: token

Request Body :

```json
{
  "password" : "secret", // optional, if want to change password
  "name" : "Test User" // optional, if want to change name
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "testuser",
    "name" : "Test User"
  }
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers :
- Authorization: token

Response Body (Success) :

```json
{
  "data" : true
}
```