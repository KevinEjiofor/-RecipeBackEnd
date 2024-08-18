const axios = require('axios');

const SPOONACULAR_API_KEY = '6cccc70f90d7457298503623acba6fb1'; 

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
