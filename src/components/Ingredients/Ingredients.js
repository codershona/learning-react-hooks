import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';

import IngredientList from './IngredientList';

const Ingredients = () => {

  const [ userIngredients, setUserIngredients ] = useState([]);

  const [isLoading, setIsLoading] = useState(false);


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

      fetch(
        `https://learning-react-hooks-fa290.firebaseio.com/ingredients/${ingredientId}.json`,
      {
      method: 'DELETE'
    }
  ).then(response => {

    setUserIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      

      );

    });

 };


  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        
        <IngredientList 
        ingredients={userIngredients} 
        onRemoveItem={removeIngredientHandler} 
        />



      </section>
    </div>
  );
}

export default Ingredients;
