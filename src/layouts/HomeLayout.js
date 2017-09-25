import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon, Layout } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const { Header, Content, Footer, Sider } = Layout;
class HomeLayout extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { title, children } = this.props;
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <Header style={{ background: '#404040', padding: 0 }}>
                    </Header>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <SubMenu key="user" title={<span><Icon type="user" /><span>用户管理</span></span>}>
                            <MenuItem key="user-list">
                                <Link to="/user/list">用户列表</Link>
                            </MenuItem>
                            <MenuItem key="user-add">
                                <Link to="/user/add">添加用户</Link>
                            </MenuItem>
                        </SubMenu>

                        <SubMenu key="book" title={<span><Icon type="book" /><span>图书管理</span></span>}>
                            <MenuItem key="book-list">
                                <Link to="/book/list">图书列表</Link>
                            </MenuItem>
                            <MenuItem key="book-add">
                                <Link to="/book/add">添加图书</Link>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#404040', padding: 0 }}>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{cursor: 'pointer'}}
                            />
                        </span>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>Information Management System</span>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        ©2017 Andy
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default HomeLayout;