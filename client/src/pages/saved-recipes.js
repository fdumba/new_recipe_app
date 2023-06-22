import {useState, useEffect} from 'react';
import axios from 'axios';

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userId = window.localStorage.userId;
    console.log(userId)

    useEffect(()=> { 
      const fetchSavedRecipes = async ()=>{
        try {
            
                const res = await axios.get(`http://localhost:3001/recipes/${userId}/savedRecipes`);
            if (res)
                setSavedRecipes(res.data)
                console.log(savedRecipes);
            
        } catch (error) {
            console.log(error);
        }
      }
      console.log(savedRecipes)
      fetchSavedRecipes();
    },[])

    return <div>
        <h1>Recipes List</h1>
        
            <ul> {
            savedRecipes?.map((recipe)=> (
            <li>
            <div className="create-recipe">
             
                <b>Name:</b>
                {recipe.name}

                <b>Ingredients:</b>    
                {recipe.ingredients.map((ingredient, index)=> (
                    <>{(index!=recipe.ingredients.length-1)?ingredient+", ":ingredient}</> 
                ))
                }
                           
                <img src={recipe.imageUrl} />
            
                <b>Cook Time</b>
                {recipe.cookingTime} minutes
            
            </div>   
            </li>
            )) }
            </ul>
        
    </div>
}