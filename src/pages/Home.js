import React, { Component } from 'react';
import style from '../styles/home-page.less';

class Home extends Component {
    render() {
        return (
            <div className={style.welcome}>
                Welcome
            </div>
        );
    }
}

export default Home;