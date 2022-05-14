# T-SOUP

Short for **T**icket **S**ystem **OU**t**P**ut, is a MERN stack application for creating help desk or tech support tickets.

---

## Description

The backend is a [Node](https://nodejs.org) server built with [Express](https://expressjs.com), which connects to [MongoDB](https://www.mongodb.com/)'s [noSQL](https://www.mongodb.com/nosql-explained) database using [Mongoose](https://mongoosejs.com). And the front-end is a [React](https://reactjs.org) client which uses [TailwindCSS](https://tailwindcss.com) for styling components.

### Scripts

#### Run server and client in development

```bash
npm run dev
```

#### Installing [npm](https://www.npmjs.com/) backend dependencies

```bash
npm install <pkg>
```

#### Installing [npm](https://www.npmjs.com/) front-end dependencies

```bash
cd frontend
npm install
```



---


#### Environment Variables

You'll need an ```.env``` file to include the [MongoDB](https://www.mongodb.com/) database connection URI, and also a [JWT](https://jwt.io/) or [JSON Web Token](https://jwt.io/) secret to encrypt user login info, for example:

```bash
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<your-db-uri>
JWT_SECRET=soM3VeRyLOngAlPhaNUMer1cEncRypT10n
```
