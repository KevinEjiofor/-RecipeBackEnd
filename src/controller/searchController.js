const spoonacularService = require('../services/spoonacularService');

const searchRecipes = async (req, res) => {
  const { query } = req.query;
  try {
    const recipes = await spoonacularService.searchRecipes(query);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recipes' });
  }
};

module.exports = { searchRecipes };
