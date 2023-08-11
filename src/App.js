import './App.css';
import {useEffect, useState} from "react";

import badger from "./badger.jpeg";
import {CheckBox, Menu, RadioGroup, ToggleSwitch, NumberSelect, Dots, ResetButton, SunMoon} from "./Library";
import {PaneView} from "./Library";
import {Loader} from "./Library/Loader/Loader";

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

    const renderContent = content =>
        <div className="content">{content}</div>

    const renderDominos = () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
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
            <br/>
            <br/>
            <NumberSelect
                shadow
                value={num}
                setValue={setNum}
                max={9}
            />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <ResetButton
                color={main}
                backgroundColor={contrast}
                onClick={() => setNum(1)}
            />
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )

    const panes = [renderContent(<Loader color={contrast}/>), renderContent(renderDominos())];
    if (grevling)
    panes.push(renderContent(
        <div className="badgerFrame">
            <img src={badger} alt="badger"/>
        </div>
    ));

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
                <PaneView>
                    {panes}
                </PaneView>

            </div>
        </div>
    );
}

export default App;
