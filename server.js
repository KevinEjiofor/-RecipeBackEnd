require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/data/respository/dbConfig');


const searchRoute = require('./src/routes/searchRoutes');
const recipeDetailRoute = require('./src/routes/recipeDetailRoute');
const favoriteRoute = require('./src/routes/favoriteRoute');
const authRoute = require('./src/routes/authRoute');


const app = express();


const mongodbURL = process.env.MONGO_URI;
connectDB();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/search', searchRoute);
app.use('/recipe', recipeDetailRoute);
app.use('/favorites', favoriteRoute);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
