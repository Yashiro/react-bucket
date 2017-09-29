import React, { Component } from 'react';
import { message, Table, Button, Popconfirm } from 'antd';
import constants from '../common/constants';
import { get, del } from "../utils/request";

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: []
        };
    }

    componentWillMount() {
        get(constants.uri + ':' + constants.port + '/book').then(res => {
            this.setState({
                bookList: res
            });
        });
    }

    handleEdit(book) {
        this.context.router.push('/book/edit/' + book.id);
    }

    handleDel(book) {
        del(constants.uri + ':' + constants.port + '/book/' + book.id).then(res => {
            this.setState({
                bookList: this.state.bookList.filter(item => item.id !== book.id)
            });
            message.success('删除成功');
        }).catch(err => {
            console.error(err);
            message.error('删除失败');
        });
    }

    render() {
        const { bookList } = this.state;
        const columns = [
            {
                title: '图书ID',
                width: 200,
                dataIndex: 'id'
            },
            {
                title: '书名',
                width: 200,
                dataIndex: 'name'
            },
            {
                title: '价格',
                width: 200,
                dataIndex: 'price',
                render: (text, record) => <span>&yen;{record.price / 100}</span>
            },
            {
                title: '所有者ID',
                width: 200,
                dataIndex: 'owner_id'
            },
            {
                title: '操作',
                render: (text, record) => (
                    <Button.Group type="ghost">
                        <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
                            <Button size="small">删除</Button>
                        </Popconfirm>
                    </Button.Group>
                )
            }
        ];
        return (
            <Table columns={columns} dataSource={bookList} rowKey={row => row.id} scroll={{y: 385 }} />
        );
    }
}

BookList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default BookList;