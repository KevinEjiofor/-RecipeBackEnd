const express = require('express');
const { saveFavoriteRecipe, getFavoriteRecipes, deleteFavoriteRecipe } = require('../controller/favoriteController');
const { protect } = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/', protect, saveFavoriteRecipe); 
router.get('/', protect, getFavoriteRecipes); 
router.delete('/:id', protect, deleteFavoriteRecipe); 

module.exports = router;
