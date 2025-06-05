
# 📚 API Documentation

This document describes the available API endpoints, their methods, parameters, and usage for your Express.js backend.
---

## 🌐 Base URL

```
http://localhost:<PORT>/api/
```

Replace `<PORT>` with your configured port (`5000` by default).

---

## 📁 Static Files

### GET `/api/image/:filename`

Serves images from the `uploads` folder.

---

## 👤 Users

Base route: `/api/users`

| Method | Endpoint     | Description                              | Auth Required |
| ------ | ------------ | ---------------------------------------- | ------------- |
| GET    | `/`          | Get current user's information           | ✅            |
| POST   | `/login`     | Log in an existing user                  | ❌            |
| POST   | `/register`  | Register a new user                      | ❌            |
| DELETE | `/`          | Delete current user's account            | ✅            |
| PUT    | `/`          | Update current user's info               | ✅            |
| PUT    | `/:targetId` | Admin updates another user's permissions | ✅            |

---

## 🔎 Search

Base route: `/api/search`

| Method | Endpoint  | Description           | Auth Required |
| ------ | --------- | --------------------- | ------------- |
| GET    | `/:query` | Search posts or users | ❌            |

---

## 📝 Posts

Base route: `/api/posts`

| Method | Endpoint       | Description                           | Auth Required |
| ------ | -------------- | ------------------------------------- | ------------- |
| GET    | `/`            | Get all posts                         | ❌            |
| GET    | `/filter`      | Get filtered posts                    | ❌            |
| GET    | `/:postId`     | Get a single post by ID               | ❌            |
| POST   | `/`            | Create a new post (with image upload) | ✅            |
| PUT    | `/:postId`     | Update a post (form data)             | ✅            |
| PUT    | `/:postId/inc` | Increment view count                  | ❌            |
| DELETE | `/:postId`     | Delete a post by ID                   | ✅            |

🔧 **Note:** Images are uploaded using `multer.memoryStorage()`.

---

## ⚙️ Conditions

Base route: `/api/conditions`

| Method | Endpoint             | Description                       | Auth Required |
| ------ | -------------------- | --------------------------------- | ------------- |
| GET    | `/index`             | Get condition index (summary)     | ❌            |
| GET    | `/`                  | Get a list of conditions          | ❌            |
| GET    | `/:label`            | Get a specific condition by label | ❌            |
| GET    | `/byid/:conditionId` | Get a condition by its ID         | ❌            |
| POST   | `/`                  | Create a new condition            | ✅            |
| PUT    | `/:conditionId`      | Update a condition by ID          | ✅            |
| DELETE | `/:conditionId`      | Delete a condition by ID          | ✅            |

---

## 🛡️ Authentication

Most routes that modify resources (POST, PUT, DELETE) require authentication via a middleware called `authMiddleware`. It typically validates a token sent in the request headers (e.g., Authorization: Bearer `<token>`).

---

## 🗂️ Environment Variables

| Variable       | Description                               |
| -------------- | ----------------------------------------- |
| `PORT`         | Server port (default: 5000)               |
| `DATABASE_URL` | MongoDB connection string                 |
| `NODE_ENV`     | Environment name (Development/Production) |

---

## 🚀 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file:

   ```env
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

3. Run the server:

   ```bash
   npm start
   ```

---

## ✍️ Notes

- File uploads are handled using **Multer** in memory storage.
- API returns JSON responses.
- Default error handling is assumed but can be customized.

---

Let me know if you’d like to add details (e.g., error responses, example payloads, or authentication token examples)! 🚀
