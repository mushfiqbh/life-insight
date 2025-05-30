# LifeInsight

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
   JWT_SECRET=
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
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

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.
