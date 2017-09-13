import React, { Component } from 'react';

class FormItem extends Component {
    render() {
        const {label, children, valid, error} = this.props;
        return (
            <div>
                <label>{label}</label>
                {children}
                {!valid && <span>{error}</span>}
            </div>
        );
    }
}

export default FormItem;