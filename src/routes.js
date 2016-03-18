import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App.js';
import News from './containers/News.js';
import Show from './containers/Show.js';
import Ask from './containers/Ask.js';
import Jobs from './containers/Jobs.js';
import Newest from './containers/Newest.js';
import Comments from './containers/Comments.js';
import User from './containers/User.js';

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
