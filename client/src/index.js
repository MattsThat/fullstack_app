
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
//import registerServiceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { createStore, combineReducers,applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import loginReducer from './reducer/loginReducer';
import authReducer from './reducer/authReducer';
import headerReducer from './reducer/headerReducer';
import thunk from 'redux-thunk';
// import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  login : loginReducer,
  auth : authReducer,
  header : headerReducer
  // form : formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(
              applyMiddleware(thunk)));

axios.defaults.baseURL = 'http://localhost:3001/api';

ReactDOM.render((<Provider store={store}><BrowserRouter>
    <App/>
  </BrowserRouter></Provider>), document.getElementById('root'));
//registerServiceWorker();