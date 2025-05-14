# UniCare - Comprehensive Healthcare Management System

UniCare is a full-stack healthcare management system designed to streamline operations for hospitals, clinics, and healthcare providers. It offers a robust backend powered by Node.js, TypeScript, and Drizzle ORM, and a modern, responsive frontend built with React, TypeScript, and TailwindCSS. The system is designed to handle various roles, including doctors, lab technicians, pharmacists, and administrators, providing a seamless experience for managing appointments, lab reports, prescriptions, and more.

---

## 🚀 Features

### Frontend
- **React + TypeScript**: A modern, type-safe, and reactive UI framework.
- **Vite**: Lightning-fast development server and build tool.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **Dark Mode Support**: Fully responsive and accessible dark mode.
- **Role-Based Dashboards**: Custom dashboards for doctors, lab technicians, pharmacists, and administrators.
- **Dynamic Routing**: Powered by React Router for seamless navigation.

### Backend
- **Node.js + Express**: High-performance server-side framework.
- **TypeScript**: Type-safe backend development.
- **Drizzle ORM**: Simplified database interactions with PostgreSQL.
- **RESTful APIs**: Well-structured and documented API endpoints.
- **Authentication**: Secure JWT-based authentication.
- **Middleware**: Custom middleware for error handling, authentication, and logging.
- **Swagger Documentation**: Auto-generated API documentation.

---

## 🛠️ Technologies Used

### Frontend
- **React**: Component-based UI library.
- **TypeScript**: Static typing for JavaScript.
- **Vite**: Fast build tool and development server.
- **TailwindCSS**: Utility-first CSS framework.
- **Lucide Icons**: Modern and customizable icon library.

### Backend
- **Node.js**: JavaScript runtime for building scalable applications.
- **Express**: Minimalist web framework for Node.js.
- **TypeScript**: Strongly typed JavaScript.
- **Drizzle ORM**: Lightweight and type-safe ORM for PostgreSQL.
- **Swagger**: API documentation and testing.
- **Morgan**: HTTP request logger middleware.
- **Cors**: Cross-origin resource sharing.

---

## 🏗️ Getting Started

### Prerequisites
- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **PostgreSQL**: v12 or higher

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/unicare.git
   cd unicare-backend
    npm install
    cd ../unicare-frontend
    npm install

    cp .env.example .env        
    cd unicare-backend
    npm run db:reset
    npm run db:seed

    🚀 Running the Project
    Backend
    Start the backend server:
        cd unicare-backend
        npm run dev

    Frontend
    Start the frontend development server:
        cd unicare-frontend
        npm run dev
    Open your browser and navigate to http://localhost:5173 to access the application.

    🧪 Testing
    Backend
    Run unit tests:
        cd unicare-backend
        npm run test

    Frontend
    Run unit tests:
        cd unicare-frontend
        npm run test

    
    📜 API Documentation
    The backend API is documented using Swagger. You can access the documentation at:

    http://localhost:3001/api/v1/docs

    🤝 Contributing
    We welcome contributions from the community. If you have suggestions or improvements, please submit a pull request.
    
---

## 📂 Project Structure

### Frontend

### Backend

