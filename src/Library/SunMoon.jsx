import React from 'react';


export const SunMoon = ({
                            sun,
                            color = 'white',
                            tt = 300,
                            size = 32,
                            onClick
                        }) => {
    const transition = (keys) => keys.map(key => `${key} ${tt}ms linear`).join(', ');
    const path = (d) => (<path d={d} fill={color} style={{transition: transition(['d', 'fill'])}}/>);
    const circle = (cx, cy, r, fill) => (<circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        style={{transition: transition(['r', 'cy', 'cx', 'fill'])}}
    />);

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            style={{transition: `fill ${tt}ms linear`}}
            onClick={onClick}
        >
            <mask id="moonMask">
                <rect height="10000" width="10000" fill="white"/>
                {sun ?
                    circle("91", "43", "0", "black") :
                    circle("73", "53", "35", "black")
                }
            </mask>
            <g mask="url(#moonMask)">
                {
                    sun ? (
                        <>
                            {path("M60 2L68 18H52L60 2Z")}
                            {path("M60 118L52 102L68 102L60 118Z")}
                            {path("M89 9.77053L87.9282 27.6269L74.0718 19.6269L89 9.77053Z")}
                            {path("M31 110.229L32.0718 92.3731L45.9282 100.373L31 110.229Z")}
                            {path("M110.229 31L100.373 45.9282L92.3731 32.0718L110.229 31Z")}
                            {path("M9.77053 89L19.6269 74.0718L27.6269 87.9282L9.77053 89Z")}
                            {path("M118 60L102 68L102 52L118 60Z")}
                            {path("M2 60L18 52L18 68L2 60Z")}
                            {path("M110.229 89L92.3731 87.9282L100.373 74.0718L110.229 89Z")}
                            {path("M9.77052 31L27.6269 32.0718L19.6269 45.9282L9.77052 31Z")}
                            {path("M89 110.229L74.0718 100.373L87.9282 92.3731L89 110.229Z")}
                            {path("M31 9.77053L45.9282 19.6269L32.0718 27.6269L31 9.77053Z")}
                            {circle("60", "60", "35", color)}
                        </>
                    ) : (
                        <>
                            {path("M60 15L68 31H52L60 15Z")}
                            {path("M60 105L52 89L68 89L60 105Z")}
                            {path("M82.5 21.0289L81.4282 38.8853L67.5718 30.8853L82.5 21.0289Z")}
                            {path("M37.5 98.9711L38.5718 81.1147L52.4282 89.1147L37.5 98.9711Z")}
                            {path("M98.9712 37.5L89.1148 52.4282L81.1148 38.5718L98.9712 37.5Z")}
                            {path("M21.0289 82.5L30.8853 67.5718L38.8853 81.4282L21.0289 82.5Z")}
                            {path("M105 60L89 68L89 52L105 60Z")}
                            {path("M15 60L31 52L31 68L15 60Z")}
                            {path("M98.9711 82.5L81.1147 81.4282L89.1147 67.5718L98.9711 82.5Z")}
                            {path("M21.0288 37.5L38.8852 38.5718L30.8852 52.4282L21.0288 37.5Z")}
                            {path("M82.5 98.9711L67.5718 89.1147L81.4282 81.1147L82.5 98.9711Z")}
                            {path("M37.5 21.0289L52.4282 30.8853L38.5718 38.8853L37.5 21.0289Z")}
                            {circle("60", "60", "45", color)}
                        </>
                    )
                }
            </g>
            {/*{circle("60", "60", "15", 'red')}*/}
            {/*{circle("60", "60", "2", 'white')}*/}
            {/*{circle("91", "43", "2", "white")}*/}
            {/*{circle("73", "53", "2", "white")}*/}
        </svg>
    );
};