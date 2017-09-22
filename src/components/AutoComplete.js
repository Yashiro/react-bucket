import React, { PropTypes } from 'react';
import { Input } from 'antd';
import style from '../styles/auto-complete.less';

function getItemValue(item) {
    return item.value || item;
}
class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false, // 新增的下拉框显示控制开关
            displayValue: '',
            activeItemIndex: -1
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }

    handleChange(value, activeItemIndex) {
        this.setState({ activeItemIndex: -1, displayValue: '' });
        // 原来的onValueChange改为了onChange以适配antd的getFieldDecorator
        console.log('value ==>' + value);
        console.log('activeItemIndex ==>' + activeItemIndex);
        this.props.onChange(value, activeItemIndex);
    }

    handleKeyDown(event) {
        const { activeItemIndex } = this.state;
        const { options } = this.props;

        switch (event.keyCode) {
            case 13: {
                if (activeItemIndex >= 0) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.handleChange(getItemValue(options[activeItemIndex]), activeItemIndex);
                }
                break;
            }
            case 38:
            case 40: {
                event.preventDefault();
                this.moveItem(event.keyCode === 38 ? 'up' : 'down');
                break;
            }
        }
    }

    moveItem(direction) {
        const { activeItemIndex } = this.state;
        const { options } = this.props;
        const lastIndex = options.length - 1;
        let newIndex = -1;

        if (direction === 'up') {
            if (activeItemIndex === -1) {
                newIndex = lastIndex;
            } else {
                newIndex = activeItemIndex - 1;
            }
        } else {
            if (activeItemIndex < lastIndex) {
                newIndex = activeItemIndex + 1;
            }
        }

        let newDisplayValue = '';
        if (newIndex >= 0) {
            newDisplayValue = getItemValue(options[newIndex]);
        }

        this.setState({
            displayValue: newDisplayValue,
            activeItemIndex: newIndex
        });
    }

    handleEnter(index) {
        const currentItem = this.props.options[index];
        this.setState({ activeItemIndex: index, displayValue: getItemValue(currentItem) });
    }

    handleLeave() {
        this.setState({ activeItemIndex: -1, displayValue: '' });
    }

    render() {
        const { show, displayValue, activeItemIndex } = this.state;
        const { value, options } = this.props;
        return (
            <div className={style.wrapper}>
                <Input value={displayValue || value} onChange={event => this.handleChange(event.target.value, activeItemIndex)} onKeyDown={this.handleKeyDown} onFocus={() => this.setState({ show: true })} onBlur={() => this.setState({ show: false })} />
                {show && options.length > 0 && (
                    <ul className={style.options} onMouseLeave={this.handleLeave}>
                        {
                            options.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={index === activeItemIndex ? style.active : ''}
                                        onMouseEnter={() => this.handleEnter(index)}
                                        onClick={() => this.handleChange(getItemValue(item), index)}
                                    >
                                        {item.text || item}
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

// 由于使用了antd的form.getFieldDecorator来包装组件
// 这里取消了原来props的isRequired约束以防止报错
AutoComplete.propTypes = {
    value: PropTypes.any,
    options: PropTypes.array,
    onChange: PropTypes.func // 原来的onValueChange改为了onChange以适配antd的getFieldDecorator
};

export default AutoComplete;