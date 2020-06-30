import React from 'react';
import Aux from '../../containers/hoc/Aux';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingKey) => {
    return (
      <li key={ingKey}>
        <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>:{' '}
        {props.ingredients[ingKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A burger with the following ingredients: </p>

      <ul className={classes.list}>{ingredientSummary}</ul>
      <p>
        <b>Total price: {props.price.toFixed(2)}</b>
      </p>
      <p className={classes.p}>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCancelling}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={props.purchaseContinue}>
        CONTINUE
      </Button>
    </Aux>
  );
};
export default OrderSummary;
