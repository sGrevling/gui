import React from 'react';

export const RadioButton = ({active, text, className, color}) => {
    const renderCircle = (r, className, mask, fill) => (
        <circle
            style={{transition: `r 300ms`}}
            cx="67"
            cy="67"
            r={r}
            fill={fill}
            className={className}
            mask={mask}
        />
    )
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                cursor: 'default'
            }}
            className={`radioButton ${active ? ' active' : ''}`}
        >
            <svg
                className={`${className || ''}`}
                viewBox="0 0 132.29 132.29"
                height="35" width="35"
            >
                <mask id="mask">
                    <rect x="0" y="0" width="200" height="200" fill="white"/>
                    {renderCircle(55, 'black', undefined, '#000')}
                </mask>
                {renderCircle(65, 'mainShape', 'url(#mask)', color)}
                {renderCircle(active ? 40 : 0, 'mainShape', undefined, color)}
            </svg>
            <span style={{marginLeft: '10px', color}}>
                {text}
            </span>
        </div>
    );
}