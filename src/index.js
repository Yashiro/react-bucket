import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import UserListPage from './pages/UserList';
import UserAddPage from './pages/UserAdd';
import HomePage from './pages/Home';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/user/list" component={UserListPage} />
        <Route path="/user/add" component={UserAddPage} />
    </Router>
), document.getElementById('app'));