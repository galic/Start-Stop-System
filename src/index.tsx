/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Route, Router, Routes } from '@solidjs/router';
import { lazy } from 'solid-js';

const root = document.getElementById('root');
const Start = lazy(() => import("./Start"));
const Stop = lazy(() => import("./Stop"));
const groupList = lazy(() => import("./GroupList"));
const athleteList = lazy(() => import("./Athletes"));

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() => (
  <Router>
    <Routes>
        <Route path="/" component={App} />
        <Route path="/start" component={Start} />
        <Route path="/stop" component={Stop} />
        <Route path="/groups" component={groupList} />
        <Route path="/athletes" component={athleteList} />
      </Routes>
  </Router>
), root!);
