import React from 'react';
import { BrowserRouter } from 'react-router-dom';
//import { Router } from 'react-router-dom';
import routes from '../routes';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <BrowserRouter routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}