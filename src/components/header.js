import React from 'react';
import {connect} from 'react-redux';

import './header.css';


export default function Header(props) {
  return (
    <div className="header">
      <div className="header-wrapper">
      <h1 className="header-text">Luz</h1>
      <button>Get Started</button>
      </div>
    </div>
  )
}
