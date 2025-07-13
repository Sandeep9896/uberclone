# UberClone Backend API Documentation

This backend provides user and captain registration, authentication, and profile endpoints for the UberClone project.

---

## Base URL

```
http://localhost:3000/api
```
*(Replace `3000` with your server port if different)*

---

## User Endpoints

### 1. Register User

**POST** `/users/register`

Registers a new user.

#### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "yourpassword"
}
```

#### Success Response
```json
{
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  },
  "token": "jwt_token_here"
}
```

#### Error Response
```json
{
  "error": "User already exists"
}
```
or
```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

### 2. Login User

**POST** `/users/login`

Authenticates a user and returns a JWT token.

#### Request Body
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

#### Success Response
```json
{
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  },
  "token": "jwt_token_here"
}
```

#### Error Response
```json
{
  "error": "Invalid credentials"
}
```

---

### 3. Get User Profile

**GET** `/users/profile`

Returns the authenticated user's profile.

#### Headers
```
Authorization: Bearer jwt_token_here
```

#### Success Response
```json
{
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  },
  "message": "User profile retrieved successfully"
}
```

#### Error Response
```json
{
  "message": "Unauthorized access"
}
```

---

### 4. Logout User

**GET** `/users/logout`

Logs out the authenticated user by blacklisting the JWT token and clearing the cookie.

#### Headers
```
Authorization: Bearer jwt_token_here
```

#### Success Response
```json
{
  "message": "Logged out successfully"
}
```

#### Error Response
```json
{
  "message": "Unauthorized access"
}
```

---

## Captain Endpoints

### 1. Register Captain

**POST** `/captains/register`

Registers a new captain.

#### Request Body
```json
{
  "fullname": {
    "firstname": "Ahmed",
    "lastname": "Khan"
  },
  "email": "ahmed.khan@example.com",
  "password": "securepass123",
  "status": "active",
  "vehicle": {
    "color": "Black",
    "plate": "ABC-1234",
    "capacity": 4,
    "vechileType": "car",
    "location": {
      "lat": 24.8607,
      "lon": 67.0011
    }
  }
}
```

#### Success Response
```json
{
  "success": true,
  "message": "Captain registered successfully",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Ahmed",
      "lastname": "Khan"
    },
    "email": "ahmed.khan@example.com",
    "status": "active",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vechileType": "car",
      "location": {
        "lat": 24.8607,
        "lon": 67.0011
      }
    }
  }
}
```

#### Error Response
```json
{
  "message": "Captain already exists"
}
```
or
```json
{
  "errors": [
    {
      "msg": "Color must be at least 3 characters long",
      "param": "vehicle.color",
      "location": "body"
    }
  ]
}
```

---

### 2. Login Captain

**POST** `/captains/login`

Authenticates a captain and returns a JWT token.

#### Request Body
```json
{
  "email": "ahmed.khan@example.com",
  "password": "securepass123"
}
```

#### Success Response
```json
{
  "success": true,
  "message": "Captain logged in successfully",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Ahmed",
      "lastname": "Khan"
    },
    "email": "ahmed.khan@example.com",
    "status": "active",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vechileType": "car",
      "location": {
        "lat": 24.8607,
        "lon": 67.0011
      }
    }
  },
  "token": "jwt_token_here"
}
```

#### Error Response
```json
{
  "message": "Invalid credentials"
}
```

---

### 3. Get Captain Profile

**GET** `/captains/profile`

Returns the authenticated captain's profile.

#### Headers
```
Authorization: Bearer jwt_token_here
```

#### Success Response
```json
{
  "success": true,
  "message": "Captain profile retrieved successfully",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Ahmed",
      "lastname": "Khan"
    },
    "email": "ahmed.khan@example.com",
    "status": "active",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vechileType": "car",
      "location": {
        "lat": 24.8607,
        "lon": 67.0011
      }
    }
  }
}
```

#### Error Response
```json
{
  "message": "Unauthorized access"
}
```

---

### 4. Logout Captain

**GET** `/captains/logout`

Logs out the authenticated captain by blacklisting the JWT token and clearing the cookie.

#### Headers
```
Authorization: Bearer jwt_token_here
```

#### Success Response
```json
{
  "message": "Logged out successfully"
}
```

#### Error Response
```json
{
  "message": "Unauthorized access"
}
```

---

## Environment Variables

Create a `.env` file in the root of your backend with:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/uberclone
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

---

## Project Structure

- `controller/` — Handles request logic
- `routes/` — API route definitions
- `models/` — Mongoose schemas
- `services/` — Database operations
- `middleware/` — Authentication and other middleware

---

## Notes

- All endpoints expect and return JSON.
- Use the [Postman Desktop App](https://www.postman.com/downloads/) or `curl` for local testing.
- For protected routes, you must provide a valid JWT token.

---