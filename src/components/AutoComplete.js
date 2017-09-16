import React, { Component } from 'react';

class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: '',
            activeItemIndex: -1
        }
    }
    
    render() {
        const {displayValue, activeItemIndex} = this.state;
        const {value, options} = this.props;
        return (
            <div>
            <input value={value} />
            {options.length > 0 && (
                <ul>
                    {
                        options.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item.tetxt || item}
                                </li>
                            );
                        })
                    }
                </ul>
            )}
            </div>
        );
    }
}

// 通用组件最好写一下propTypes约束
AutoComplete.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onValueChange: PropTypes.func.isRequired
  };

export default AutoComplete;