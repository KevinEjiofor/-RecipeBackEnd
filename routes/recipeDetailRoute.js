const express = require('express');
const { getRecipeDetails } = require('../controller/recipeController');

const router = express.Router();
router.get('/:id', getRecipeDetails);

module.exports = router;
