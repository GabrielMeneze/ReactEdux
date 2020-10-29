import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/home';
import Login from './pages/login';
import Turma from './pages/turma';
import CrudInsituicao from './pages/admin/crudinstituicao';
import NaoEncontrada from './pages/naoencontrada'
import CrudCurso from './pages/admin/crudcurso';
import CrudTurma from './pages/admin/crudturma';

const routing = (
  <Router>
    <Switch>
      <Route exact path ="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/turma" component={Turma} />
      <Route path ="/admin/crudinstituicao" component={CrudInsituicao} />
      <Route path ="/admin/crudcurso" component={CrudCurso} />
      <Route path ="/admin/crudturma" component={CrudTurma} />
      <Route path ="/naoencontrada" component={NaoEncontrada} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
