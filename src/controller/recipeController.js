const spoonacularService = require('../services/spoonacularService');

const getRecipeDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await spoonacularService.getRecipeDetails(id);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recipe details' });
  }
};

module.exports = { getRecipeDetails };
