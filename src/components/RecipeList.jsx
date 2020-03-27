import React, { useContext } from 'react'
import Recipe from './Recipe'

import { RecipeContext } from '../context/RecipeContext'



const RecipeList = () => {


    //Extraer las recetas
    const { recipes } = useContext(RecipeContext)

    return (
        <div className="row my-5">
            {recipes.map(recipe => (
                <Recipe key={recipe.idDrink} recipe={recipe} />
            ))}
        </div>
    );
}

export default RecipeList;