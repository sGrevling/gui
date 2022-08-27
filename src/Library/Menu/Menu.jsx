import React, {useState, Fragment} from 'react';
import './Menu.css';
import {MenuButton} from "../Buttons/MenuButton";
import {SettingsButton} from "../Buttons/SettingsButton";


const Menu = ({
                  children,
                  onCloseClickOverride,
                  shouldCloseOnClick,
                  transitionTime,
                  zIndex,
                  color,
                  bgColor,
                  menuBgColor,
                  backdropColor,
                  settings,
                  renderButton,
                  className,
                  fullSlider,
                  fader,
                  left
              }) => {
    const [show, setShow] = useState(false);
    const tt = transitionTime ?? 400,
        zi = zIndex ?? 2,
        c = color,
        bgc = bgColor,
        bdc = backdropColor ?? '#e3e6e850';

    console.log('menu c', c);

    let button;
    if (renderButton)
        button = renderButton(show, setShow, tt, c, bgc);
    else {
        const Button = settings ? SettingsButton : MenuButton;
        button = <Button
            className={`button ${left ? 'left' : ''}`}
            open={!!(show || onCloseClickOverride)}
            setOpen={setShow}
            transitionTime={tt * .6}
            stageDelay={tt * .1}
            c={c}
            backgroundColor={bgColor}
            styles={{
                zIndex: zi + 2,
                backgroundColor: bgc
            }}
            // rounding={2}
        />
    }

    let container;

    const style = {
        zIndex: zi + 1,
        color: c,
        backgroundColor: menuBgColor ?? bgc
    }

    if (fader)
        container = (
            <div
                className={`xburgerMenu fader ${show ? ' show' : ''} ${className}`}
                onClick={(e) => shouldCloseOnClick && shouldCloseOnClick(e) && setShow(false)}
                style={{
                    ...style,
                    transition: `opacity ${tt}ms ease-out`,
                }}
            >
                {children}
            </div>
        )
    else
        container = (
            <div
                className={`xburgerMenu slider ${fullSlider ? '' : 'partial'} ${show ? ' show' : ''} ${left ? 'left' : ''} ${className}`}
                onClick={(e) => shouldCloseOnClick && shouldCloseOnClick(e) && setShow(false)}
                style={{
                    ...style,
                    transition: `left ${tt}ms ease-out, right ${tt}ms ease-out`,
                }}
            >
                {children}
            </div>
        )

    return (
        <Fragment>
            <div
                className={`xburgerTouchOutsideSensor ${show ? ' show' : ''}`}
                onClick={() => setShow(false)}
                style={{
                    transition: `opacity ${tt}ms ease-out`,
                    zIndex: zi,
                    backgroundColor: bdc
                }}
            />
            {button}
            {container}
        </Fragment>
    );
}

export default Menu;