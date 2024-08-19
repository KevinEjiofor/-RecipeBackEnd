const express = require('express');
const { searchRecipes } = require('../controller/searchController');

const router = express.Router();
router.get('/', 
    searchRecipes);

module.exports = router;
