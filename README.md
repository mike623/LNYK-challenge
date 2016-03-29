# LNYK - challenge

this is the challenge for LNYK
the project is base on MERN - a scaffolding tool which makes it easy to build isomorphic apps using Mongo, Express, React and NodeJS. It minimizes the setup time and gets you up to speed using proven technologies.

## Quickstart
```
npm install 
npm run start
```

**Note : Please make sure your MongoDB is running.** For MongoDB installation guide see [this](https://docs.mongodb.org/v3.0/installation/).

## File Structure

### Webpack Configs

MERN uses Webpack for bundling modules. There are two types of Webpack configs provided `webpack.config.dev.js` (for development) and `webpack.config.prod.js` (for production).

The Webpack configuration is minimal and beginner-friendly. You can customize and add more features to it for production build.

### Server

MERN uses express web framework. Our app sits in server.js where we check for NODE_ENV.

If NODE_ENV is development we apply Webpack middlewares for bundling and Hot Module Replacement.

#### Server Side Rendering

We use React Router's match function for handling all page requests so that browser history works.

All the routes are defined in `shared/routes.js`. React Router renders components according to route requested.

### Mail setting
I am using nodemailer https://github.com/nodemailer/nodemailer

smtp account is set on server/mail.js
