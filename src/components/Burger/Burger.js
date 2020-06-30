import React from 'react';
import c from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const Burger = (props) => {
  //transform object into array
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      //create new array
      return [...Array(props.ingredients[ingKey])].map((_, index) => {
        return <BurgerIngredients key={ingKey + index} type={ingKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={c.Burger}>
      <BurgerIngredients type='bread-top' />
      {transformedIngredients}
      <BurgerIngredients type='bread-bottom' />
    </div>
  );
};

export default Burger;
