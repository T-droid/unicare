
````md
# 🏥 UniCare – Comprehensive Healthcare Management System

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
git clone https://github.com/your-repo/unicare.git

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

