import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';

import IngredientList from './IngredientList';

import ErrorModal from '../UI/ErrorModal';


const ingredientReducer = (currentIngredients, action) => {

  switch (action.type) {
    case 'SET':
      return action.ingredients;

     case 'ADD':

        return [...currentIngredients, action.ingredient];

   
   case 'DELETE':

     return currentIngredients.filter(ing => ing.id !== action.id);


     default:

       throw new Error('SHOULD NOT GET THERE!');

  }

};


const httpReducer = (curHttpState, action) => {

   switch(action.type) {
    case 'SEND':

      return { loading: true, error: null };

    case 'RESPONSE':

      return { ...curHttpState, loading: false };

    case 'ERROR':

      return { loading: false, error: action.errorMessage };

      case "CLEAR":

       return { ...curHttpState, error: null };


      default:
       throw new Error('SHOULD NOT BE REACHED!');


   }


};




const Ingredients = () => {

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });
  
  // const [ userIngredients, setUserIngredients ] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);

  // const [error, setError] = useState();


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
    // setUserIngredients(filteredIngredients);

    dispatch({ type: 'SET', ingredients: filteredIngredients });

   }, []);




   const addIngredientHandler = useCallback(ingredient => {

    // setIsLoading(true);
   dispatchHttp({type: 'SEND'});

   	fetch('https://learning-react-hooks-fa290.firebaseio.com/ingredients.json', {
   		method: 'POST',
   		body: JSON.stringify(ingredient),
   		headers: { 'Content-Type': 'application/json' } 
   	})

    .then(response => {

      dispatchHttp({type: 'RESPONSE'});

     // setIsLoading(false);

   	return response.json();

   })
    .then(responseData => {

   		//   setUserIngredients(prevIngredients => [
    	// ...prevIngredients, 
   	 // 	{ id: responseData.name, ...ingredient }

   	 // 	]);

     dispatch({
      type: 'ADD', 
      ingredient: { id: responseData.name, ...ingredient } 

        });

   	});

   }, []);




   const removeIngredientHandler = useCallback(ingredientId => {

    // setIsLoading(true);

    dispatchHttp({type: 'SEND'});

      fetch(
        `https://learning-react-hooks-fa290.firebaseio.com/ingredients/${ingredientId}.json`,
      {
      method: 'DELETE'
    }
  ).then(response => {

    // setIsLoading(false);

    dispatchHttp({type: 'RESPONSE'});

    // setUserIngredients(prevIngredients =>
    // prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
    
    //  );

    dispatch({ type: 'DELETE', id: ingredientId });


    }).catch(error => {

      // setError('Please Try Again!');
      // setIsLoading(false);

  dispatchHttp({type: 'ERROR', errorMessage: 'SOMETHING WENT WRONG!' });


    });

 }, []);


 const clearError = () => {

  // setError(null);

  dispatchHttp({ type: 'CLEAR' });

  
  // setIsLoading(false);

 };

 const ingredientList = useMemo(() => {
    return  ( 
        <IngredientList 
        ingredients={userIngredients} 
        onRemoveItem={removeIngredientHandler} 

        />
     );

 }, [userIngredients, removeIngredientHandler]);




  return (
    <div className="App">

     {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}


      <IngredientForm 
      onAddIngredient={addIngredientHandler}
      loading={httpState.loading}

      />

      <section>
        <Search 
        onLoadIngredients={filteredIngredientsHandler}
        />

         {ingredientList} 
      
       </section>
    </div>
  );
}

export default Ingredients;
