import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app.js';
import News from './components/news.js';
import Show from './components/show.js';

const routes = ( 
  <Route path="/" component={App}>
    <IndexRoute component={News}/>
    <Route path="/news" component={News}/>
    <Route path="/show" component={Show}/>
  </Route>
)

export default routes

