import React from 'react';

import {
  Route,
  Switch
} from 'react-router-dom';

import Home from './components/home/Home';
import Usuario from './components/usuario/Usuario';

const AppRoutes = (props) => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/api/usuarios' component={Usuario} />
    </Switch>
  );
}

export default AppRoutes;

// <Redirect from='*/'to='/' /> 