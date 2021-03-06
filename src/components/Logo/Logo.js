import React from 'react';
import logo from '../../assets/images/original.png';
import classes from './Logo.module.css';

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={logo} alt='logo' />
    </div>
  );
};

export default Logo;
