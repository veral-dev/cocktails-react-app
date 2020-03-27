import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { createContext } from 'react'

//Crear context
export const ModalContext = createContext()

const ModalProvider = (props) => {


    //State del provider
    const [idRecipe, setIdRecipe] = useState(null)

    const [infoRecipe, setRecipe] = useState({})


    //Una vez que tenemos el id de una receta, llamar a la API
    useEffect(() => {

        const getRecipe = async () => {
            if (!idRecipe) return
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`

            const result = await axios.get(url)
            setRecipe(result.data.drinks[0])
        }
        getRecipe()
    }, [idRecipe])

    return (

        <ModalContext.Provider
            value={{
                infoRecipe,
                setIdRecipe,
                setRecipe
            }}>
            {props.children}
        </ModalContext.Provider>

    );
}

export default ModalProvider