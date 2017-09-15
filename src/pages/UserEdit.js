import React, { Component } from 'react';
import HomeLayout from '../layouts/HomeLayout';
import UserEditor from '../components/UserEditor';
import constants from '../common/constants';

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentWillMount() {
        const userId = this.context.router.params.id;
        fetch(constants.uri + constants.colon + constants.port + '/user/' + userId).then(res => res.json()).then(res => {
            this.setState({
                user: res
            });
        });
    }
    
    render() {
        const {user} = this.state;
        return (
            <HomeLayout title="编辑用户">
                {
                    user ? <UserEditor editTarget={user} /> : '加载中...'
                }
            </HomeLayout>
        );
    }
}

UserEdit.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default UserEdit;