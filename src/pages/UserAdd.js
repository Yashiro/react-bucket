import React, {Component} from 'react';

class UserAdd extends Component {
    render () {
        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>
                <main>
                    <form>
                        <label>用户名：</label>
                        <input type="text" />
                        <br/>
                        <label>年龄：</label>
                        <input type="number" />
                        <br/>
                        <select>
                            <option value=""></option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                        <br/>
                        <br/>
                        <input type="submit" value="提交" />
                    </form>
                </main>
            </div>
        );
    }
}

export default UserAdd;