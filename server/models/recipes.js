import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    name: {type: String, required: true, unique:true},
    ingredients: [{type: String, required: false}],
    instructions: {type: String, required: true},
    imageUrl: {type: String, required: true},
    cookingTime: {type: Number, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId}
})

export const RecipeModel = mongoose.model("recipes", RecipeSchema);