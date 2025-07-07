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

#### Validation Rules
- `fullname.firstname`: required, minimum 3 characters
- `fullname.lastname`: required, minimum 3 characters
- `email`: required, must be a valid email
- `password`: required, minimum 6 characters

#### Example Request (using curl)
```bash
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "password": "yourpassword"
}'
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

#### Error Responses
- **Status:** `400 Bad Request`
- **Body:**
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

### 2. Login (Not Implemented)

**GET** `/login`

Returns a placeholder message.

#### Example Request
```
GET http://localhost:3000/api/users/login
```

#### Response
```text
Login route not implemented yet
```

---

## Notes

- All endpoints expect and return JSON.
- Make sure your server and MongoDB are running before making requests.
- Use the [Postman Desktop App](https://www.postman.com/downloads/) or `curl` for local testing.

---

## Project Structure

- `controller/user.controller.js` — Handles request logic
- `routes/user.routes.js` — API route definitions
- `models/user.models.js` — Mongoose user schema
- `services/user.services.js` — User database operations

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

## Contact

For questions, open an issue or contact the project maintainer.