import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import c from './Layout.module.css';
import Toolbar from '../../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  drawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  openDrawer = () => {
    this.setState({ showSideDrawer: true });
  };
  toggleClicked = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          openDrawer={this.openDrawer}
          toggleClicked={this.toggleClicked}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          closed={this.drawerCloseHandler}
          open={this.state.showSideDrawer}
        />
        <main className={c.content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
