"# smartfeedback" 
Smart Feedback Sentiment Analysis System

A simple system to collect user feedback, analyze sentiment, and view results in an admin dashboard.

Features

User registration and login

Feedback submission

Sentiment analysis (Positive, Negative, Neutral)

Admin dashboard to view all feedback

Charts to visualize sentiment results

Prerequisites

Before running the system, make sure you have:

Node.js
 installed

MongoDB
 (local or Atlas cloud)

VS Code
 or any code editor

Project Setup
1. Clone or Download the Project

Open your project folder in VS Code:

C:\Users\gonug\Downloads\smartfeedbackapp-main\smartfeedbackapp-main

2. Backend Setup

Open VS Code terminal in the root folder (where server.js is located).

Install dependencies:

npm install


Configure .env file:

Admin Email
Admin Password
SECRET_KEY=your_secret_key
PORT=5000


If using MongoDB Atlas, copy the connection string from your Atlas dashboard.

Start the server:

node server.js


Or, if you have nodemon installed:

nodemon server.js


You should see:

Server running on port 5000

3. Frontend Setup

Open the frontend folder:

smartfeedbackapp-main\frontend


Open index.html in a browser OR use Live Server in VS Code:

Right-click index.html → Open with Live Server

Make sure frontend forms point to the correct backend URL:

http://localhost:5000/

4. Using the System
User Actions

Register/Login: register.html → create an account, then login via login.html

Submit Feedback: Enter feedback text → Submit

Admin Actions

Login via adminlogin.html

View all feedback with sentiment analysis in admin.html

5. Optional – Cloud Deployment

You can deploy the system online using:

Heroku

Render

MongoDB Atlas + cloud server
