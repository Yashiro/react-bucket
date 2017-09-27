import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon, Layout, Switch } from 'antd';
import '../styles/home-layout.less'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const { Header, Content, Footer, Sider } = Layout;
class HomeLayout extends Component {
    state = {
        theme: 'dark',
        current: 'index',
        collapsed: false,
        mode: 'inline',  // 水平垂直展现
        timer: 0
    }
    componentDidMount() {
        this.handleClick([], 'index')
    }
    changeTheme = (value) => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            mode: this.state.collapsed ? 'inline' : 'vertical',
        });
    }
    clear = () => {
        this.setState({
            current: 'index',
        });
    }
    handleClick = (e, special) => {
        this.setState({
            current: e.key || special,
        });
    }

    tick = () => {
        this.setState({ timer:this.state.timer + 1 });
    }

    // 组件渲染后开始循环执行tick函数
    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }

    // 组件将要死亡时清除计时器，不清除也可以
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { title, children } = this.props;
        return (
            <Layout className="containAll">
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} className="leftMenu">
                        {this.state.theme === 'light' ? <a href="" target='_blank' rel='noopener noreferrer'><Icon type="github" className="github" /></a> :
                            <a href="" target='_blank' rel='noopener noreferrer'><Icon type="github" className="github white" /></a> }
                        { this.state.theme === 'light' ? <span className="author">Andy</span> : <span className="author white">Andy</span> }
                        <Menu theme={this.state.theme} onClick={this.handleClick} defaultOpenKeys={['']} selectedKeys={[this.state.current]} className="menu" mode={this.state.mode}>
                            <Menu.Item key="/">
                            <Link to="/">
                            <Icon type="home" /><span className="nav-text">首页</span>
                            </Link>
                        </Menu.Item>

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
                    <div className="switch">
                        <Switch
                        checked={this.state.theme === 'dark'}
                        onChange={this.changeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                        />
                    </div>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff'}} toggle={this.toggle} collapsed={this.state.collapsed} clear={this.clear}>
                        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} style={{cursor: 'pointer'}} />
                        <span style={{paddingLeft:'2%', fontSize:'1.4em'}}>Information Management System</span>
                        <Menu mode="horizontal" className="logOut" onClick={this.clear}>
                            <SubMenu title={<span><Icon type="user" />{ this.state.username }</span>} >
                                <Menu.Item key="logOut"><Link to="/login" >退出</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Header>
                    <Content className="content">
                        {children}
                    </Content>
                    <Footer className="bottom animated bounceInLeft">
                        <div className="text">
                        <div>
                            <span className="me">© 2017 Andy</span>
                            <span className="stay">你已在此逗留了 <span className="time">{this.state.timer}</span> 秒</span></div>
                        </div> 
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default HomeLayout;