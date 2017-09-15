import React, { Component } from 'react';
import FormItem from './FormItem';
import formProvider from '../utils/formProvider';

class componentName extends Component {

    componentWillMount() {
        const {editTarget, setFormValues} = this.props;
        if (editTarget) {
            setFormValues(editTarget);
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();

        const {form: {name, price, owner_id}, formValid, editTarget} = this.props;
        if (!formValid) {
            alert('请填写正确的信息后重试!');
            return;
        }

        let editType = '添加';
        let apiUrl = constants.uri + ":" + constants.port + '/book';
        let method = 'POST';
        if (editTarget) {
            editType = '编辑';
            apiUrl += '/' + editTarget.id;
            method = 'PUT';
        }
        
        fetch(apiUrl, {
            method: method,
            body: JSON.stringify({
                name: name.value,
                price: price.value,
                owner_id: owner_id.value
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((res) => res.json()).then((res) => {
            if (res.id) {
                alert(editType + ' ID=' + res.id + ' 成功!');
                this.context.router.push('/user/list');
                return;
            } else {
                alert(editType + '失败!');
            }
        }).catch((err) => console.error(err));
    }

    render() {
        const {form: {name, price, owner_id}, onFormChange} = this.props;
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <FormItem label="书名：" valid={name.valid} error={name.error}>
                    <input type="text" value={name.value} onChange={(event) => onFormChange('name', event.target.value)} />
                </FormItem>
                <FormItem label="价格：" valid={price.valid} error={price.error}>
                    <input type="number" value={price.value || ''} onChange={(event) => onFormChange('price', event.target.value)} />
                </FormItem>
                <FormItem label="所有者：" valid={owner_id.valid} error={owner_id.error}>
                    <input type="number" value={owner_id.value || ''} onChange={(event) => ('owner_id', event.target.value)} />
                </FormItem>
                <br/>
                <input type="submit" value="提交" />
            </form>
        );
    }
}

BookEditor.contextTypes = {
    router: React.PropTypes.object.isRequired
}

BookEditor = formProvider({
    name: {
        dafaultValue: '',
        rules: [
            {
                pattern(value) {
                    return value.length > 0;
                },
                error: '请输入书名'
            }
        ]
    },
    price: {
        defaultValue: 0,
        rules: [
            {
                pattern: /^\d+$/,
                error: '请输入一个整数'
            },
            {
                pattern(value) {
                    return value > 0;
                },
                error: '价格必须大于0'
            }
        ]
    },
    owner_id: {
        dafaultValue: 0,
        rules: [
            {
                pattern: /^\d+$/,
                error: '请输入合法的用户ID'
            },
            {
                pattern(value) {
                    return value > 0;
                },
                error: '请输入用户ID'
            }
        ]
    }
})(BookEditor);

export default componentName;