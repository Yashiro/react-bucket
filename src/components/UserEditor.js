import React, { Component } from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import constants from '../common/constants';
import request from '../utils/request';

const FormItem = Form.Item;
const formLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
};
class UserEditor extends Component {

    componentDidMount () {
        // 在componentWillMount里使用form.setFieldsValue无法设置表单的值
        // 所以在componentDidMount里进行赋值
        // see: https://github.com/ant-design/ant-design/issues/4802
        const {editTarget, form} = this.props;
        if (editTarget) {
          form.setFieldsValue(editTarget);
        }
    }
    
    handleSubmit(event) {
        event.preventDefault(); // 阻止表单submit事件自动跳转页面的动作
        
        const { form, editTarget } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                let editType = '添加';
                let apiUrl = constants.uri + ':' + constants.port + '/user';
                let method = 'POST';
                if (editTarget) {
                    editType = '编辑';
                    apiUrl += '/' + editTarget.id;
                    method = 'PUT';
                }
                request(method, apiUrl, values).then((res) => {
                    // 当添加成功时，返回的json对象中应包含一个有效的id字段
                    // 所以可以使用res.id来判断添加是否成功
                    if (res.id) {
                        message.success(editType + ' ID=' + res.id + ' 成功!');
                        this.context.router.push('/user/list');
                    } else {
                        message.error(editType + '失败!');
                    }
                }).catch((err) => console.error(err));
            } else {
                message.warn(err);
            }
        });
    }

    render () {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div style={{ width: '400px' }}>
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <FormItem label="用户名：" {...formLayout}>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户名'
                                },
                                {
                                    pattern: /^.{1,4}$/,
                                    message: '用户名最多4个字符'
                                }
                            ]
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>

                    <FormItem label="年龄：" {...formLayout}>
                        {getFieldDecorator('age', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入年龄',
                                    type: 'number'
                                },
                                {
                                    min: 1,
                                    max: 100,
                                    message: '请输入1~100的年龄',
                                    type: 'number'
                                }
                            ]
                        })(
                            <InputNumber />
                            )}
                    </FormItem>

                    <FormItem label="性别：" {...formLayout}>
                        {getFieldDecorator('gender', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择性别'
                                }
                            ]
                        })(
                            <Select placeholder="请选择">
                                <Select.Option value="male">男</Select.Option>
                                <Select.Option value="female">女</Select.Option>
                            </Select>
                            )}
                    </FormItem>

                    <FormItem wrapperCol={{ ...formLayout.wrapperCol, offset: formLayout.labelCol.span }}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

// 必须给UserAdd定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
UserEditor.contextTypes = {
    router: React.PropTypes.object.isRequired
};

UserEditor = Form.create()(UserEditor);

export default UserEditor;