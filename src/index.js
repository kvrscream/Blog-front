import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Users from "./pages/users";
import ListaPosts from "./pages/listaPosts";
import CreatePost from "./pages/createPost";
 
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/cadastro" exact={false} component={Cadastro} />
      <Route path="/users" exact={true} component={Users} />
      <Route path="/listaPosts" exact={true} component={ListaPosts} />
      <Route path="/createPost" exact={false} component={CreatePost} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
