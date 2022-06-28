# [PlayerCare API](https://playercare.herokuapp.com/)

## Gaming Industry Help Desk

A client-server REST application designed for a tech support team at a video-game developing company, with the purpose of providing **_players_** of their cross-platform game, who experience game-related technical issues, a _UI_ which assists them in opening support tickets and track their progress.

Project built with the [MERN](https://www.geeksforgeeks.org/mern-stack/) stack. For the frontend documentation see [PlayerCare UI](https://github.com/iancover/t-soup/tree/main/frontend/README.md)

## Live Demo

View the [Heroku](https://heroku.com) deployed app here: [PlayerCare](https://playercare.herokuapp.com/) 

---

## Run Scripts

Both the server _(auto-reloads with [nodemon](https://npmjs.com/package/nodemon))_ and the client applications are setup to run simultaneously in development mode using [concurrently](https://npmjs.com/package/concurrently).

From your root project folder in your terminal run the following

```bash
npm run dev
```

and open [http://localhost:3000](http://localhost:3000) in your brower to view the app.

### Server

The backend API is a [Node](https://nodejs.org)[/Express](https://expressjs.com) server which connects to a [noSQL](https://www.mongodb.com/nosql-explained) database in [MongoDB](https://www.mongodb.com/) using the [Mongoose](https://mongoosejs.com) object modeling library.

To start the server by itself, also from the project folder run

```bash
# manually
npm start

# or auto-reloading with nodemon
npm run server
```

### Client

The frontend UI is a [React](https://reactjs.org)[/Redux]() single-page application bootstrapped with [Create React App](https://create-react-app.com) using the [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) template, e.g.

```bash
npx create-react-app frontend --template redux
```

To start the client by itself, also from your project folder run

```bash
npm run client
```

---

### Dependencies

For installing [npm](https://www.npmjs.com/) packages

```bash
# backend/package.json
npm i <pkg>

# frontend/package.json
cd frontend
npm i <pkg>
```

---

#### Environment Variables

You'll need an `.env` file _(on your root project folder)_ to include the [MongoDB](https://www.mongodb.com/) database connection URI and a [JSON Web Token](https://jwt.io/) secret to encrypt user login info, i.e.

```bash
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<your-db-uri>
JWT_SECRET=soM3VeRyLOngAlPhaNUMer1cEncRypT10n
```

Here is a quick intro to [MongoDB Atlas](https://www.youtube.com/watch?v=xrc7dIO_tXk) to setup your database.
