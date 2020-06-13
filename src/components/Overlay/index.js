import React, { Component, createRef } from 'react';

import { onScroll } from '../../utils';

import './index.less';

class Overlay extends Component {

    state = {};

    overlayRef = createRef();

    componentDidMount() {
        this.overlay = this.overlayRef.current;
        onScroll(this.onScrollStart, this.onScrollEnd);
    }

    onScrollStart = () => {
        this.overlay.style.pointerEvents = 'all';
    };

    onScrollEnd = () => {
        this.overlay.style.pointerEvents = 'none';
    };

    render() {
        return <div className="overlay" ref={this.overlayRef} />;
    }

}

export default Overlay;
