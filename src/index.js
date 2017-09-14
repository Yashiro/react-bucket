import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import HomePage from './pages/Home';
import UserListPage from './pages/UserList';
import UserAddPage from './pages/UserAdd';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/user/list" component={UserListPageList} />
        <Route path="/user/add" component={UserAddPage} />
    </Router>
), document.getElementById('app'));