import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Home from '../components/pages/Home';
import Init from '../components/pages/Init';
import Live from '../components/pages/Live';
import Howto from '../components/pages/Howto';
import NotFound from '../components/pages/NotFound';

const r = () => (
  <Router history={browserHistory}>
    <Route path="creativecollider" >
      <IndexRoute component={Home} />
      <Route path="init" component={Init} />
      <Route path="howto" component={Howto} />
      <Route path="live/:spreadsheetId" component={Live} />
      <Route path='*' exact={true} component={NotFound} />
    </Route>
  </Router>
);

export default r;
