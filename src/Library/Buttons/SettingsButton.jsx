import React from 'react';
import './Buttons.css'

export const SettingsButton = ({
                                   open,
                                   setOpen,
                                   transitionTime = 300,
                                   c,
                                   backgroundColor,
                                   stageDelay,
                                   styles,
                                   className,
                                   rounding = 7
                               }) => {
    const rArray = open ? [0, 0] : [20, 35]
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
            fill={c ?? 'white'}
            width={animate && open ? 20 : 100}
            transform={`rotate(${deg} 50 50)`}
            rx={rounding}
        />
    )
    const getCircle = (r, color) => (
        <circle
            style={{
                transitionProperty: 'r',
                transitionDuration: `${transitionTime}ms`,
                transitionDelay: open ? `${stageDelay}ms` : ''
            }}
            fill={color ?? 'black'}
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
                <mask id="gearMask">
                    <rect x="0" y="0" height="100" width="100" fill="white"/>
                    {getCircle(rArray[0])}
                </mask>
                <g mask="url(#gearMask)" id="settingsButtonShapes">
                    {getRekt(0, true)}
                    {getRekt(45)}
                    {getRekt(90, true)}
                    {getRekt(135)}
                    {getCircle(rArray[1], c ?? 'white')}
                </g>
            </svg>

        </button>
    )
}