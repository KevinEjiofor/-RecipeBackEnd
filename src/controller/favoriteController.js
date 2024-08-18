const favoriteService = require('../services/favoriteService');

const saveFavoriteRecipe = async (req, res) => {
  try {
    const favorite = await favoriteService.saveFavorite(req.body);
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: 'Error saving favorite recipe' });
  }
};

const getFavoriteRecipes = async (req, res) => {
  try {
    const favorites = await favoriteService.getFavorites();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving favorite recipes' });
  }
};

const deleteFavoriteRecipe = async (req, res) => {
  try {
    await favoriteService.deleteFavorite(req.params.id);
    res.status(200).json({ message: 'Favorite recipe deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting favorite recipe' });
  }
};

module.exports = { saveFavoriteRecipe, getFavoriteRecipes, deleteFavoriteRecipe };
