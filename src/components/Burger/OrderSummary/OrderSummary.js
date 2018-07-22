import React from 'react';
import Aux from '../../../hoc/ReactAux';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(ingKey => {
        return (
        <li key={ingKey}>
            <span style={{textTransform: 'capitalize'}}>
                {ingKey} 
            </span>
            : {props.ingredients[ingKey]}
        </li>
    )});

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger made with care using:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total : ${Math.round(props.price * 100) / 100}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    );
};

export default orderSummary;
