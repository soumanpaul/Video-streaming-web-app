## MERN skeleton application:

Frontend features of the skeleton
Setting up development with React, React Router, and Material-UI
Backend user API integration
Auth integration
Home, Users, Sign-Up, Sign-In, User Profile, Edit, and Delete views
Navigation menu
Basic server-side rendering

### Home page: 
A view that renders at the root URL to welcome users to the
web application
### User list page: 
A view that fetches and shows a list of all the users in the
database, and also links to individual user profiles

### Sign-up page:
 A view with a form for user sign-up, allowing new users to
create a user account and redirecting them to a sign in page when
successfully created

### Sign-in page: 
A view with a sign-in form that allows existing users to sign
in so they have access to protected views and actions
### Profile page: 
A component that fetches and displays an individual user's
information, is only accessible by signed-in users, and also contains edit
and delete options, which are visible only if the signed-in user is looking at
their own profile
### Edit profile page: 
A form that fetches the user's information in the form,
allows them to edit the information, and is accessible only if the logged-in
user is trying to edit their own profile
### Delete user component: 
An option that allows the signed-in user to delete
only their own profile after confirming their intent
### Menu navigation bar: 
A component that lists all the available and relevant
views to the user, and also helps to indicate the user's current location in the
application