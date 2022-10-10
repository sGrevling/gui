import React, {useLayoutEffect, useState} from 'react';
import './NumberSelect.css';
import useEffectPartialDeps from "../utils/UseEffectPartialDeps";

const cosmos = {};

export const NumberSelect = ({
                                 value,
                                 setValue,
                                 flip,
                                 thin,
                                 min = 1,
                                 max = 10,
                                 shadow,
                                 size = 40,
                                 color = 'white',
                                 numberBgColor = '#663399FF',
                                 selectorColor = '#1E90FFFF',
                                 pointerColor = '#6c9fff',
                                 pointerShadowColor = '#33333390',
                                 top = -16
                             }) => {
    const [id] = useState(`id-${Math.random()}`);
    const [rendered, setRendered] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [hidden, setHidden] = useState(false);

    const [timeout1, setTimeout1] = useState(0);
    const [timeout2, setTimeout2] = useState(0);

    const options = [...Array(Math.max((max - min) + 1, 1)).keys()].map(v => v + min);

    let cosmoState = cosmos[id] ;

    useLayoutEffect(() => {
        cosmoState = cosmos[id] = {
            refs: []
        }
        setRendered(true);
    }, [])

    useEffectPartialDeps(() => {
        clearTimeout(timeout1);
        if (showInput)
            setHidden(false);
        else
            setTimeout1(setTimeout(() => setHidden(true), 320))
    }, [showInput])

    useEffectPartialDeps(() => {
        if (!rendered) return;
        const ref = cosmoState.refs[value + 2 - min];
        if (!ref) return;
        ref.scrollIntoView();
    }, [rendered])

    if (!cosmoState) return <div/>

    const getExactValue = () => cosmoState.scrollRef.scrollLeft / (size) + min;

    if (max - min === 0) return <></>;

    const optionStyle = {
        width: `${size}px`,
        height: `${size - 1}px`,
        fontSize: `${size * .6}px`,
        borderRadius: `${size}px`,
        paddingBottom: '1px'
    };

    const renderFade = (side, direction) => (
        <div
            className={`fade ${side}`}
            style={{
                width: `${size * .8}px`,
                backgroundImage: `linear-gradient(to ${direction}, ${selectorColor}, ${selectorColor} , #00000000)`
            }}
        />
    )

    const pointerContainerStyle = flip ? {
        bottom: `-${size * .4}px`,
        transform: 'rotate(180deg)'
    } : {
        top: `-${size / 2}px`,
    }


    const renderModal = () => (
        <div
            className={`inputModal ${showInput ? '' : 'hidden'} ${shadow ? 'shadow' : ''}`}
            style={{
                backgroundColor: selectorColor,
                top: `${top + (thin ? 8 : 0)}px`
            }}
            onTouchStart={() => {
                clearTimeout(timeout2);
                setShowInput(true);
            }}
            onTouchEnd={() => {
                clearTimeout(timeout2);
                setTimeout2(setTimeout(() => setShowInput(false), 800))

            }}
        >
            {renderFade('left', 'right')}
            {renderFade('right', 'left')}
            <div
                className="pointerContainer"
                style={pointerContainerStyle}
            >
                <div
                    className="pointerShadow"
                    style={{
                        backgroundColor: pointerShadowColor,
                        width: `${size / 2}px`,
                        height: `${size * 0.8}px`,
                        marginTop: `${size / 7}px`,
                    }}
                />
            </div>
            <div
                className="pointerContainer"
                style={pointerContainerStyle}
            >
                <div
                    className="pointer"
                    style={{
                        backgroundColor: pointerColor,
                        width: `${size / 2}px`,
                        height: `${size * 0.8}px`
                    }}
                />
            </div>
            <div
                className={`scrollSelector ${thin ? 'thin' : ''}`}
                ref={node => cosmoState.scrollRef = node}
                style={{width: `${size * 3}px`}}
                onScroll={() => {
                    const centerNumber = Math.round(getExactValue());
                    if (value !== centerNumber) setValue(centerNumber);
                }}
            >
                <div
                    className="options"
                    style={{width: `${(options.length + 2) * size}px`}}
                >
                    <div
                        className="option" style={optionStyle}
                        ref={node => cosmoState.refs[0] = node}
                    />
                    {options.map((n, i) => (
                            <div
                                style={{
                                    ...optionStyle,
                                    backgroundColor: value === n ? numberBgColor : ''
                                }}
                                key={n}
                                ref={node => cosmoState.refs[i + 1] = node}
                                className={'option'}
                            >
                                {n}
                            </div>
                        )
                    )}
                    <div
                        className="option"
                        style={optionStyle}
                        ref={node => cosmoState.refs[options.length + 1] = node}
                    />
                </div>
            </div>
        </div>
    )

    return (
        <div className={`numberSelectWrapper  ${hidden ? 'hidden' : ''}`}>
            <div
                className="numberSelect"
                style={{
                    ...optionStyle,
                    color,
                    backgroundColor: numberBgColor
                }}
            >
                {value}
                {renderModal()}
            </div>
        </div>
    );
}