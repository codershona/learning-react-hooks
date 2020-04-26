import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';

import IngredientList from './IngredientList';

import ErrorModal from '../UI/ErrorModal';

const Ingredients = () => {

  const [ userIngredients, setUserIngredients ] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState();


  // Used like this, useEffect() acts like componentDidMoun: it runs the function AFTER EVERY component update (re-render).


   // useEffect(() => {

   // 	fetch('https://learning-react-hooks-fa290.firebaseio.com/ingredients.json')
   // 	.then(response => response.json())
   // 	 .then(responseData => {
   // 		const loadedIngredients = [];
   // 		for (const key in responseData) {
   // 			loadedIngredients.push({
   // 				id: key,
   // 				title: responseData[key].title,
   // 				amount: responseData[key].amount


   // 			});

   // 		}

   // setUserIngredients(loadedIngredients);


   // 	});
   // 	 // Used like this, (with [] as a second argument), ueEffect() acts like componentDidMount : It runs ONLY ONCE (after the first render).


   // }, []); 


   useEffect(() => {
   	console.log('RENDERING INGREDIENTS', userIngredients);

   }, [userIngredients]);

   const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);

   }, []);


   const addIngredientHandler = ingredient => {

    setIsLoading(true);


   	fetch('https://learning-react-hooks-fa290.firebaseio.com/ingredients.json', {
   		method: 'POST',
   		body: JSON.stringify(ingredient),
   		headers: { 'Content-Type': 'application/json' } 
   	})

    .then(response => {

      setIsLoading(false);

   	return response.json();

   }).then(responseData => {

   		  setUserIngredients(prevIngredients => [
    	...prevIngredients, 
   	 	{ id: responseData.name, ...ingredient }

   	 	]);

   	});

   };


   const removeIngredientHandler = ingredientId => {

    setIsLoading(true);

      fetch(
        `https://learning-react-hooks-fa290.firebaseio.com/ingredients/${ingredientId}.json`,
      {
      method: 'DELETE'
    }
  ).then(response => {

     setIsLoading(false);

    setUserIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      

      );

    }).catch(error => {

      setError('Please Try Again!');
      setIsLoading(false);


    });

 };

 const clearError = () => {

  setError(null);
  
  // setIsLoading(false);

 }


  return (
    <div className="App">

     {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}


      <IngredientForm 
      onAddIngredient={addIngredientHandler}
      loading={isLoading}

      />

      <section>
        <Search 
        onLoadIngredients={filteredIngredientsHandler} 

        />
        
        <IngredientList 
        ingredients={userIngredients} 
        onRemoveItem={removeIngredientHandler} 
        />



      </section>
    </div>
  );
}

export default Ingredients;
