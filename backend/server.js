const express = require("express");
const app = express();
const cors = require('cors');
const router = require('./router/auth-router');
const connectDb = require("./models/db");
require('dotenv').config();

// Define allowed origins
const allowedOrigins = [
  'https://cinemacove-backend.onrender.com',
  'http://localhost:5173',
  'https://cinemacove.netlify.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", router);

connectDb().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
