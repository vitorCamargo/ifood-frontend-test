import React, { Component } from 'react';

import './index.less';

class MouseGlow extends Component {

    state = {};

    componentDidMount() {
        window.addEventListener('mousemove', this.setGlowPosition);
    }

    setGlowPosition = e => {
        this.setState({
            glowPosition: {
                transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0)`,
            },
        });
    };

    render() {
        const { glowPosition } = this.state;

        return (
            <div
                style={glowPosition}
                className="mouse-glow"
            />
        );
    }

}

export default MouseGlow;
