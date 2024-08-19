const dotenv = require('dotenv')
const axios = require('axios');

dotenv.config();
 

const apiKey = process.env.RECIPE_API_KEY;

const searchRecipes = async (query) => {
  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      
      params: {
        query,
        apiKey: apiKey,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error in spoonacularService.searchRecipes:', error.response ? error.response.data : error.message);
    throw new Error('Error fetching recipes from Spoonacular API');
  }
};

const getRecipeDetails = async (id) => {
  const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
    params: { apiKey: apiKey},
  });
  return response.data;
};

module.exports = { searchRecipes, getRecipeDetails };
