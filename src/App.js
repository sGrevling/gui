import './App.css';
import {useEffect, useState} from "react";

import badger from "./badger.jpeg";
import {CheckBox, Menu, RadioGroup, ToggleSwitch, NumberSelect, Dots, ResetButton, SunMoon} from "./Library";

const colorMap = {
    blue: [
        '#adc3ff',
        '#001c6d'
    ],
    red: [
        '#ffb9bd',
        '#680009'
    ],
    pretty: [
        '#d2b9ff',
        '#31008e'
    ]
}

const getColors = (key, lm) => {
    let c = colorMap[key] ?? colorMap.pretty;
    return {
        main: c[lm ? 0 : 1],
        contrast: c[lm ? 1 : 0],
    }
}


function App() {
    const [color, setColor] = useState(localStorage.getItem('grevlingui.color') ?? 'blue');
    const [showColorSelect, setShowColorSelect] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [grevling, setGrevling] = useState(false);
    const [lightMode, setLightMode] = useState(JSON.parse(localStorage.getItem('grevlingui.lightMode')));
    const [num, setNum] = useState(1);
    const [colors, setColors] = useState({main: 'white', contrast: 'black'});

    const {main, contrast} = colors;

    useEffect(() => {
    }, [lightMode])

    useEffect(() => {
        localStorage.setItem('grevlingui.color', color)
    }, [color])

    useEffect(() => {
        setColors(getColors(color, lightMode));
    }, [lightMode, color])

    const renderColorRadio = () => (
        <div className={`radioContainer ${showColorSelect ? '' : 'hidden'}`}>
            <div
                className="sunMoonContainer"
                onClick={() => setLightMode(lm => !lm)}
            >
                <SunMoon sun={lightMode}/>
            </div>
            <br/>
            <RadioGroup
                onSelect={setColor}
                selected={color}
                color={contrast}
                options={[
                    {label: 'Red', key: 'red'},
                    {label: 'Blue', key: 'blue'},
                    {label: 'Pretty', key: 'pretty'}
                ]}
            />
        </div>
    );

    return (
        <div className={`App ${color} ${lightMode ? 'lightMode' : ''}`}>
            <div className="contentWrapper">
                <div className={`menuContainer ${showMenu ? '' : 'hidden'}`}>
                    <Menu
                        zIndex={16}
                        transitionTime={500}
                        color={main}
                        bgColor={contrast}
                    >
                        <CheckBox
                            checked={grevling}
                            setChecked={setGrevling}
                            color={main}
                            label={'Grevling'}
                        />
                    </Menu>
                </div>
                <Menu
                    zIndex={5}
                    left settings fader
                    className="settings"
                    color={main}
                    bgColor={contrast}
                    menuBgColor={main}
                >
                    <div className="menuContent">
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <ToggleSwitch
                            active={showMenu}
                            onChange={setShowMenu}
                            label={'Enable menu'}
                            color={contrast}
                        />
                        <br/>
                        <ToggleSwitch
                            active={showColorSelect}
                            onChange={setShowColorSelect}
                            label={'Enable color select'}
                            color={contrast}
                        />
                        <br/>
                        <br/>
                        {renderColorRadio()}
                    </div>
                </Menu>

                <div className="content">
                    {
                        grevling ? (
                            <img src={badger} alt="badger"/>
                        ) : (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',

                                    }}
                                >
                                    <ResetButton
                                        color={main}
                                        backgroundColor={contrast}
                                        onClick={() => setNum(1)}
                                    />
                                </div>
                                <div>
                                    <Dots
                                        version={2}
                                        num={num}
                                        size={20}
                                        color={contrast}
                                    />
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <NumberSelect
                                    color={lightMode ? 'white' : 'black'}
                                    numberBgColor={main}
                                    selectorColor={contrast}
                                    shadow
                                    value={num}
                                    setValue={setNum}
                                    max={9}
                                    size={80}
                                />
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default App;
