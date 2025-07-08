const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { MONGODB_URL, PORT } = process.env;
const authRoute = require('./Routes/AuthRoute');

const app = express();
const port = 4000;

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err)
);

app.use(cors({
    origin: 'http://localhost:4000', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/", authRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});