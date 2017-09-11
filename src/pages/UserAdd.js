import React, {Component} from 'react';

class UserAdd extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            age: 0,
            gender: '',
        }
    }

    handleValueChange(field, value, type='string') {
        if (type === 'number') {
            value = +value;
        }
        this.setState({
           [field]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault(); // 阻止表单submit事件自动跳转页面的动作

        const {name, age, gender} = this.state;
        fetch('http://localhost:3000/user', {
            method: 'POST',
            body: JSON.stringify({
                name,
                age,
                gender
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((res) => res.json()).then((res) => {
            // 当添加成功时，返回的json对象中应包含一个有效的id字段
            // 所以可以使用res.id来判断添加是否成功
            if (res.id) {
                alert('添加成功 ID=' + res.id);
                this.setState({
                    name: '',
                    age: 0,
                    gender: ''
                });
            } else {
                alert('添加失败!');
            }
        }).catch((err) => console.error(err));
        
        alert(JSON.stringify(this.state));
    }

    render () {
        const {name, age, gender} = this.state;
        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>
                <main>
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <label>用户名：</label>
                        <input type="text" value={name} onChange={(event) => this.handleValueChange('name', event.target.value)} />
                        <br/>
                        <label>年龄：</label>
                        <input type="number" value={age || ''} onChange={(event) => this.handleValueChange('age', event.target.value, 'number')} />
                        <br/>
                        <select value={gender} onChange={(event) => this.handleValueChange('gender', event.target.value)} >
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