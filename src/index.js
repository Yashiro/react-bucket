import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import HomePage from './pages/Home';
import UserListPage from './pages/UserList';
import UserAddPage from './pages/UserAdd';
import UserEditPage from './pages/UserEdit';
import BookListPage from './pages/BookList';
import BookAddPage from './pages/BookAdd';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/user/list" component={UserListPage} />
        <Route path="/user/add" component={UserAddPage} />
        <Route path="/user/edit/:id" component={UserEditPage} />
        <Route path="/book/list" component={BookListPage} />
        <Route path="/book/add" component={BookAddPage} />
    </Router>
), document.getElementById('app'));