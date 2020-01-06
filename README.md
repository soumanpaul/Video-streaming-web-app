# MERN-streaming
media streaming application, is the next pick. Inspired by features from Netflix and YouTube, this application will implement content uploading and viewing capabilities with a media content upload feature for content providers, and real-time content streaming for viewers

## Feature breakdown

* Sign up
* User list
* Authentication
* Protected user profile
* details after signing in
* Authorized user edit and delete
* can edit or remove their own user account details

## User model
The user model will define user details to be stored in the MongoDB database,
and also handle user-related business logic such as password encryption and user
data validation. The user model for this skeletal version will be basic with
support for the following attributes:

Field
name Type Description
name String Required field to store user's name
email String Required unique field to store user's email and identify
each account (only one account allowed per unique email)
password String Required field for authentication, the database will store
the encrypted password and not the actual string for
security purposes
created Date Automatically generated timestamp when a new user
account is created
updated Date Automatically generated timestamp when existing user
details are updated


## API endpoints for user CRUD

To enable and handle user CRUD operations on the user database, the backend
will implement and expose API endpoints that the frontend can utilize in the
views, as follows:
Operation API route HTTP method
Create a user /api/users POST
List all users /api/users GET
Fetch a user /api/users/:userId GET
Update a user /api/users/:userId PUT
Delete a user /api/users/:userId DELETE
User sign-in /auth/signin POST
User sign-out (optional) /auth/signout GET

Some of these user CRUD operations will have protected access, which will require the requesting client to be either authenticated, authorized, or both. The
last two routes are for authentication and will allow the user to sign in and sign
out.

## Auth with JSON Web Tokens

```
To restrict and protect access to the user API endpoints according to the skeleton
features, the backend will need to incorporate authentication and authorization
mechanisms. There are a number of options when it comes to implementing user
auth for web applications. The most common and time tested option is the use of
sessions to store user state on both the client and server side. But a newer
approach is the use of JSON Web Token (JWT) as a stateless authentication
mechanism that does not require storing user state on the server side.
Both approaches have strengths for relevant real-world use cases. However, for
the purpose of keeping the code simple in this book, and because it pairs well
with the MERN stack and our example applications, we will use JWT for auth
implementation.

```




## Technologies

* Reactjs
* Nodejs
* Expressjs
* Mongodb
* Mongoose
* Redux
* Styled components




## Demo

Live project

Client React web App version [here](http://foodzone2020client.herokuapp.com/)


Mobile App repo [here](https://github.com/soumanpaul/ZoodZone-Mobile-App)
Android APK Download  Available [here]()

Backend repo [here](https://github.com/soumanpaul/Fooz-Zone-REST-API)
REST API Documentatioin [here](http://foodzone2020.herokuapp.com/)

Extensive Postman version of API documentation with examples [here](https://documenter.getpostman.com/view/5731747/SWLe6nhT?version=latest)
