import React from 'react';
import './Loader.css';

export const Loader = ({
                           color = 'black',
                           size = '10rem',
                           // size = 'min(80vw, 80vh)',

                           speed = 5000,
                       }) => {
    const spin = (cc) => ({
        WebkitAnimation: `spin${cc?'CC':''} ${speed}ms linear infinite`,
        MozAnimation: `spin${cc?'CC':''} ${speed}ms linear infinite`,
        animation: `spin${cc?'CC':''} ${speed}ms linear infinite`,
    })
    return (
        <svg
            className="grevloadinger"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-8.5 12.5 117 117"
            height={size}
            width={size}
            style={spin()}
        >
                <mask id="spinnyMask1">
                    <rect x="-10" y="0" width="200" height="200" fill="white"/>
                    <polygon points="50 13.397, 100 100, 0 100" fill="black"/>
                </mask>
                <circle
                    cx="50"
                    cy="71.1"
                    r="58"
                    mask="url(#spinnyMask1)"
                    fill={color}
                />
            <g transform="rotate(45 50 71)">
                <rect
                    height="40.8"
                    width="40.8"
                    x="29.6"
                    y="50.6"
                    fill={color}
                    style={{
                        transformOrigin: '50px 71px',
                        ...spin(true)
                    }}
                />
            </g>
        </svg>
    );
}
