import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/home';
import Login from './pages/login';
import Turma from './pages/turma';
import Curso from './pages/curso';
import CrudInsituicao from './pages/admin/crudinstituicao';
import NaoEncontrada from './pages/naoencontrada'
import CrudCurso from './pages/admin/crudcurso';
import CrudTurma from './pages/admin/crudturma';
import Cadastro from './pages/cadastro';

const RotaPrivada = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token-edux') !== null ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
    }
  />
);

const RotaAdmin = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token-edux') !== null && jwt_decode(localStorage.getItem('token-edux')).Role === "1" ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/acessonegado', state: { from: props.location } }} />)
    }
  />
);
const RotaProfessor = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token-edux') !== null && jwt_decode(localStorage.getItem('token-edux')).Role === "3" ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
    }
  />
);

const routing = (
  <Router>
    <Switch>
      <Route exact path ="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route path="/curso" component={Curso} />
      <RotaPrivada path="/turma" component={Turma} />
      <RotaAdmin path ="/admin/crudinstituicao" component={CrudInsituicao} />
      <RotaAdmin path ="/admin/crudturma" component={CrudTurma} />
      <RotaAdmin path ="/admin/crudcurso" component={CrudCurso} />
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
