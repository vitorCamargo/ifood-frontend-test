import React, { Component } from 'react';

import './index.less';

class Mouse extends Component {

    state = {};

    componentDidMount() {
        window.addEventListener('mousemove', this.changeCursorPosition);
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    changeCursorPosition = e => {
        this.setState({
            cursorPosition: {
                transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0)`,
            },
        });
    };

    onMouseDown = () => {
        this.setState({ mouseFocus: true });
    };

    onMouseUp = () => {
        this.setState({ mouseFocus: false });
    };

    getClassName = (baseClass = '') => {
        let newClass = baseClass;

        const { mouseFocus } = this.state;

        if (mouseFocus) {
            newClass += ` ${baseClass}-hover`;
        }

        return newClass;
    };

    render() {
        const { cursorPosition } = this.state;

        return (
            <>
                <div
                    style={cursorPosition}
                    className={this.getClassName('mouse-cursor')}
                />

                <div
                    style={cursorPosition}
                    className={this.getClassName('mouse-ring')}
                />
            </>
        );
    }

}

export default Mouse;
