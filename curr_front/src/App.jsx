import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import { BrowserRouter as Router} from 'react-router-dom';

import Logo from './templates/Logo';
import Nav from './templates/Nav';
import Footer from './templates/Footer';

import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Logo />
        <Nav />
        <AppRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
