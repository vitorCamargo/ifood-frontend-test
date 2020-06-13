import React, { useState, useEffect } from 'react';

import Mouse from '../Mouse';

import './index.less';
import MouseGlow from '../MouseGlow';
import Overlay from '../Overlay';

// import { UserConsumer } from '../../contexts/UserContext';
// import { ExploreConsumer } from '../../contexts/ExploreContext';
// import { container, noTransiton } from './Layout.module.sass';
// import Loader from '../Loader';
// import MobileLoader from '../MobileLoader';
// import MouseGlow from '../MouseGlow';
// import Mouse from '../Mouse';
// import ResponsiveRender from '../ResponsiveRender';
// import Header from '../Header';
// import MobileHeader from '../MobileHeader';
// import Footer from '../Footer';
// import Stats from '../Stats';
// import MobileStats from '../MobileStats';
// import Modal from '../Modal';
// import MobileModal from '../MobileModal';
// import Overlay from '../Overlay';

const Layout = () => {
    const minColumns = 16;
    const [loadProgress, setLoadProgress] = useState(10);
    const [containerStyle, setContainerStyle] = useState(null);
    const [totalColumns, setTotalColumns] = useState(minColumns);

    const onLoad = () => {
        setTimeout(() => {
            setLoadProgress(40);
        }, 1000);
    };

    const setContainerColumns = () => {
        const rows = 10;

        const viewportColumns = Math.ceil(
            window.innerWidth / (window.innerHeight / rows),
        );

        const columns = Math.max(viewportColumns, minColumns);
        const sectionStyle = {
            width: `calc((100vh / ${rows}) * ${columns})`,
            gridTemplateColumns: `repeat(${columns}, calc(100vh / ${rows}))`,
        };

        setTotalColumns(columns);
        setContainerStyle(sectionStyle);
    };

    useEffect(() => {
        setContainerColumns();
        window.addEventListener('resize', setContainerColumns);
        window.addEventListener('load', onLoad);

        return () => {
            window.removeEventListener('resize', setContainerColumns);
        };
    }, []);

    return (
        <div className="main-layout">
            <Overlay />
            <MouseGlow />
            <Mouse />

            {/* <ResponsiveRender
                isLoading={!userReady}
                mobileComponent={MobileHeader}
                desktopComponent={Header}
            />
            <ResponsiveRender
                isLoading={!userReady}
                mobileComponent={MobileStats}
                desktopComponent={Stats}
            />
            <ResponsiveRender
                mobileComponent={MobileLoader}
                desktopComponent={Loader}
                progress={loadProgress}
                onUserReady={this.onUserReady}
            /> */}

            <div className="loader" style={containerStyle}>
                { Array(totalColumns * 10).fill(totalColumns * 10).map(() => (
                    <div key={Math.random()} className="drum-pad" />
                ))}
            </div>
        </div>
    );
};

export default Layout;
