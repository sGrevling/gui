import React, {useState, useEffect} from 'react';

export const Loader = ({
                           color = 'black',
                           size = '100',
                           slowness = 0
                       }) => {
    const getRandomStyle = (prevRotation, slower) => {
        const time = (Math.random() * 500) + 1000 + slowness + (slower ? 1000 : 0);
        const rotationChange = ((Math.random() * 150) + 50) * (Math.random() > 0.2 ? 1 : -1);
        const rotation = prevRotation + rotationChange;
        return {
            time,
            rotation,
            transform: `rotate(${rotation}, 50,  71.1)`,
            style: {
                transitionProperty: 'transform',
                transitionDuration: `${time}ms`,
                transitionTimingFunction: 'linear'
            }
        }
    }

    const [innerState, setInnerState] = useState()
    const [outerState, setOuterState] = useState(getRandomStyle(0))

    useEffect(() => {
        const boop = (func, prevRot, slower) => {
            const thing = getRandomStyle(prevRot, slower);
            func(thing);
            setTimeout(() => {
                boop(func, thing.rotation, slower)
            }, thing.time + 300)
        }
        boop(setInnerState, 0);
        boop(setOuterState, 0, true);

    }, [])

    return (
        <svg
            className={'icon'}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-2 -2 27.7 27.7"
            height={size}
            width={size}
        >
            <g transform="scale(.2) translate(10, -11)">
                <mask id="spinnyMask1">
                    <rect x="-10" y="0" width="200" height="200" fill="white"/>
                    <polygon
                        points="50 13.397, 100 100, 0 100"
                        fill="black"

                        transform={outerState.transform}
                        style={outerState.style}
                    />
                </mask>
                <circle
                    cx="50"
                    cy="71.1"
                    r="58"
                    mask="url(#spinnyMask1)"
                    fill={color}
                />
                <rect
                    height="40.8"
                    width="40.8"
                    x="29.6"
                    y="50.6"
                    fill={color}
                    transform={innerState?.transform}
                    style={innerState?.style}
                />
            </g>
        </svg>
    );
}
