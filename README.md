# Airbnb Clone - Full Stack Application

This is a full-stack web application that clones the core functionalities of Airbnb, including listing properties, managing user authentication, and uploading images. It’s built using React for the front-end and Node.js with Express for the back-end. The app allows users to add, view, and manage property listings such as apartments, houses, and villas, along with managing user profiles.

## Features

- **User Authentication**: Users can sign up, log in, and access their profiles.
- **Property Listings**: Users can create, update, and view property listings.
- **Image Upload**: Upload property images using Multer.
- **Search and Filters**: Search for listings based on various filters like price, type, category, and location.
- **Rating and Reviews**: Rate properties and add reviews.
- **JWT Authentication**: JSON Web Tokens are used to authenticate users and protect routes.
- **Responsive Design**: Fully responsive design for mobile, tablet, and desktop views.

## Tech Stack

### Frontend

- **React**: For building dynamic user interfaces.
- **React Router**: For navigation between pages.
- **FormData**: For submitting forms, including image uploads.
- **Axios/Fetch API**: For API communication between frontend and backend.

### Backend

- **Node.js with Express**: For building the RESTful API.
- **MongoDB with Mongoose**: For storing user and listing data.
- **Multer**: For handling image uploads.
- **JWT**: For authenticating and managing user sessions.
- **Bcryptjs**: For password hashing.

### Deployment

- **Heroku/Netlify**: For deploying both frontend and backend (optional).

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/m-sheraz-code/airbnb-clone.git
cd airbnb-clone
