import React, { Component } from 'react';
import c from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';

class BurgerIngredients extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case 'bread-bottom':
        ingredient = <div className={c.BreadBottom}></div>;
        break;
      case 'bread-top':
        ingredient = (
          <div className={c.BreadTop}>
            <div className={c.Seeds1}></div>
            <div className={c.Seeds2}></div>
          </div>
        );
        break;
      case 'meat':
        ingredient = <div className={c.Meat}></div>;
        break;
      case 'cheese':
        ingredient = <div className={c.Cheese}></div>;
        break;
      case 'bacon':
        ingredient = <div className={c.Bacon}></div>;
        break;
      case 'salad':
        ingredient = <div className={c.Salad}></div>;
        break;
      default:
        ingredient = null;
    }
    return ingredient;
  }
}
BurgerIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredients;
