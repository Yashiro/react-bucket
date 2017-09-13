import React, {Component} from 'react';
import formProvider from '../utils/formProvider';

class UserAdd extends Component {

    handleSubmit(event) {
        event.preventDefault(); // 阻止表单submit事件自动跳转页面的动作

        const {form: {name, age, gender}, formValid} = this.props;
        if (!formValid) {
            alert('请填写正确的信息后重试!');
            return;
        }
        
        fetch('http://localhost:3000/user', {
            method: 'POST',
            body: JSON.stringify({
                name: name.value,
                age: age.value,
                gender: gender.value
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((res) => res.json()).then((res) => {
            // 当添加成功时，返回的json对象中应包含一个有效的id字段
            // 所以可以使用res.id来判断添加是否成功
            if (res.id) {
                alert('添加成功 ID=' + res.id);
            } else {
                alert('添加失败!');
            }
        }).catch((err) => console.error(err));
    }

    render () {
        const {form: {name, age, gender}, onFormChange} = this.props;
        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>
                
                <main>
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <label>用户名：</label>
                        <input type="text" value={name.value} onChange={(event) => onFormChange('name', event.target.value)} />
                        {!name.valid && <span>{name.error}</span>}
                        <br/>
                        <label>年龄：</label>
                        <input type="number" value={age.value || ''} onChange={(event) => onFormChange('age', event.target.value)} />
                        {!age.valid && <span>{age.error}</span>}
                        <br/>
                        <select value={gender.value} onChange={(event) => onFormChange('gender', event.target.value)} >
                            <option value=""></option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                        {!gender.valid && <span>{gender.error}</span>}
                        <br/>
                        <br/>
                        <input type="submit" value="提交" />
                    </form>
                </main>
            </div>
        );
    }
}

UserAdd = formProvider({
    name: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return value.length > 0;
                },
                error: '请输入用户名',
            },
            {
                pattern: /^.{1,4}$/,
                error: '用户名最多4个字符'
            }
        ],
    },
    age: {
        defaultValue: 0,
        rules: [
            {
                pattern: function (value) {
                    return value >= 1 && value <= 100;
                },
                error: '请输入1~100的年龄',
            }
        ]
    },
    gender: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return !!value;
                },
                error: '请选择性别'
            }
        ]
    }
})(UserAdd);

export default UserAdd;