import React, {useState, Fragment} from 'react';
import './Menu.css';
import {MenuButton} from "../Buttons/MenuButton";
import {SettingsButton} from "../Buttons/SettingsButton";


export const Menu = ({
                  children,
                  onCloseClickOverride,
                  shouldCloseOnClick,
                  transitionTime = 300,
                  zIndex = 2,
                  color,
                  bgColor,
                  menuBgColor,
                  backdropColor = '#e3e6e850',
                  settings,
                  renderButton,
                  className,
                  fullSlider,
                  fader,
                  left
              }) => {
    const [show, setShow] = useState(false);

    let button;
    if (renderButton)
        button = renderButton(show, setShow, transitionTime, color, bgColor);
    else {
        const Button = settings ? SettingsButton : MenuButton;
        button = <Button
            className={`button ${left ? 'left' : ''}`}
            open={!!(show || onCloseClickOverride)}
            setOpen={setShow}
            transitionTime={transitionTime * .6}
            stageDelay={transitionTime * .1}
            color={color}
            backgroundColor={bgColor}
            styles={{
                zIndex: zIndex + 2,
                backgroundColor: bgColor
            }}
            // rounding={2}
        />
    }

    let container;

    const style = {
        zIndex: zIndex + 1,
        color,
        backgroundColor: menuBgColor ?? bgColor
    }

    if (fader)
        container = (
            <div
                className={`xburgerMenu fader ${show ? ' show' : ''} ${className}`}
                onClick={(e) => shouldCloseOnClick && shouldCloseOnClick(e) && setShow(false)}
                style={{
                    ...style,
                    transition: `opacity ${transitionTime}ms ease-out`,
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
                    transition: `left ${transitionTime}ms ease-out, right ${transitionTime}ms ease-out`,
                }}
            >
                {children}
            </div>
        )

    return (
        <Fragment>
            {
                !fullSlider && !fader && (
                <div
                    className={`xburgerTouchOutsideSensor ${show ? ' show' : ''}`}
                    onClick={() => setShow(false)}
                    style={{
                        transition: `opacity ${transitionTime}ms ease-out`,
                        zIndex,
                        backgroundColor: backdropColor
                    }}
                />
                )
            }
            {button}
            {container}
        </Fragment>
    );
}