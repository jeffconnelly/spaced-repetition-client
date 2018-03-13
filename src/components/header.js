import React from 'react';
import {connect} from 'react-redux';
import {showRegistrationForm} from '../actions/useractions';

import './header.css';


export function Header(props) {
  return (
    <div className="header">
      <div className="header-wrapper">
      <h1 className="header-text">Luz</h1>
      <h2 className="header-sub">The Smarter Spanish Learning App</h2>
      <button className="btn-gradient red" onClick={() => props.dispatch(showRegistrationForm())}>Get Started</button>
    </div>
    </div>
  )
}

const mapStateToProps = state => ({
  ShowRegistrationForm: state.userReducer.showRegistrationForm,
});

export default connect(mapStateToProps)(Header);


