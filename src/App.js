import './App.css';
import {useState} from "react";

import badger from "./badger.jpeg";
import {CheckBox, Menu, RadioGroup, ToggleSwitch} from "./Library";
import {NumberSelect} from "./Library/NumberSelect/NumberSelect";
import {Dots} from "./Library/Dots/Dots";
import {ResetButton} from "./Library/Buttons/ResetButton";

const getColors = (key) => {
    switch (key) {
        case 'blue':
            return {
                main: '#adc3ff',
                contrast: '#001c6d'
            }
        case 'red':
            return {
                main: '#ffb9bd',
                contrast: '#680009'
            }
        default:
            return {
                main: '#d2b9ff',
                contrast: '#31008e'
            }
    }
}


function App() {
    const [color, setColor] = useState('blue');
    const [showColorSelect, setShowColorSelect] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [grevling, setGrevling] = useState(false);
    const [num, setNum] = useState(1);

    const {main, contrast} = getColors(color);

    const renderColorRadio = () => (
        <div className={`radioContainer ${showColorSelect ? '' : 'hidden'}`}>
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
        <div className={`App ${color}`}>
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
                                    color={'white'}
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
