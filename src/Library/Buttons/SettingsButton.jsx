import React, {useState} from 'react';
import './Buttons.css'

export const SettingsButton = ({
                                   open,
                                   setOpen,
                                   transitionTime = 300,
                                   stageDelay = 100,
                                   color = 'white',
                                   backgroundColor,
                                   styles,
                                   className,
                                   rounding = 7
                               }) => {
    const [randomId] = useState(Math.random());
    const rArray = open ? [0, 0] : [20, 35];
    const getRekt = (deg, animate) => (
        <rect
            style={{
                transitionProperty: 'x, width',
                transitionDuration: `${transitionTime}ms, ${transitionTime}ms`,
                transitionDelay: open ? '' : `${stageDelay}ms, ${stageDelay}ms`,
            }}
            x={animate && open ? 40 : 0}
            y="41"
            height="18"
            fill={color}
            width={animate && open ? 20 : 100}
            transform={`rotate(${deg} 50 50)`}
            rx={rounding}
        />
    )
    const getCircle = (r, c) => (
        <circle
            style={{
                transitionProperty: 'r',
                transitionDuration: `${transitionTime}ms`,
                transitionDelay: open ? `${stageDelay}ms` : ''
            }}
            fill={c ?? 'black'}
            cx="50" cy="50" r={r}
        />
    )
    return (
        <button
            className={`settingsButton styleOverride ${className}`}
            onClick={() => {
                setOpen(!open)
            }}
            style={{
                ...styles,
                backgroundColor
            }}
        >
            <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <mask id={`gearMask${randomId}`}>
                    <rect x="0" y="0" height="100" width="100" fill="white"/>
                    {getCircle(rArray[0])}
                </mask>
                <g mask={`url(#gearMask${randomId})`} id="settingsButtonShapes">
                    {getRekt(0, true)}
                    {getRekt(45)}
                    {getRekt(90, true)}
                    {getRekt(135)}
                    {getCircle(rArray[1], color)}
                </g>
            </svg>

        </button>
    )
}