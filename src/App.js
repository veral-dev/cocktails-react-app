import React from 'react';
import Header from './components/Header'
import Form from './components/Form'
import RecipeList from './components/RecipeList'

import CategoriesProvider from './context/CategoriesContext'
import RecipeProvider from './context/RecipeContext'
import ModalProvider from './context/ModalContext'


function App() {
  return (
    <>
      <CategoriesProvider>
        <RecipeProvider>
          <ModalProvider>
            <Header />
            <div className="container my-5">
              <div className="row">
                <Form />
              </div>
              <RecipeList />
            </div>
          </ModalProvider>
        </RecipeProvider>
      </CategoriesProvider>
    </>
  );
}

export default App;
