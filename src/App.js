import './App.css';
import {useState} from "react";
import {RadioGroup} from "./Library/Radio/RadioGroup";
import {CheckBox} from "./Library/CheckBox";
import {ToggleSwitch} from "./Library/ToggleSwitch";
import Menu from "./Library/Menu/Menu";
import badger from "./badger.jpeg";

const getColors = (key) => {
    switch(key) {
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
                contrast: '#31008'
            }
    }
}


function App() {
    const [color, setColor] = useState('blue');
    const [showColorSelect, setShowColorSelect] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [grevling, setGrevling] = useState(false);

    const { main, contrast } = getColors(color);

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
                            <h1>Gui elements</h1>
                        )
                    }
            </div>
        </div>
        </div>
    );
}

export default App;
