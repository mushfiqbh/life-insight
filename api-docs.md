# API Documentation

## Base URL
```
http://onrender.com
```

## Static Files
### Serve Uploaded Images
```
GET /api/image/{filename}
```
- Serves static image files from the `uploads` directory.

---
## User API
Base route: `/api/users`

### Authenticate a User
```
POST /api/users/login
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
**Response:**
- Returns user authentication token on success.

### Register a New User
```
POST /api/users/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "yourpassword"
}
```
**Response:**
- Returns the registered user data.

### Get Current User Info
```
GET /api/users/me
```
**Headers:**
```
Authorization: Bearer <token>
```
**Response:**
- Returns the authenticated user's details.

### Update Current User Info
```
PUT /api/users/
```
**Headers:**
```
Authorization: Bearer <token>
```
**Request Body:** (Any user field to update)
```json
{
  "name": "New Name",
  "email": "newemail@example.com"
}
```
**Response:**
- Returns updated user data.

### Admin Updates Another User
```
PUT /api/users/{userId}
```
**Headers:**
```
Authorization: Bearer <admin-token>
```
**Response:**
- Returns updated user data.

### Delete Current User Account
```
DELETE /api/users/
```
**Headers:**
```
Authorization: Bearer <token>
```
**Response:**
- Deletes the user account and returns a confirmation message.

---
## Post API
Base route: `/api/posts`

### Get List of Posts
```
GET /api/posts/
```
**Response:**
- Returns an array of posts.

### Get a Specific Post
```
GET /api/posts/{postId}
```
**Response:**
- Returns the requested post data.

### Create a New Post
```
POST /api/posts/
```
**Headers:**
```
Authorization: Bearer <token>
```
**Request:** (Multipart form-data)
- `image`: Image file
- `title`: Post title
- `content`: Post content

**Response:**
- Returns the created post data.

### Update a Post
```
PUT /api/posts/{postId}
```
**Headers:**
```
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated Content"
}
```
**Response:**
- Returns the updated post data.

### Increment Post Property (e.g., Likes, Views)
```
PUT /api/posts/{postId}/inc
```
**Response:**
- Returns updated post data.

### Delete a Post
```
DELETE /api/posts/{postId}
```
**Headers:**
```
Authorization: Bearer <token>
```
**Response:**
- Confirms post deletion.

---
## Catalog API
Base route: `/api/catalogs`

### Get List of Catalogs
```
GET /api/catalogs/
```
**Response:**
- Returns an array of catalogs.

### Get a Specific Catalog
```
GET /api/catalogs/{catalogId}
```
**Response:**
- Returns the requested catalog data.

### Create a New Catalog
```
POST /api/catalogs/
```
**Headers:**
```
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "name": "Catalog Name",
  "description": "Catalog Description"
}
```
**Response:**
- Returns created catalog data.

### Update a Catalog
```
PUT /api/catalogs/{catalogId}
```
**Headers:**
```
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated Description"
}
```
**Response:**
- Returns updated catalog data.

### Delete a Catalog
```
DELETE /api/catalogs/{catalogId}
```
**Headers:**
```
Authorization: Bearer <token>
```
**Response:**
- Confirms catalog deletion.

