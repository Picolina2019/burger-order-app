import React, { Component} from 'react';
import './App.css';
import Layout from './components/containers/Layout/Layout';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom';
import Logout from './components/containers/Auth/logout/Logout';
import { connect } from 'react-redux';
import * as action from './store/actions/index';
import asyncComponent from './components/containers/hoc/asyncComponent/AsyncComponent'

const asyncCheckout = asyncComponent(()=>{
 return import ('./components/containers/Checkout/Checkout')
});
const asyncOrders = asyncComponent(()=>{
  return import ('./components/containers/orders/Orders')
 });
 const asyncAuth = asyncComponent(()=>{
  return import ('./components/containers/Auth/Auth')
 });

class App extends Component {
  componentDidMount() {
    this.props.onSignup();
  };
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <div className='App'>
        <BrowserRouter>
          <Layout>{routes}</Layout>
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: () => dispatch(action.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
