import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // dynamically add ingredients in a flatten (reduced) list.
    let burgIngredients = Object.keys(props.ingredients)
        .map(ingKey => { // string into array:
            return[...Array(props.ingredients[ingKey])].map((_,i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey}/>;
            });
        }).reduce((arr, el) => { // concat element to accumulator
            return arr.concat(el)
        },[]); // [] no intial value
    if (burgIngredients.length === 0) {
        burgIngredients = <p>Please Start Adding Ingredients!</p>;
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {burgIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;