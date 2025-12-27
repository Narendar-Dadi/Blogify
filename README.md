# 📝 Blogify - Blogging Platform

Blogify is a dynamic blogging platform built with **Node.js**, **Express**, **MongoDB**, and **EJS**. Users can register, log in, create blogs with image uploads, and comment on posts. The application includes **JWT-based authentication**, **role-based access**, and secure password hashing.

---

## 🚀 Features

- ✅ User Authentication (Sign up, Sign in, Logout)
- 🔐 JWT-based Auth with Secure Cookies
- 📝 Create, Read, and View Blogs
- 🖼️ Image Upload for Blog Covers (using `multer`)
- 💬 Comment System with User Attribution
- 👤 Role Support (USER / ADMIN)
- 📅 Timestamps on Blogs and Comments

---

## Setup Environment Variables
    PORT=8000
    MONGO_URL=mongodb://localhost:27017/blogify
## ✨ Tech Stack
    | Layer        | Technology            |
    | ------------ | --------------------- |
    | Backend      | Node.js, Express.js   |
    | Frontend     | EJS, HTML, CSS        |
    | Database     | MongoDB with Mongoose |
    | Auth         | JWT, Cookies, Crypto  |
    | File Uploads | Multer                |

## 📄 Routes Overview
    | Method | Route          | Description          |
    | ------ | -------------- | -------------------- |
    | GET    | `/`            | Home page with blogs |
    | GET    | `/user/signup` | Registration form    |
    | POST   | `/user/signup` | Register new user    |
    | GET    | `/user/signin` | Login form           |
    | POST   | `/user/signin` | Authenticate user    |
    | GET    | `/user/logout` | Logout user          |

## 🔒 Protected Routes
    | Method | Route               | Description               |
    | ------ | ------------------- | ------------------------- |
    | GET    | `/blog/add-new`     | Form to create a new blog |
    | POST   | `/blog/`            | Submit new blog           |
    | GET    | `/blog/:id`         | View individual blog      |
    | POST   | `/blog/comment/:id` | Add a comment to a blog   |

## 🔒 Authentication Flow

The application uses JWT (JSON Web Token) authentication and secure cookies to manage user sessions securely.

### 1. ✅ Signup (/user/signup)

  User fills out registration form.

  A random salt is generated.

### 2. 🔑 Login (/user/signin)
  User submits email and password.

  Server retrieves user and rehashes the password with stored salt.

  If passwords match, a JWT token is created and sent as a cookie.

  Salt and hashed password are stored in MongoDB. 
