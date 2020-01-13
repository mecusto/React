import React, { useState, useEffect } from 'react';

import './App.css';

const App: React.FC = () => {
  return (
    <Counter />
  );
}

// las ff de hook empiezan por use..

const Counter = () => {
  // useState devuelve un array donde el primer parámetro es la variable y
  // el segundo parámetro es una ff q sirve para actualizar el primero
  // el cero que se pasa como variable es el valor inicial de la variable
  const [counter, setCounter] = useState(0);

  // todos los hooks deben aparecer arriba

  // useEffect va a ejecutar una ff cada vez hay cambios en las variables
  // del array de dependencia recibe un ff como primer parámetro
  // y como segundo un array de dependencia el array mira si hay modificaciones 
  // en las variables que contiene y en caso de cambio ejecuta la ff
  // OJO! si el contenido del array no son variables primitivas
  // usar immer, en caso contrario no detecta el cambio
  // si no se incluye, la ff se ejecuta siempre
  // si el array está vacío, la ff solo se ejecuta al cargar el componente 

  useEffect( () => {console.log(counter)}, [counter]);

  useEffect( () => {},[]); // componentWillMount

  useEffect(() => {
    return()
  }, []); //componentWillUnmount (la ff que está dentro del return)

  

  const add = () => setCounter(c => c + 1);
  const sub = () => setCounter(c => c - 1);
  const reset = () => setCounter(0);

  return(
    <>
    
    {counter}
    <button onClick={add}>+</button>
    <button  onClick={sub}>-</button>
    </>
  )
}

export default App;
