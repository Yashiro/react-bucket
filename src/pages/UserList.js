import React, { Component } from 'react';
import HomeLayout from '../layouts/HomeLayout';
import constants from '../common/constants';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        };
    }

    componentWillMount() {
        fetch(constants.uri + ":" + constants.port + '/user').then(res => res.json()).then(res => {
            this.setState({
                userList: res
            });
        });
    }

    handleEdit(user) {
        this.context.router.push('/user/edit/' + user.id);
    }

    handleDel(user) {
        const confirmed = confirm(`确定要删除用户 ${user.name} ?`);

        if (confirmed) {
            fetch(constants.uri + ":" + constants.port + '/user/' + user.id, {
                method: 'DELETE'
            }).then(res => res.json()).then(res => {
                this.setState({
                    userList: this.state.userList.filter(item => item.id !== user.id)
                });
                alert('删除成功');
            }).catch(err => {
                console.error(err);
                alert('删除失败');
            });
        }
    }
    
    render() {
        const {userList} = this.state;
        return (
            <HomeLayout title="用户列表">
                <table>
                    <thead>
                        <tr>
                            <th>用户ID</th>
                            <th>用户名</th>
                            <th>性别</th>
                            <th>年龄</th>
                            <th>操作</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            userList.map((user) => {
                                return(
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <a href="javascript:void(0)" onClick={() => this.handleEdit(user)}>编辑</a>
                                            &nbsp;
                                            <a href="javascript:void(0)" onClick={() => this.handleDel(user)}>删除</a>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </HomeLayout>
        );
    }
}

UserList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default UserList;