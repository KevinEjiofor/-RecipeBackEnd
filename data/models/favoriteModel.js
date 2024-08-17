const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  recipeId: { type: String, required: true },
  title: { type: String, required: true },
  ingredients: [String],
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
