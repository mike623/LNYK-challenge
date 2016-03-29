import project  from './reducer.js';
import user  from './user.js';
import history  from './history.js';

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  project,
  routing,
  history,
});

export default rootReducer;
