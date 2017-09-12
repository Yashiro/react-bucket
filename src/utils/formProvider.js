import React, {Component} from 'react';

function formProvider(fields) {
    return function (Comp) {
        const initialFormState = {};
        for (const key in fields) {
            initialFormState[key] = {
                value: fields[key].defaultValue,
                error: '',
            }
        };
    }
    
    class FormComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                form: initialFormState,
                formValid: false,
            };
            this.handleValueChange = this.handleValueChange(this);
        }

        handleValueChange(fieldName, value) {
            const {form} = this.state;

            const newFieldState = {value, valid: true, error:''};

            const fieldRules = fields[fieldName].rules;

            for (let i = 0; i < fieldRules.length; i++) {
                const {pattern, error} = fieldRules[i];
                let valid = false;
                if (typeof pattern === 'function') {
                    valid = pattern(value);
                } else {
                    valid = pattern.test(value);
                }
                if (!valid) {
                    newFieldState.valid = false;
                    newFieldState.error = error;
                    break;
                }
            }

            const newForm = {...form, [fieldName]: newFieldState};
            const formValid = Object.values(newForm).every(func => func.valid);

            this.setState({
                form: newForm,
                formValid,
            });
        }
        render() {
            const {form, formValid} = this.state;
            return <Comp {...this.props} form={form} formValid={formProvider} onFormChange={this.handleValueChange} />
        }
    }
    return FormComponent;
}

export default formProvider;