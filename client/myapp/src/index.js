import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider } from 'react-redux'
import {combineReducers ,legacy_createStore as createStore } from 'redux'
import moviesReducers from './Reducers/moviesReducer'
import usersReducers from  './Reducers/usersReducer'
import memberReducer from './Reducers/membersReducer'
import authReducer from './Reducers/authReducer';
import watchedMoviesReducer from './Reducers/watchedMovies';
const root = ReactDOM.createRoot(document.getElementById('root'));

const rootReducer = combineReducers({
  movies : moviesReducers,
  users : usersReducers,
  members : memberReducer,
  auth : authReducer,
  watchedMovies : watchedMoviesReducer,
})
const store = createStore(rootReducer)

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
