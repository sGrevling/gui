import React from 'react';

export const ToggleSwitch = ({
                                 active,
                                 onChange,
                                 label,
                                 transitionTime,
                                 easing,
    color
                             }) => {


    const tt = transitionTime || 100,
        e = easing || 'ease-out';

    return (
        <div
            style={{
                display: 'inline-block'
            }}
        >
            <div
                className={`toggleSwitch ${active ? 'active' : ''}`}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    cursor: 'default'
                }}
                onClick={() => onChange(!active)}
            >
                <svg
                    viewBox="0 0 132.29166 132.29167"
                    height="55" width="55"
                    // height="35" width="35"
                >
                    <path
                        d="m 38.052687,47.864419 h 54.916086 c 27.034327,2.305319 25.559797,39.054731 0,40.30747 H 38.075448 C 10.11119,87.499017 11.297192,48.014766 38.052687,47.864419 Z"
                        className={'track'}
                    />
                    <circle
                        className={`toggleSwitch ${active ? 'active' : ''}`}
                        fill={active ? 'dodgerblue' : 'grey'}
                        cx={active ? 94.778557 : 35.651833}
                        cy="68.430901"
                        r="34"
                        style={{
                            transition: `cx ${tt}ms ${e}, fill ${tt}ms ${e}`
                        }}
                    />
                </svg>
                <span
                    style={{
                        marginLeft: '10px',
                        color
                    }}
                >
                {label}
            </span>
            </div>
        </div>
    );
}