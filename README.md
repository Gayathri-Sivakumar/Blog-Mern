#MERN Stack Blog Website.
###This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application. The project is organized into two main directories: client for the frontend and server for the backend.
##Prerequisites
Before you begin, ensure you have the following installed on your local machine:
1.Node.js (v12.x or later)
2.npm or Yarn
3.MongoDB (Make sure MongoDB is running on your system)

##Installation
###1.Clone the repository:
git clone https://github.com/Gayathri-Sivakumar/Blog-Mern.git
cd your-repo-name
###2.Install dependencies for the backend:
cd server
npm install
###3.Install dependencies for the frontend:
cd ../client
npm install

##Running the Application
###Running the Backend
1.Navigate to the server directory:
cd server
2.Create a .env file for environment variables:
PORT=8081
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CROS_ORIGIN=your_frontend_link
3.Start the backend server:
npm start

####The backend server will start on http://localhost:8081.

###Running the Frontend
1.Navigate to the client directory:
cd ../client
2.Start the frontend development server:
npm start

####The frontend development server will start on http://localhost:3000.

##Technologies Used
###Frontend:
React.js
Axios
React Router
MUI

###Backend:
Node.js
Express.js
MongoDB
Mongoose
JWT for authentication
bcrypt for password hashing
