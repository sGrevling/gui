import {useState} from "react";


export const MenuButton = ({
                               open,
                               setOpen,
                               transitionTime,
                               c,
                               backgroundColor,
                               stageDelay,
                               styles,
                               className
                           }) => {
    const [flip, setFlip] = useState(false);

    const renderPath = ([d1, d2], center) => (
        <path
            style={{
                transitionProperty: 'd',
                transitionDuration: `${transitionTime}ms`,
                transitionDelay: (open && center) || !(open || center) ? '' : `${stageDelay}ms`,
            }}
            d={open ? d2 : d1}
            fill={c}
            className={'mainShape'}
        />
    )

    const icon = (
        <svg
            className="xburgerButton"
            viewBox="0 0 132.29166 132.29167"
            height="30" width="30"
        >
            {renderPath(flip ?
                [
                    "m 3.3906325,100.69908 125.3180175,0.008 -0.001,18.59162 -125.3180167,-0.008 z",
                    "M 28.846694,14.020461 117.45992,106.30873 104.83715,119.455 16.223931,27.166726 Z"
                ] : [
                    "m 4.0263095,14.267981 125.3180305,-0.01822 0.003,18.591625 -125.3180367,0.01823 z",
                    "M 16.175122,106.15278 104.78835,13.864516 117.41112,27.010786 28.79789,119.29905 Z"

                ], false)}
            {renderPath(
                ["M 3.4245129,57.752314 H 128.74254 V 76.343939 H 3.4245129 Z",
                    "M 67.752314,57.752314 H 67.752314 V 76.343939 H 67.752314 Z"],
                true
            )}
            {renderPath(flip ?
                [
                    "m 4.0263095,14.267981 125.3180305,-0.01822 0.003,18.591625 -125.3180367,0.01823 z",
                    "M 16.175122,106.15278 104.78835,13.864516 117.41112,27.010786 28.79789,119.29905 Z"
                ] : [
                    "m 3.3906325,100.69908 125.3180175,0.008 -0.001,18.59162 -125.3180167,-0.008 z",
                    "M 28.846694,14.020461 117.45992,106.30873 104.83715,119.455 16.223931,27.166726 Z"
                ], false)}
        </svg>
    );

    return (
        <>
            <div className="thingy">
                {flip}
            </div>
            <button
                className={`xburgerMenuButton styleOverride ${className}`}
                onClick={() => {
                    if (open) setFlip(f => !f);
                    setOpen(!open)
                }}
                style={{
                    ...styles,
                    backgroundColor
                }}
            >
                {icon}
            </button>
        </>
    )
}
