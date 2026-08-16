# E-Commerce Web Application

A full-stack e-commerce web application built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**.

The application provides product browsing, search, category filtering, wishlist, shopping cart, user authentication, profile management, shipping addresses, checkout, Razorpay payment integration, and order management.

---

## Features

### User Features

- User registration
- User login/logout
- User profile
- Edit profile
- Profile picture upload
- Product listing
- Product details
- Related products
- Product search
- Category filtering
- Add to cart
- Remove from cart
- Clear cart
- Wishlist
- Remove products from wishlist
- Buy Now functionality
- Multiple shipping addresses
- Address selection during checkout
- Order summary
- Razorpay payment integration
- Payment verification
- Payment failure handling
- Order history
- View individual order details
- Order success page

### Admin Features

- Admin login
- Admin dashboard
- Role-based authentication

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- React Toastify

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Razorpay

## Payment Gateway

- Razorpay

---

# Project Structure

```text
E-Commerce/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── Components/
│   │   │
│   │   ├── Context/
│   │   │   ├── AppContext.jsx
│   │   │   └── AppState.jsx
│   │   │
│   │   ├── Pages/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── Profile/
│   │   │   ├── Products/
│   │   │   ├── Cart/
│   │   │   ├── Wishlist/
│   │   │   ├── Checkout/
│   │   │   ├── Payment/
│   │   │   └── Orders/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md

Frontend Setup

Go to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will normally run on:

http://localhost:5173
Backend Setup

Open another terminal.

cd backend

Install dependencies:

npm install

Start the backend:

npm start

Or, if using nodemon:

npm run dev

The backend will run on:
http://localhost:3200

#The frontend uses packages such as:
npm install react-router-dom
npm install axios
npm install react-icons
npm install react-toastify

#Required Backend Packages

The backend dependencies include:

npm install express
npm install mongoose
npm install cors
npm install dotenv
npm install jsonwebtoken
npm install bcryptjs
npm install multer
npm install razorpay