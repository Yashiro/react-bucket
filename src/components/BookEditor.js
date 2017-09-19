import React, { Component } from 'react';
import FormItem from './FormItem';
import formProvider from '../utils/formProvider';
import constants from '../common/constants';
import AutoComplete from '../components/AutoComplete';
import request, { get } from "../utils/request";

class BookEditor extends Component {
    // AutoComplete Code
    constructor(props) {
        super(props);
        this.state = {
            recommendUsers: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
        let apiUrl = constants.uri + ':' + constants.port + '/book';
        let method = 'POST';
        if (editTarget) {
            editType = '编辑';
            apiUrl += '/' + editTarget.id;
            method = 'PUT';
        }
        
        request(method, apiUrl, {
            name: name.value,
            price: price.value,
            owner_id: owner_id.value
        }).then((res) => {
            if (res.id) {
                alert(editType + ' ID=' + res.id + ' 成功!');
                this.context.router.push('/book/list');
                return;
            } else {
                alert(editType + '失败!');
            }
        }).catch((err) => console.error(err));
    }

    // AutoComplete Code Begin
    getRecommendUsers(partialUserId) {
        get(constants.uri + ':' + constants.port + '/user?id_like=' + partialUserId).then((res) => {
            if (res.length === 1 && res[0].id === partialUserId) {
                return;
            }
            this.setState({
                recommendUsers: res.map((user) =>{
                    return {
                        text: `${user.id} (${user.name})`,
                        value: user.id
                    }
                })
            });
        });
    }

    handleOwnerIdChange(value) {
        var timer = 0;
        this.props.onFormChange('owner_id', value);
        this.setState({
            recommendUsers: []
        });
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (value) {
            this.timer = setTimeout(() => {
                this.getRecommendUsers(value);
                this.timer = 0;
            }, 200);
        }
    }
    // AutoComplete Code End

    render() {
        const { recommendUsers } = this.state;
        const { form: { name, price, owner_id }, onFormChange } = this.props;
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <FormItem label="书名：" valid={name.valid} error={name.error}>
                    <input type="text" value={name.value} onChange={(event) => onFormChange('name', event.target.value)} />
                </FormItem>
                <FormItem label="价格：" valid={price.valid} error={price.error}>
                    <input type="number" value={price.value || ''} onChange={(event) => onFormChange('price', event.target.value)} />
                </FormItem>
                <FormItem label="所有者：" valid={owner_id.valid} error={owner_id.error}>
                    {/* <input type="number" value={owner_id.value || ''} onChange={(event) => onFormChange('owner_id', event.target.value)} /> */}
                    <AutoComplete value={owner_id.value ? owner_id.value + '' : ''} options={recommendUsers} onValueChange={value => this.handleOwnerIdChange(value)} />
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

export default BookEditor;