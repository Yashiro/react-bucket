import React, { Component } from 'react';
import HomeLayout from '../layouts/HomeLayout';
import BookEditor from '../components/BookEditor';

class BookAdd extends Component {
    render() {
        return (
            <HomeLayout title="添加图书">
                <BookEditor />
            </HomeLayout>
        );
    }
}

export default BookAdd;