import VirtualScroll from 'virtual-scroll';

export const onScroll = (onStart, onEnd) => {
    let isScrolling = false;
    let hasScrollEnded;
    const vScroll = new VirtualScroll();

    const onScrollEnd = () => {
        if (onEnd) onEnd();
        isScrolling = false;
    };

    vScroll.on(() => {
        if (!isScrolling) {
            if (onStart) onStart();
            isScrolling = true;
        }

        clearTimeout(hasScrollEnded);
        hasScrollEnded = setTimeout(onScrollEnd, 66);
    });
};

export const copyStringToClipboard = string => {
    const el = document.createElement('textarea');
    el.value = string;
    el.setAttribute('readonly', '');
    el.style = {
        position: 'absolute',
        left: '-9999px',
        opacity: 0,
        'z-index': -9999,
    };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
