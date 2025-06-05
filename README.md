
# 📚 LifeInsight

LifeInsight is a full-stack project designed to provide actionable insights and analytics for personal or organizational growth. This application leverages modern web technologies to deliver a seamless and interactive user experience.

## Features

- User authentication and profile management
- Data visualization and analytics dashboard
- Goal tracking and progress monitoring
- Responsive and intuitive UI

## Tech Stack

- **Frontend:** React, TypeScript, Redux, Tailwind CSS, Cloudinary
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT, OAuth
- **Deployment:** Vercel, GitHub Actions, Azure App Service

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mushfiqbh/LifeInsight.git
   cd LifeInsight
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file in the /backend directory and add the following variables:

   ```bash
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

   Create a `.env` file in the /frontend directory and add the following variables:

   ```bash
   NEXT_PUBLIC_SERVER_URL=http://127.0.0.1:5000
   CONTENT_LANGUAGE=en
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🗂️ API Documentation

Api endpoints are clearly declared in [API-DOCS.md](API-DOCS.md)

This documentation provides a comprehensive overview of the available API endpoints, their methods, and expected parameters.

## 🤝 Contributing

We welcome contributions! Please read our [CONTRIBUTION.md](CONTRIBUTION.md) guide for details on how to get started.

Feel free to suggest improvements, file issues, or open a PR! 🚀

Let me know if you'd like to expand on any section or add details like example requests, error responses, or status codes! 🚀

---

## ✍️ Notes

- File uploads are handled using **Multer** with in-memory storage.
- API responses are in JSON format.
- Default error handling is assumed but can be customized as needed.

---

## 📄 License

This project is licensed under the MIT License.
