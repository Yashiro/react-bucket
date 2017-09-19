import React, { Component } from 'react';
import BookEditor from '../components/BookEditor';
import constants from '../common/constants';
import { get } from "../utils/request";

class BookEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: null
        };
    }

    componentWillMount() {
        const bookId = this.context.router.params.id;
        get(constants.uri + ':' + constants.port + '/book/' + bookId).then(res => {
            this.setState({
                book: res
            });
        });
    }
    
    render() {
        const { book } = this.state;
        return book ? <BookEditor editTarget={book}/> : <span>加载中...</span>
    }
}

BookEdit.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default BookEdit;