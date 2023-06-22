import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RecipeModel } from "../models/recipes.js"

const router = express.Router();

router.post("/create", async (req, res) => {
    
    
    try {
        const recipeExists = await RecipeModel.findOne({name: req.body.name});
        console.log(req.body.name)
        console.log("Recipe Exists = "+recipeExists)
        if (!recipeExists) {
            const newRecipe = new RecipeModel(req.body);
            await newRecipe.save();
            res.json(newRecipe);
        } else {
            res.json({message: "Error occured in saving recipe!"})
        }
        
    } catch (error) {
        res.json(error);
    }
})

router.get("/", async (req, res) => {
        
    try {
        const allRecipes = await RecipeModel.find({});
        res.json(allRecipes);
    } catch (error) {
        res.json(error);
    }
})

router.get("/:userId/savedRecipes", async (req, res) => {
    try {
        const userId = req.params.userId;
        const savedRecipes = await RecipeModel.find({owner: userId});
        res.json(savedRecipes);
    } catch (error) {
        res.json(error);
    }
})

export {router as recipeRouter};
