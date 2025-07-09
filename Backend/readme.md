# UberClone Backend API Documentation

This backend provides user registration and authentication endpoints for the UberClone project.

---

## Base URL

```
http://localhost:3000/api/users
```
*(Replace `3000` with your server port if different)*

---

## Endpoints

### 1. Register User

**POST** `/register`

Registers a new user.

#### Request Body (JSON)
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
- **Status:** `201 Created`
- **Body:**
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

---

### 2. Login User

**POST** `/login`

Authenticates a user and returns a JWT token.

#### Request Body (JSON)
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

#### Success Response
- **Status:** `200 OK`
- **Body:**
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
- **Status:** `401 Unauthorized`
- **Body:**
```json
{
  "error": "Invalid credentials"
}
```

---

### 3. Get User Profile

**GET** `/profile`

Returns the authenticated user's profile.  
**Requires Authorization:**  
Send the JWT token in the `Authorization` header as `Bearer <token>` or as a cookie if set.

#### Example Request (with Bearer token)
```
GET /api/users/profile
Authorization: Bearer jwt_token_here
```

#### Success Response
- **Status:** `200 OK`
- **Body:**
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
  }
}
```

#### Error Response
- **Status:** `401 Unauthorized`
- **Body:**
```json
{
  "error": "Not authorized"
}
```

---

### 4. Logout User

**GET** `/logout`

Logs out the authenticated user by blacklisting the JWT token (if implemented) and clearing the cookie.

#### Example Request
```
GET /api/users/logout
Authorization: Bearer jwt_token_here
```

#### Success Response
- **Status:** `200 OK`
- **Body:**
```json
{
  "message": "Logged out successfully"
}
```

---

## Notes

- All endpoints expect and return JSON.
- Use the [Postman Desktop App](https://www.postman.com/downloads/) or `curl` for local testing.
- For protected routes (`/profile`, `/logout`), you must provide a valid JWT token.

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

- `controller/user.controller.js` — Handles request logic
- `routes/user.routes.js` — API route definitions
- `models/user.models.js` — Mongoose user schema
- `services/user.services.js` — User database operations

---

## Contact

For questions, open an issue or contact the project maintainer.