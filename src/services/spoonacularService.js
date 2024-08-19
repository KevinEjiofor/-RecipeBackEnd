const axios = require('axios');

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY; 

const searchRecipes = async (query) => {
  const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
    params: { query, apiKey: SPOONACULAR_API_KEY },
  });
  return response.data.results;
};

const getRecipeDetails = async (id) => {
  const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
    params: { apiKey: SPOONACULAR_API_KEY },
  });
  return response.data;
};

module.exports = { searchRecipes, getRecipeDetails };
