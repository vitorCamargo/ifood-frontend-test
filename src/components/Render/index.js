import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import { MOBILE_WIDTH_BREAKPOINT as mobileWidthBreakpoint } from '../../config';

const ResponsiveRender = ({
    mobileComponent: MobileComponent,
    desktopComponent: DesktopComponent,
    ...props
}) => {
    // const getIsMobile = () => window.innerWidth < mobileWidthBreakpoint;
    // const [isMobile, setIsMobile] = useState(getIsMobile());
    // const onResize = () => {
    //     setIsMobile(getIsMobile());
    // };

    // useEffect(() => {
    //     window.addEventListener('resize', onResize);
    // }, []);

    return isMobile ? (
        <MobileComponent {...props} />
    ) : (
        <DesktopComponent {...props} />
    );
    // return isMobile ? (
    //     <MobileComponent {...props} />
    // ) : (
    //     <DesktopComponent {...props} />
    // );
};

ResponsiveRender.propTypes = {
    mobileComponent: PropTypes.func.isRequired,
    desktopComponent: PropTypes.func.isRequired,
};

export default ResponsiveRender;
