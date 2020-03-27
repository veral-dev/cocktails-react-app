import React, { useContext, useState } from 'react'
import { CategoriesContext } from '../context/CategoriesContext'
import { RecipeContext } from '../context/RecipeContext'



const Form = () => {

    const [search, setSearch] = useState({
        name: '',
        category: '',
    })
    const [error, setError] = useState(false)

    const { categories } = useContext(CategoriesContext)
    const { searchRecipe, setConsult } = useContext(RecipeContext)


    const getRecipeData = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (search.name === '' || search.category === '') { setError(true) } else {
            setError(false)
            searchRecipe(search);
            setConsult(true)
        }
    }


    return (

        <form className="col-12"
            onSubmit={handleSubmit}>
            <fieldset className="text-center">
                <legend>Busca bebidas por categoría o ingrediente</legend>
            </fieldset>
            <div className="row">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Buscar por ingrediente"
                        onChange={getRecipeData}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="category"
                        onChange={getRecipeData}>
                        <option value="">-- Seleccionar categoría --</option>
                        {categories.map(category => (
                            <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar bebidas"
                    />
                </div>
                <div className="col-md-12">

                    {error ? <div className="alert alert-primary mt-3 text-center text-uppercase" role="alert">Selecciona ingrediente y categoría</div> : null}
                </div>
            </div>
        </form>
    );
}

export default Form;