import React, {Component} from 'react';

class UserAdd extends Component {
    constructor() {
        super();
        this.state = {
            form: {
                name: {
                    valid: false,
                    value: '',
                    error: '',
                },
                age: {
                    valid: false,
                    value: '',
                    error: '',
                },
                gender: {
                    valid: false,
                    value: '',
                    error: '',
                }
            }
        };
    }

    handleValueChange(field, value, type='string') {
        if (type === 'number') {
            value = +value;
        }

        const {form} = this.state;

        const newFieldObject = {value, valid: true, error:''};

        switch (field) {
            case 'name': {
                if (value.length >= 5) {
                    newFieldObject.error = '用户名最多4个字符';
                    newFieldObject.valid = false;
                } else if (value.length === 0) {
                    newFieldObject.error = '请输入用户名';
                    newFieldObject.valid = false;
                }
                break;
            }
            case 'age': {
                if (value > 100 || value <= 0) {
                    newFieldObject.error = '请输入1~100之间的数字';
                    newFieldObject.valid = false;
                }
                break;
            }
            case 'gender': {
                if (!value) {
                    newFieldObject.error = '请选择性别';
                    newFieldObject.valid = false;
                }
                break;
            }
            default:
                break;
        }
        
        this.setState({
            form: {
                ...form,
                [field]: newFieldObject,
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault(); // 阻止表单submit事件自动跳转页面的动作

        const {form: {name, age, gender}} = this.state;
        if (!name.valid || !age.valid || !gender.valid) {
            alert('请填写正确的信息后重试!');
            return;
        }
        
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
            } else {
                alert('添加失败!');
            }
        }).catch((err) => console.error(err));
        
        alert(JSON.stringify(this.state));
    }

    render () {
        const {form: {name, age, gender}} = this.state;
        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>
                <main>
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <label>用户名：</label>
                        <input type="text" value={name.value} onChange={(event) => this.handleValueChange('name', event.target.value)} />
                        {!name.valid && <span>{name.error}</span>}
                        <br/>
                        <label>年龄：</label>
                        <input type="number" value={age.value || ''} onChange={(event) => this.handleValueChange('age', event.target.value, 'number')} />
                        {!age.valid && <span>{age.error}</span>}
                        <br/>
                        <select value={gender.value} onChange={(event) => this.handleValueChange('gender', event.target.value)} >
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

export default UserAdd;