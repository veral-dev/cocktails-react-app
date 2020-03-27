import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext'

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 500,
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Recipe = ({ recipe }) => {

    //Configuración del modal de material-ui
    const [modalStyle] = useState(getModalStyle)
    const [open, setOpen] = useState(false)

    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
    }

    //Extraer los valores del context
    const { infoRecipe, setIdRecipe, setRecipe } = useContext(ModalContext)


    //Mostrar ingredientes
    const showIngredients = infoRecipe => {
        let ingredients = []
        for (let i = 1; i < 16; i++) {
            if (infoRecipe[`strIngredient${i}`]) {
                ingredients.push(
                    <li key={infoRecipe[`strIngredient${i}`]}>{infoRecipe[`strIngredient${i}`]} {infoRecipe[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredients
    }



    return (

        <div className="col-md-4 col-6 mb-3">
            <div className="card">
                <h5 className="card-header">{recipe.strDrink}</h5>

                <img className="card-img-top" src={recipe.strDrinkThumb} alt={`Imagen de ${recipe.strDrink}`} />
                <div className="card-body">
                    <button
                        type='button'
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdRecipe(recipe.idDrink);
                            handleOpen()
                        }}

                    >Ver receta</button>
                    <Modal
                        open={open}
                        onClose={() => {
                            setIdRecipe(null)
                            setRecipe({})
                            handleClose()
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{infoRecipe.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>{infoRecipe.strInstructions}</p>

                            <img className="img-fluid my-4 img-modal" src={infoRecipe.strDrinkThumb} alt={`Receta de la bebida ${infoRecipe.strDrink}`} />

                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {showIngredients(infoRecipe)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>

    );
}

export default Recipe;