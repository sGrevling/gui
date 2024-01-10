import React, {useEffect, useState} from 'react';
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
                                 timeout = 1000,
                                 onOpenInput,
                                 closed,
                                 invert = false
                             }) => {
    const [editing, setEditing] = useState(false);
    const [doneClosing, setDoneClosing] = useState(true);
    const [closeTimeout, setCloseTimeout] = useState();
    const [doneClosingTimeout, setDoneClosingTimeout] = useState();

    useEffect(() => {
        if (closed)
            close();
    }, [closed])

    const close = () => {
        clearTimeout(closeTimeout)
        setEditing(false);
        setCloseTimeout(undefined);
        startDoneClosingTimeout();
    }

    const startCloseTimeout = () => {
        if (!timeout) return;
            clearTimeout(closeTimeout)
        setCloseTimeout(
            setTimeout(close, timeout)
        )
    }

    const startDoneClosingTimeout = () => {
        clearTimeout(doneClosingTimeout);
        setDoneClosingTimeout(
            setTimeout(() => {
                setDoneClosing(true);
                setDoneClosingTimeout(undefined);
            }, 200)
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
        top: editing ? incrementorVerticalOffset : 0
    }

    const subtractStyle = {
        ...incrementorStyle,
        bottom: editing ? incrementorVerticalOffset : 0
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
        startCloseTimeout();
        const nv = change + value;
        if (nv > max || nv < min) return;
        setValue(nv);
    }

    const renderInputs = () => (
        <div className={`numberSelect_input ${editing ? '' : 'numberSelect_input-hidden'}`}>
            <div
                className={'numberSelect_increment numberSelect_add'}
                style={addStyle}
                onClick={increment(invert ? -1 : 1)}
            >
                {icon(true)}
            </div>
            <div className="numberSelect_blur" style={blurStyle}/>
            <div
                className="numberSelect_increment numberSelect_subtract"
                style={subtractStyle}
                onClick={increment(invert ? 1 : -1)}
            >
                {icon()}
            </div>
        </div>
    )

    return (
        <div className={`numberSelect ${
            editing ? 'numberSelect_editing' : ''
        } ${
            doneClosing ? 'numberSelect_doneClosing' : ''
        }`}>
            <div
                className="numberSelect_value"
                onClick={() => {
                    if (!editing){
                        startCloseTimeout();
                        onOpenInput?.();
                        setDoneClosing(false);
                        setEditing(true);
                    } else {
                        close();
                    }
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