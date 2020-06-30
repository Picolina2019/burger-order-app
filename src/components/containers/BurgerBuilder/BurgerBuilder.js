import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import axios from '../../../axios';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderAction from '../../../store/actions/index';
import * as action from '../../../store/actions/index';

export class BurgerBuilder extends Component {
  state = {
    purchaseMode: false,
  };
  componentDidMount() {
    this.props.onInitIngredients();
  }

  setPurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({
        purchaseMode: true,
      });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelling = () => {
    this.setState({ purchaseMode: false });
  };
  purchaseContinue = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };
  render() {
    const disabledButton = {
      ...this.props.ing,
    };
    for (let key in disabledButton) {
      disabledButton[key] = disabledButton[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ing) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            addIngredient={this.props.onAdded}
            removeIngredient={this.props.onDeleted}
            disabled={disabledButton}
            price={this.props.price}
            isAuth={this.props.isAuth}
            purchasable={this.setPurchaseState(this.props.ing)}
            onPurchase={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          purchaseCancelling={this.purchaseCancelling}
          purchaseContinue={this.purchaseContinue}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchaseMode} clicked={this.purchaseCancelling}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdded: (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
    onDeleted: (ingName) =>
      dispatch(burgerBuilderAction.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderAction.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderAction.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
