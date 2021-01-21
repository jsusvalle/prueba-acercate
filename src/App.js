import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import UserState from './context/userState';
import LoginPage from './screens/Login';
import PedidosScreen from './screens/Pedidos';

import tokenAuth from './config/tokenAuth';

const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}

function App() {
  return (
    <UserState>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <PedidosScreen path="/inicio/:id" component={PedidosScreen} />
        </Switch>
      </Router>
    </UserState>
  );
}

export default App;
