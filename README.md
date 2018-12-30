# Simple Blogging Website

## About the app

The client which serves the FrontEnd (using React), and the server (in Node/Express).

## How to run the client

Open up two terminal instances and from the root directory run the following

```
cd client/
npm i
npm start
```

## How to run the server

Open up two terminal instances and from the root directory run the following

```
cd server/
touch .env

```

At this point you will have to specify the port the server will run on. Open up your .env file and type `PORT=5000`

```
npm i
npm start
```

## Check if they are connected

1. With the two apps running, open your browser in http://localhost:3000/.
2. If you see the webpage below it means the Front-End is working correctly
<img width="1300" alt="screenshot 2018-12-30 16 56 36" src="https://user-images.githubusercontent.com/39559415/50548849-e4aef180-0c53-11e9-8bbd-ef4b924cd6d0.png">


3. Try signing up to check the server is running properly. You should expose different options in the nav bar like so.
<img width="361" alt="screenshot 2018-12-30 16 58 45" src="https://user-images.githubusercontent.com/39559415/50548865-2fc90480-0c54-11e9-96f5-40579c7e6fa7.png">


## User roles
By default, if you signup with a random user name you will be given the `User` role. This allows you to read all posts.

If you signup with a username that includes the string "admin", you will be given the `Admin` role. This allows you to create, update and delete posts.

## How to run the server tests

Open up two terminal instances and from the root directory run the following

```
cd server/
npm test
```
