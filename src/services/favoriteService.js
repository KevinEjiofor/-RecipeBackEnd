const Favorite = require('../data/models/favoriteModel');

const saveFavorite = async (recipeData) => {
  const existingFavorite = await doesFavoriteExist(recipeData.recipeId);
    
  if (existingFavorite) {
      return existingFavorite;  
      }

  
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

const doesFavoriteExist = async (recipeId) => {
  return await Favorite.findOne({ recipeId });
};


module.exports = { saveFavorite, getFavorites, deleteFavorite };
