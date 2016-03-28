import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import News from './containers/News';
import Show from './containers/Show';
import Ask from './containers/Ask';
import Jobs from './containers/Jobs';
import Newest from './containers/Newest';
import Comments from './containers/Comments';
import User from './containers/User';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={News}/>
    <Route path="/news" component={News}/>
    <Route path="/newest" component={Newest}/>
    <Route path="/show" component={Show}/>
    <Route path="/ask" component={Ask}/>
    <Route path="/jobs" component={Jobs}/>
    <Route path="/comments/:id" component={Comments}/>
    <Route path="/user/:id" component={User}/>
  </Route>
)

export default routes
