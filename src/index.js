import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import UserAddPage from './pages/UserAdd';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/user/add" component={UserAddPage} />
    </Router>
), document.getElementById('app'));
