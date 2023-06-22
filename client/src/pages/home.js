import {useState, useEffect} from 'react';
import axios from 'axios';

export const Home = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(()=> { 
      const fetchRecipes = async ()=>{
        try {
            const res = await axios.get('http://localhost:3001/recipes');
            if (res)
                setRecipes(res.data)
                console.log(recipes);
        } catch (error) {
            console.log(error);
        }
      }
      fetchRecipes();
    },[])

    return <div>
        <h1>Recipes List</h1>
        
            <ul> {
            recipes?.map((recipe)=> (
            <li>
            <div className="create-recipe">
             
                <b>Name:</b>
                {recipe.name}

                <b>Ingredients:</b>    
                {recipe.ingredients.map((ingredient, index)=> (
                    <>{(index!=recipe.ingredients.length-1)?ingredient+", ":ingredient}</> 
                ))
                }
                
                <b>Instructions:</b>
                {recipe.instructions}
            
                <img src={recipe.imageUrl} />
            
                <b>Cook Time</b>
                {recipe.cookingTime} minutes
            
            </div>   
            </li>
            )) }
            </ul>
        
    </div>
}