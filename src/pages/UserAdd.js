import React, {Component} from 'react';
import FormItem from '../components/FormItem';
import formProvider from '../utils/formProvider';
import HomeLayout from '../layouts/HomeLayout';

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
                this.context.router.push('/user/list')
            } else {
                alert('添加失败!');
            }
        }).catch((err) => console.error(err));
    }

    render () {
        const {form: {name, age, gender}, onFormChange} = this.props;
        return (
            <HomeLayout title="添加用户">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <FormItem label="用户名：" valid={name.valid} error={name.error}>
                        <input type="text" value={name.value} onChange={(event) => onFormChange('name', event.target.value)} />
                    </FormItem>
                    <br/>
                    <FormItem label="年龄：" valid={age.valid} error={age.error}>
                        <input type="number" value={age.value || ''} onChange={(event) => onFormChange('age', event.target.value)} />
                    </FormItem>
                    <br/>
                    <FormItem label="性别" valid={gender.valid} error={gender.error} >
                        <select value={gender.value} onChange={(event) => onFormChange('gender', event.target.value)} >
                            <option value=""></option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                    </FormItem>
                    <br/>
                    <br/>
                    <input type="submit" value="提交" />
                </form>
            </HomeLayout>
        );
    }
}

// 必须给UserAdd定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
UserAdd.contextTypes = {
    router: React.PropTypes.object.isRequired
};

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