import React from 'react';

export const CheckBox = ({checked, setChecked, label, color}) => (
    <div
        style={{
            display: 'inline-block'
        }}
    >
    <div
        className={`checkBox ${checked ? ' checked' : ''}`}
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            cursor: 'default'
        }}
        onClick={() => setChecked(!checked)}
    >
        <svg
            viewBox="0 0 132.29166 132.29167"
            height="35" width="35"
        >
            <path
                style={{
                    transition: 'd 250ms'
                }}
                d={
                    checked ?
                        "m 11.120115,58.317116 7.120334,6.317823 6.026283,5.413084 26.863979,23.785172 0.08968,-0.0065 73.610599,-75.912909 0.19168,-0.208115 0.23209,-0.218791 0.25933,-0.293027 1.0137,-1.034147 -0.0487,17.386797 -74.521188,89.035537 -0.04318,-0.001 -40.699193,-50.569883 z" :
                        "m 10.924959,17.515864 7.384214,-8.0947911 2.070114,7.0942151 0.0095,90.248492 89.714263,0.33483 0.54025,-90.469474 -90.263871,-0.113848 -2.070115,-7.0942151 96.390046,-0.033179 8.52678,11.0587641 -0.17363,92.233642 -9.78754,10.89971 -92.027722,-0.27385 -10.358292,-9.04231 z"
                }
                fill={color}
                className={'mainShape'}
            />
        </svg>
        <span
            style={{
                marginLeft: '10px'
            }}
        >
                {label}
            </span>
    </div>
    </div>
);