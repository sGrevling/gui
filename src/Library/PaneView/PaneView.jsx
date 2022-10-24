import React from 'react';
import './PaneView.css';
import useEffectOnce from "../utils/UseEffectOnce";

let startPaneRef;

export const PaneView = ({
                             children,
                             styleOverride,
    startOnPane = 0
}) => {

    useEffectOnce(() => {
        setTimeout(() => startPaneRef && startPaneRef.scrollIntoView(), 1)
    })

    const renderPane = (content, i) =>
        <div ref={node => {
            if (startOnPane === i)
                startPaneRef = node
        }
        } key={`pane${i}`} className="grevlingPaneViewPane">{content}</div>
    return (
        <div
            className="grevlingPaneView"
            style={styleOverride}
        >
            <div className="grevlingPaneViewScrollyContent">
                {
                    Array.isArray(children) ?
                        children.map(renderPane) :
                        renderPane(children)
                }
            </div>
        </div>
    );
}