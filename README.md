# Video-streaming

[![Current Version](https://img.shields.io/badge/version-1.0.7-green.svg)](https://github.com/soumanpaul/Developers-Profile-web-app)
[![build status](https://img.shields.io/travis/reduxjs/react-redux/master.svg?style=flat-square)](https://travis-ci.org/reduxjs/react-redux) [![npm version](https://img.shields.io/npm/v/react-redux.svg?style=flat-square)](https://www.npmjs.com/package/react-redux)
[![GitHub Stars](https://img.shields.io/github/stars/soumanpaul/node-chat.svg)](https://github.com/soumanpaul/Developers-Profile-web-app/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/soumanpaul/node-chat.svg)](https://github.com/IgorAntun/node-chat/issues)  


## About the project
 
 
media streaming application, is the next pick. Inspired by features from Netflix and YouTube, this application will implement content uploading and viewing capabilities with a media content upload feature for content providers, and real-time content streaming for viewers

 ## Index
+ [Demo](#demo)
+ [Features](#features)
+ [Built With](#Built-With)
+ [Installation](#installation)
+ [How It Works](#how-it-works)
+ [Support](#support)
+ [Contribute](#contribute)
+ [License](#license)

---
## Demo 
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](http://musics24.herokuapp.com/)


Client React web App version [here](https://musics24.herokuapp.com//)

REST API Documentatioin [here](http://foodzone2020.herokuapp.com/)

Extensive Postman version of API documentation with examples [here](https://documenter.getpostman.com/view/5731747/SWLe6nhT?version=latest)


![](/public/images/media.png)

---

## Features
  - [x] Sign up
  - [x] User list
  - [x] Authentication
  - [x] Protected user profile
  - [x] details after signing in
  - [x] Authorized user edit and delete
  - [x] can edit or remove their own user account details
---
## Built With
+ Uses Express as the application Framework.
+ Manages Sessions using [express-session](https://github.com/expressjs/session) package.
+ Authenticates via username and password using [JsonwebToken](https://jwt.io/) and  [Passport](https://github.com/jaredhanson/passport).
+ Passwords are hashed using [bcrypt-nodejs](https://github.com/shaneGirish/bcrypt-nodejs) package.
+ Social Authentication via Facebook and Twitter using [Passport](https://github.com/jaredhanson/passport).
+ Uses [MongoDB](https://github.com/mongodb/mongo), [Mongoose](https://github.com/Automattic/mongoose) and [Mongodb Atles](https://mlab.com/) for storing and querying data.
+ Uses [Gravatar]() to retrive profile image from Gamil.

+ Uses [Reactjs](https://reactjs.com) to generate UI and [Redux]() for State management.
+ [UUID]() to generate unique user ID

---
## Installation
### Running Locally
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone or Download the repository

	```
	$ git clone https://github.com/soumanpaul/Developers-Profile-web-app
	$ cd Developers-Profile-web-app
	```
2. Install Dependencies
   + run this commend in project directory
	
    ```
	  $ npm install
    ```
   + run this commend in ***client***  directory
   
    ```
      $ yarn install
    ```


2. Edit configuration file in /config/default.json with your credentials(see [Setup Configurations](#configurations)).


5. Start the application

  + To run both frontend and backend server together run :

	```
	$ npm run dev
	```

Your app should now be running on [localhost:3000](http://localhost:3000/).

### Deploying to Heroku
Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

1. Create a new Heroku application, and push your chat application to a Git remote repository

	```
	$ heroku create
	$ git push heroku master
	```
	
	or
	
	[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

2. Now, you need to set up configuration variables on Heroku. 
	1. Go to Settings -> Reveal Config Vars.
	2. Add configuration variables. All needed variables are inside _app/config/index.js_. 
	Typically, these are the configuration variables you need to assign: 
	```{ dbURI, sessionSecret, facebookClientID, facebookClientSecret, twitterConsumerKey, twitterConsumerSecret }```(see [Setup Configurations](#configurations)).


3. Open your chat application in the browser

	```
	$ heroku open
	```




---

## How It Works
### Setup Configurations<a name="configurations"></a>
The configurations on production will be assigned from Environment Variables on Heroku, while the development configurations reside inside _app/config/config.json_ file.

#### MongoDB & MongoLab
You need to create a database on MongoLab, then create a database user, get the `MongoDB URI`, and assign it to `dbURI`.

#### Facebook & Twitter
You need to register a new application on both Facebook and Twitter to get your tokens by which users can grant access to your application, and login using their social accounts.

##### Registering the app on Facebook
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Add new app, and fill the required information.
3. Get your `App ID`, `App Secret`.
4. Go to Add Product -> Facebook Login -> Valid OAuth redirect URIs
5. Add Valid Callback URIs
6. Go to App Review -> Make your application public.

Now, you can assign the `App ID` to `facebookClientID`, and `App Secret` to `facebookClientSecret`.
##### Registering the app on Twitter
1. Go to [Twitter Apps](https://apps.twitter.com/)
2. Create new app, and fill the required information.
3. Add Website & Callback URL
4. Get your `Consumer Key`, `Consumer Secret`.

Now, you can assign the `Consumer Key` to `twitterConsumerKey`, and `Consumer Secret` to `twitterConsumerSecret`.

##### The Callback URL
- It can point back to your localhost; _[http://localhost:3000/auth/facebook/callback](http://localhost:3000/auth/facebook/callback)_

- When deploy to Heroku, you will have something look like this; _[http://my-chat-app.herokuapp.com/auth/facebook/callback](http://my-chat-app.herokuapp.com/auth/facebook/callback)_

#### Session
The session needs a random string to make sure the session id in the browser is random. That random string is used to encrypt the session id in the browser, _Why?_ To prevent session id guessing.


### Database<a name="database"></a>
Mongoose is used to interact with a MongoDB that's hosted by MongoLab. 

#### Schemas
There are two schemas; users and rooms. 

Each user has a username, passowrd, social Id, and picture. If the user is logged via username and password, then social Id has to be null, and the if logged in via a social account, then the password will be null.

Each room has a title, and array of connections. Each item in the connections array represents a user connected through a unique socket; object composed of _{userId + socketId}_. Both of them together are unique.

### Models<a name="models"></a>
Each model wraps Mongoose Model object, overrides and provides some methods. There are two models; User and Room.

### Session<a name="session"></a>
Session in Express applications are best managed using [express-session](https://github.com/expressjs/session) package. Session data are stored locally on your computer, while it's stored in the database on the production environment. Session data will be deleted upon logging out.

### User Authentication
User can login using either a username and password, or login via a social account. User authentication is done using [Passport](https://github.com/jaredhanson/passport). Passport has extensive, and step-by-step [documentation](http://passportjs.org/docs/) on how to implement each way of authentication.



## Support 
I've written this script in my free time during my studies. If you find it useful, please support the project by spreading the word.

## Contribute 

Contribute by creating new issues, sending pull requests on Github or you can send an email at: paulchsouman@gmail.com

## License 
Built under [MIT](http://www.opensource.org/licenses/mit-license.php) license.


<!-- [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FOmarElGabry%2Fchat.io.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FOmarElGabry%2Fchat.io?ref=badge_large)
--- -->
<!-- + Stores session in a [MongoDB](https://github.com/mongodb/mongo) using [connect-mongo](https://github.com/kcbanner/connect-mongo); a MongoDB-based session store. -->
<!-- + Uses [Redis](https://github.com/antirez/redis) as an Adapter for [Socket.io](https://github.com/socketio/socket.io).
+ Logging Errors and Exceptions using [Winston](https://github.com/winstonjs/winston). -->








- Version: 1.0.0
- License: MIT
- Author: Souman Paul


