import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import HomePage from './pages/Home';
import UserListPage from './pages/UserList';
import UserAddPage from './pages/UserAdd';
import UserEditPage from './pages/UserEdit';
import BookListPage from './pages/BookList';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/user/list" component={UserListPage} />
        <Route path="/user/add" component={UserAddPage} />
        <Route path="/user/edit/:id" component={UserEditPage} />
        <Route path="/book/list" component={BookListPage} />
    </Router>
), document.getElementById('app'));