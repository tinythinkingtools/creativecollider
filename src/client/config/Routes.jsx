import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Home from '../components/pages/Home';

const r = () => (
  <Router history={browserHistory}>
    <Route path="/" >
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

export default r;