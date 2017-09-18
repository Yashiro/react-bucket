import React, { Component } from 'react';
import formProvider from '../utils/formProvider';
import FormItem from '../components/FormItem';
import constants from '../common/constants';
import request from '../utils/request';

class UserEditor extends Component {

    componentWillMount() {
        const { editTarget, setFormValues } = this.props;
        if (editTarget) {
            setFormValues(editTarget);
        }
    }
    
    handleSubmit(event) {
        event.preventDefault(); // 阻止表单submit事件自动跳转页面的动作
        
        const { form: { name, age, gender }, formValid, editTarget } = this.props;
        if (!formValid) {
            alert('请填写正确的信息后重试!');
            return;
        }

        let editType = '添加';
        let apiUrl = constants.uri + ':' + constants.port + '/user';
        let method = 'POST';
        if (editTarget) {
            editType = '编辑';
            apiUrl += '/' + editTarget.id;
            method = 'PUT';
        }
        
        request(method, apiUrl, {
            body: JSON.stringify({
                name: name.value,
                age: age.value,
                gender: gender.value
            })
        }).then((res) => res.json()).then((res) => {
            // 当添加成功时，返回的json对象中应包含一个有效的id字段
            // 所以可以使用res.id来判断添加是否成功
            if (res.id) {
                alert(editType + ' ID=' + res.id + ' 成功!');
                this.context.router.push('/user/list');
                return;
            } else {
                alert(editType + '失败!');
            }
        }).catch((err) => console.error(err));
    }

    render () {
        const { form: { name, age, gender }, onFormChange } = this.props;
        return (
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
        );
    }
}

// 必须给UserAdd定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
UserEditor.contextTypes = {
    router: React.PropTypes.object.isRequired
};

UserEditor = formProvider({
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
})(UserEditor);

export default UserEditor;