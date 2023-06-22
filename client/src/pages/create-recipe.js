import { useState } from 'react';
import axios from 'axios';
export const CreatRecipe = () => {
    const userId = window.localStorage.userId;

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        owner: userId
    })
    
    const handleSubmit = async (event)=> {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/recipes/create', {...recipe});
            if (res)
                alert("Recipe Created!!!!");
            else alert(res.body)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event)=> {
        const {name, value } =  event.target;
        setRecipe({...recipe, [name]:value})
        console.log(recipe);
    }

    const handleIngredientChange = (event, index)=> {
        const {value} = event.target;
        const ingredients = [...recipe.ingredients];
        ingredients[index] = value;
        setRecipe({...recipe, ingredients});
    }

    const handleAddIngredient = ()=> {
        const ingredients = [...recipe.ingredients, ""];
        setRecipe({...recipe, ingredients})
        console.log(recipe);
    }

    const removeIngredientHandle = (event, index)=> {
        let ingredients = [...recipe.ingredients];
        ingredients.splice(index, 1);
        setRecipe({...recipe, ingredients})
        console.log(recipe);
    }

    return <div className="create-recipe">
        <h1>Create Recipe</h1>
        <form onSubmit={handleSubmit}>
            
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={handleChange}/>

            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, index)=> (
                <div>
                    <input type="text" key={index} value={ingredient} onChange={(event)=>handleIngredientChange(event, index)}/>
                    <button type="button" onClick={(event)=>removeIngredientHandle(event, index)}>Remove</button>
                </div>
            ))
            }
            <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
        
            <label htmlFor="instructions" >Instructions</label>
            <input type="text" id="instructions" name="instructions" onChange={handleChange}/>
        
            <label htmlFor="imageUrl" >Image URL</label>
            <input type="text" id="imagUrl" name="imageUrl" onChange={handleChange}/>
        
            <label htmlFor="cookingTime" >Cook Time</label>
            <input type="text" id="cookingTime" name="cookingTime" onChange={handleChange}/>
            
            <button type="submit">Create Recipe</button>
        </form>   
    </div>
}