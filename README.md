# E-COMMERCE API

## Description: 
This API was built with Nodejs, Express, and MongoDB and it comes with the full functionality of an e-commerce application. It contains a product route, user route, stripe payment route that can be used to process payment. 

This Project also contains the Authentication Route that consists of all the Authentication with the following routes defined; the Sign Up Route that uses the CryptoJs Hashing Library to authenticate the Users password and json web token to authorize the User, the Login Route that ensures the User is authenticated before allowing the User to sign up.


## Live demo
The UI of this project is still in production and has not been completed. I'm currently working on it, You can check in some other time.

## Technology Stack and Resources

* Node JS

* Express JS

* MongoDB

* Mongoose

* CryptoJs Hashing Libary

* Json Web Token (JWT)

* Stripe (For payment processing)

## Features

* A user route that can be used to Update user information, Delete user information, Get user information, get all users and users statistics which is important as this project can be linked to an admin dashboard

* A Product route that can be used to Update and delete product information. This can only be done by the admin. It can also be used to get all products.

* A Stripe route manages the payment process.

* An order route that can be used to create, update, delete and get user order. It can also be used to caculate monthly income on the admin side of things 

* A cart route that can be used to create, update, delete and get user cart.

* An order route that can be used to create, update, delete and get user order. It can also be used to caculate monthly income on the admin side of things 

* An authentication route that handles user Signup and Login.

* A Verification route that verifies user information so that they can be able to perform certian functions like delete or update their information. It also verifies an admin too.

* A User, Cart, Order and Product Models. This defines our Mongo database.

## Purpose

I was able to practicalize working with Nodejs, MongoDB, Express, Stripe and several other libaries. It was a fun project and I really learnt so much!

## Setup 

1. Copy the Repository link

2. On your command line/terminal, change the current working directory to the location where you want to clone the repository

3. Clone the repository on your terminal by typing ``` git clone ``` and then providing the link to this repository you copied earlier.

4. Run ``` npm install ``` on your terminal to install the necessary dependencies

5. Make sure to include your own unique API details (ie Stripe and JWT).

## Requirements

* An IDE (VSCode, Bracket, Sublime, Atom etc)

* Basic knowledge of MERN stack

* Being a programmmer 😉
