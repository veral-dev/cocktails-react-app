import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
export const RecipeContext = createContext()

const RecipeProvider = (props) => {

    const [recipes, setRecipe] = useState([])
    const [search, searchRecipe] = useState({
        name: '',
        categories: ''
    })
    const [consult, setConsult] = useState(false)

    const { name, category } = search

    useEffect(() => {
        if (consult) {
            const getRecipe = async () => {

                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`

                const result = await axios.get(url)

                // console.log(result.data.drinks)
                setRecipe(result.data.drinks)
            }
            getRecipe()
        }
    }, [search])

    return (
        <RecipeContext.Provider
            value={{
                recipes,
                searchRecipe,
                setConsult
            }}>
            {props.children}
        </RecipeContext.Provider>
    );
}

export default RecipeProvider;