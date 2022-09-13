import React, {useState} from 'react';
import './NumberSelect.css';
import useEffectPartialDeps from "../utils/UseEffectPartialDeps";

const scrollRef = React.createRef();
const refs = [];

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
                                top  = -16
                            }) => {
    const [showInput, setShowInput] = useState(false);

    const options = [...Array(Math.max((max - min) + 1, 1)).keys()].map(v => v + min);

    const getExactValue = () => scrollRef.current.scrollLeft / (size) + min;

    useEffectPartialDeps(() => {
        if (!showInput) return;
        const ref = refs[value + 2 - min];
        if (!ref) return;
        ref.scrollIntoView();
    }, [showInput])

    if (max - min === 0) return <></>;

    const optionStyle = {
        width: `${size}px`,
        height: `${size -1}px`,
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


    const renderModal = () => {
        if (!showInput) return <></>;
        const optionsWidth = (options.length + 2) * size;
        return (
            <>
                {showInput && <div
                    className="clickOutsideDetector"
                    onClick={() => {
                        setShowInput(false)
                    }}
                />}
                <div
                    className={`inputModal ${showInput ? '' : 'hidden'} ${shadow ? 'shadow' : ''}`}
                    style={{
                        backgroundColor: selectorColor,
                        top: `${top + (thin ? 8 : 0)}px`
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
                        ref={scrollRef}
                        style={{width: `${size * 3}px`}}
                        onScroll={() => {
                            const centerNumber = Math.round(getExactValue());
                            if (value !== centerNumber) setValue(centerNumber);
                        }}
                        // onTouchEnd={onScrollEnd}
                    >
                        <div
                            className="options"
                            style={{width: `${optionsWidth}px`}}
                        >
                            <div
                                className="option" style={optionStyle}
                                ref={node => refs[0] = node}
                            />
                            {options.map((n, i) => (
                                    <div
                                        style={{
                                            ...optionStyle,
                                            backgroundColor: value === n ? numberBgColor : ''
                                        }}
                                        key={n}
                                        ref={node => refs[i + 1] = node}
                                        className={'option'}
                                    >
                                        {n}
                                    </div>
                                )
                            )}
                            <div
                                className="option"
                                style={optionStyle}
                                ref={node => refs[options.length + 1] = node}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div
            className="numberSelect"
            style={{
                ...optionStyle,
                color,
                backgroundColor: numberBgColor
        }}
            onClick={(e) => {
                if (e.target.classList[0] === 'clickOutsideDetector') return;
                setShowInput(true)
            }}
        >
            {value}
            {renderModal()}
        </div>
    );
}