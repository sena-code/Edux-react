import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home/index';
import Login from './pages/login/index';
import Timeline from './pages/admin/timeline';
import Objetivo from './pages/admin/objetivo';
import CrudTurma from './pages/admin/crudturma';
import CrudCurso from './pages/admin/crudcursos';
import ObjetivoA from './pages/admin/objetivoA';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

const RotaPrivada = ({component : Component, ...rest}) => (
  <Route 
    {...rest}
    render = { props => 
        localStorage.getItem('token-edux') !== null ? 
          (<Component {...props} />) : 
          (<Redirect to={{ pathname :'/login', state :{from : props.location}}} />)
    }
  />
);

const RotaPrivadaAdmin = ({component : Component, ...rest}) => (
  <Route 
    {...rest}
    render = { props => 
        localStorage.getItem('token-edux') !== null && jwt_decode(localStorage.getItem('token-edux')).role === 'Administrador' ? 
          (<Component {...props} />) : 
          (<Redirect to={{ pathname :'/login', state :{from : props.location}}} />)
    }
  />
);

const routing = (
 <Router>
   <div>
     <Switch>
     <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/cadastrar-se' component={Cadastrar} />
      <RotaPrivadaAdmin path='/admin/timeline' component={Timeline}/>
      <RotaPrivadaAdmin path='/admin/crudobjetivos' component={Objetivo}/>
      <RotaPrivadaAdmin path='/admin/crudturmas' component={CrudTurma}/>
      <RotaPrivadaAdmin path='/admin/crudcursos' component={CrudCurso}/>
      <RotaPrivadaAdmin path='/admin/crudobjetivosA' component={ObjetivoA}/>
     </Switch>
   </div>
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
