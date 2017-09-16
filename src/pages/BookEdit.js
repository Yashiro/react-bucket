import React, { Component } from 'react';
import HomeLayout from '../layouts/HomeLayout';
import BookEditor from '../components/BookEditor';
import constants from '../common/constants';

class BookEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: null
        };
    }

    
    componentWillMount() {
        const bookId = this.context.router.params.id;
        fetch(constants.uri + ":" + constants.port + "")
    }
    
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

BookEdit.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default BookEdit;