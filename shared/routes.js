import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
// import PostContainer from './container/PostContainer/PostContainer';
// import PostDetailView from './container/PostDetailView/PostDetailView';
import ProjectDetailView from './container/ProjectDetailView';
import ProjectContainer from './container/ProjectContainer';
import LoginContainer from './container/LoginContainer';
import ProjectHistoryView from './container/ProjectHistoryView';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


export const createRoutes = (store) =>{
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/home'
      });
    }
    callback();
  };

  return (
    <Route path="/" component={App} >
      <IndexRoute component={LoginContainer} />
      <Route path="/home" component={ProjectContainer} onEnter={requireAuth} />
      <Route path="/login" component={LoginContainer} onEnter={redirectAuth} />
      <Route path="/project/:cuid" component={ProjectDetailView} onEnter={requireAuth} />
      <Route path="/history" component={ProjectHistoryView} onEnter={requireAuth} />
    </Route>
  )
}
