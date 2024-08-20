const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    recipeId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    image: {
        type: String,
        required: true, 
        default: 'default-image-url.jpg',
    }
}, {
    timestamps: true,
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
