import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import reducer from './reducer';
import './index.css';
import App from './components/App'
import Voting from './components/Voting';
import Results from './components/Results';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['Sunshine', '28 Days Later'],
      tally: {Sunshine: 2}
    }
  }
});

const routes = <Route component={App}>
  <Route path="/" component={Voting} />
  <Route path="/results" component={Results} />
</Route>;

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('root')
);
