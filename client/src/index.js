// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import App from './components/App';
//import registerServiceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3001/api';

ReactDOM.render((<BrowserRouter>
    <App/>
  </BrowserRouter>), document.getElementById('root'));
//registerServiceWorker();