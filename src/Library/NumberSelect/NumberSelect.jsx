import React, {useState} from 'react';
import './NumberSelect.css';

export const NumberSelect = ({
                                 value,
                                 setValue,
                                 min = 1,
                                 max = 10,
                                 size = 5,
                                 color = 'white',
                                 numberBgColor = '#663399',
                                 selectorColor = '#1E90FF',
                                 timeout = 1000
                             }) => {
    const [editing, setEditing] = useState(false);
    const [closeTimeout, setCloseTimeout] = useState();

    const startTimeout = () => {
        if (!timeout) return;
        clearTimeout(closeTimeout)
        setCloseTimeout(
            setTimeout(() => {
            setEditing(false);
            setCloseTimeout(undefined);
        }, timeout)
        )
    }

    const fullSize = `${size}rem`;
    const incrementorSize = `${size * .8}rem`;
    const incrementorVerticalOffset= `-${size * .9}rem`;
    const incrementorHorizontalOffset= `${size * .1}rem`;
    const minusHalfSize = `-${size /  3}rem`;

    const incrementorStyle = {
        height: incrementorSize,
        width: incrementorSize,
        backgroundColor: selectorColor,
        right: incrementorHorizontalOffset,
        bottom: incrementorHorizontalOffset
    }

    const addStyle = {
        ...incrementorStyle,
        top: incrementorVerticalOffset
    }

    const subtractStyle = {
        ...incrementorStyle,
        bottom: incrementorVerticalOffset
    }


    const blurStyle = {
        background: `radial-gradient(${numberBgColor}FF, ${numberBgColor}00, ${numberBgColor}00)`,
        left: minusHalfSize,
        right: minusHalfSize,
        top: incrementorVerticalOffset,
        bottom: incrementorVerticalOffset,
    }

    const icon = (up) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill={color}
        >
            {up ?
                <path d="m283-345-43-43 240-240 240 239-43 43-197-197-197 198Z"/> :
                <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/>}
        </svg>
    )

    const increment = (change) => () => {
        startTimeout();
        const nv = change + value;
        if (nv > max || nv < min) return;
        setValue(nv);
    }

    const renderInputs = () => (
        <div className={`numberSelect_input ${editing ? '' : 'numberSelect_input-hidden'}`}>
            <div
                className={`numberSelect_increment numberSelect_add ${editing ? 'numberSelect_editing' : ''}`}
                style={addStyle}
                onClick={increment(1)}
            >
                {icon(true)}
            </div>
            <div className="numberSelect_blur" style={blurStyle}/>
            <div
                className="numberSelect_increment numberSelect_subtract"
                style={subtractStyle}
                onClick={increment(-1)}
            >
                {icon()}
            </div>
        </div>
    )

    return (
        <div className="numberSelect">

            <div
                className="numberSelect_value"
                onClick={() => {
                    if (!editing)
                        startTimeout();
                    setEditing(!editing)
                }}
                style={{
                    height: fullSize,
                    width: fullSize,
                    color,
                    backgroundColor: numberBgColor,
                    fontSize: `${size / 2}rem`
                }}
            >
                {value}
            </div>
            {renderInputs()}
        </div>
    );
}