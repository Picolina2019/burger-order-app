import React, { Component } from 'react';
import { CheckoutSummary } from '../../Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
  checkoutCancelled = () => {
    this.props.history.goBack();
  };
  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to='/' />;

    if (this.props.ing) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to='/' />
      ) : null;
      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary
            checkoutContinued={this.checkoutContinued}
            checkoutCancelled={this.checkoutCancelled}
            ingredients={this.props.ing}
          />
          <Route
            to={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
