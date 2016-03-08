import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App.js';
import News from './containers/News.js';
import Show from './containers/Show.js';

const routes = ( 
  <Route path="/" component={App}>
    <IndexRoute component={News}/>
    <Route path="/news" component={News}/>
    <Route path="/show" component={Show}/>
  </Route>
)

export default routes

