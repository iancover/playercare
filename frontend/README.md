# [PlayerCare UI](https://github.com/iancover/player-care)

## Gaming Industry Help Desk App

This **frontend** application is bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and the [Redux Toolkit](https://redux-toolkit.js.org/) template.

```sh
npx create-react-app frontend --template redux
```

### Development

The backend [Node](https://nodejs.org)[/Express](https://expressjs.com) server _(auto-reloads with [nodemon](https://nodemon.io/))_ and the frontend [React](https://reactjs.org)[/Redux](https://redux.js.org/) client, are setup to run simultaneously in development mode using [concurrently](https://www.npmjs.com/package/concurrently). 

From the project folder in your terminal run the following script

```sh
npm run dev
```

which runs the app on _[Port: 3000](http://localhost:3000)_ in your local environment. 

Requests to the _API_, which runs on _[Port: 5000](http://localhost:5000)_ are enabled setting that port as a [proxy on the package.json](https://create-react-app.dev/docs/proxying-api-requests-in-development/) file.

```json
"proxy": "http://localhost:5000"
```

---

### Production

To run the app in production mode, which bundles the [React](https://reactjs.org) app into a `build/` folder, optimizing its performance; also from the root project directory on your terminal, run the following script

```sh
npm run build
```

which minifies the build, includes hashed filenames and sets up the app ready for deployment.
