import {
  combineReducers
}
from 'redux';
import nav from './navReducers';
import http from './httpReducers';
import scrollView from './scrollViewReducers';
import login from './loginReducers';

export default combineReducers({
  nav: nav,
  http: http,
  scroll: scrollView,
  login: login
    // More reducers if there are
    // can go here
});
