const Favorite = require('../models/favoriteModel');

const saveFavorite = async (recipeData) => {
  const favorite = new Favorite(recipeData);
  await favorite.save();
  return favorite;
};

const getFavorites = async () => {
  return await Favorite.find();
};

const deleteFavorite = async (id) => {
  await Favorite.findByIdAndDelete(id);
};

module.exports = { saveFavorite, getFavorites, deleteFavorite };
