# 🏥 UniCare – Comprehensive Healthcare Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/your-username/unicare/ci.yml?branch=main)](https://github.com/your-username/unicare/actions)
[![Issues](https://img.shields.io/github/issues/your-username/unicare)](https://github.com/your-username/unicare/issues)
[![Forks](https://img.shields.io/github/forks/your-username/unicare?style=social)](https://github.com/your-username/unicare/network/members)
[![Stars](https://img.shields.io/github/stars/your-username/unicare?style=social)](https://github.com/your-username/unicare/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/your-username/unicare)](https://github.com/your-username/unicare/commits/main)
[![Contributors](https://img.shields.io/github/contributors/your-username/unicare)](https://github.com/your-username/unicare/graphs/contributors)

---

## 🧰 Built With

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Drizzle ORM-8B5CF6?style=for-the-badge&logo=drizzle&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Lucide-121212?style=for-the-badge&logo=lucide&logoColor=white"/>
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black"/>
</p>

---

**UniCare** is a modern, full-stack healthcare management system tailored for hospitals, clinics, and healthcare providers. It supports a variety of user roles including doctors, lab technicians, pharmacists, and administrators.

Built with a powerful backend using **Node.js**, **TypeScript**, and **Drizzle ORM**, and a sleek frontend using **React**, **TypeScript**, and **TailwindCSS**.

---

## 🚀 Features

### 🖥️ Frontend
- ⚛️ **React + TypeScript** – Fast, reactive, and type-safe UI
- ⚡ **Vite** – Super-fast dev environment & bundler
- 🎨 **TailwindCSS** – Utility-first styling with full responsiveness
- 🌙 **Dark Mode** – Elegant dark/light mode switching
- 👥 **Role-Based Dashboards** – Custom interfaces per user role
- 🔀 **Dynamic Routing** – Powered by React Router

### 🔧 Backend
- 🧠 **Node.js + Express** – High-performance server architecture
- 🔐 **JWT Authentication** – Secure login and session management
- 🧱 **Drizzle ORM** – Elegant and type-safe PostgreSQL interactions
- 🧾 **Swagger** – Auto-generated API documentation
- 🧰 **Custom Middleware** – For authentication, error handling, and logging

---

## 🛠️ Tech Stack

| Layer      | Technology                              |
|------------|------------------------------------------|
| Frontend   | React, TypeScript, Vite, TailwindCSS, Lucide Icons |
| Backend    | Node.js, Express, TypeScript, Drizzle ORM |
| Utilities  | Swagger, Morgan, CORS                   |
| Database   | PostgreSQL                              |

---

## 📦 Installation & Setup

### 🔍 Prerequisites
- Node.js `v16+`
- npm `v8+`
- PostgreSQL `v12+`

### ⚙️ Install & Run

```bash
# Clone the repository
git clone https://github.com/your-username/unicare.git

# Install backend dependencies
cd unicare-backend
npm install

# Install frontend dependencies
cd ../unicare-frontend
npm install

# Set up environment variables
cp .env.example .env

# Reset and seed the database
cd ../unicare-backend
npm run db:reset
npm run db:seed
````

### 🚀 Running the Project

```bash
# Backend
cd unicare-backend
npm run dev
```

```bash
# Frontend
cd ../unicare-frontend
npm run dev
```

🔗 Open your browser: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing

```bash
# Backend tests
cd unicare-backend
npm run test
```

```bash
# Frontend tests
cd ../unicare-frontend
npm run test
```

---

## 📘 API Documentation

Swagger UI is available at:

> [http://localhost:3001/api/v1/docs](http://localhost:3001/api/v1/docs)

---

## 📁 Project Structure

```
unicare/
├── unicare-backend/       # Express + TypeScript + Drizzle ORM
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── db/
│   └── ...
├── unicare-frontend/      # React + TypeScript + TailwindCSS
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── ...
```

---

## 🤝 Contributing

We welcome contributions from the community! Please feel free to:

* ⭐ Star this project
* 📂 Fork the repo
* 🔧 Open issues
* 🚀 Submit pull requests

---

## 📄 License

This project is licensed under the **MIT License**.


