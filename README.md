# MERN Stack Blog Website

Welcome to the MERN Stack Blog Website! This is a full-stack application using MongoDB, Express.js, React.js, and Node.js. Dive in and enjoy coding!

## Prerequisites

Make sure you have the following installed on your machine before getting started:

1. **Node.js** (v12.x or later)
2. **npm** or **Yarn**
3. **MongoDB** (Ensure MongoDB is running)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## Running the Application

### Running the Backend

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Create a `.env` file for environment variables:

   ```plaintext
   PORT=8081
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   CORS_ORIGIN=your_frontend_link
   ```

3. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will start on [http://localhost:5000](http://localhost:5000).

### Running the Frontend

1. Navigate to the `client` directory:

   ```bash
   cd ../client
   ```

2. Start the frontend development server:

   ```bash
   npm start
   ```

   The frontend development server will start on [http://localhost:3000](http://localhost:3000).

## Technologies Used

### Frontend

- **React.js**
- **Axios**
- **React Router**
- **MUI**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing

---

Happy coding! If you have any questions or issues, feel free to reach out.
