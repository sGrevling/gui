import React from 'react';
import {RadioButton} from "./RadioButton";

export const RadioGroup = ({options, selected, onSelect, color}) => (
    <div
        className="radioGroup"
    >
        {options.map((option, i) => (
            <div
                key={i}
            >
                <div
                    onClick={() => onSelect(option.key)}
                    style={{
                        display: 'inline-block'
                    }}
                >
                    <RadioButton
                        active={option.key === selected}
                        text={option.label}
                        color={color}
                    />
                </div>
            </div>
        ))}
    </div>
);