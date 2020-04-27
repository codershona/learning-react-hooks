### Learning REACT HOOKS 

### What is React Hooks ?

<b>ANSWER:<b> React is a Functional Components EveryWhere!

### What are "REACT HOOKS" ?

<b>ANSWER:<b>  Have nothing to do with LifeCycle Methods ("LifeCycle Hooks")! ;

    * Introduced with React 16.8 ;
    * Allow you to use functional components only.
    * Hooks for managing state, side effects (e.g. Http requests) & more ;
    * Build Custom hooks to share stateful or stateless logic across multiple components .

* NOTES :

```
   * npx create-react-app learning-react-hooks ;
```


### Understanding "useState" :

```
   * [Functional Component] : MyComp = props => ...  ----> (calls) ----> [ useState(initialState) ] =========>(creates) ====> State 
   [ Managed by React(behind the scenes) ] ;

   * useState(initialState) ----> returns---> Array with exactly two elements  ---> from --> Functional Component ; 

   * Array with exactly two elements : (1) State pointer & (2) State update function ;

 
```