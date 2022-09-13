import React from 'react';
import './Dots.css';

export const Dots = ({ num }) => {

    const grids = [
        [],
        [4],
        [0, 8],
        [0, 4, 8],
        [0, 2, 6, 8],
        [0, 2, 4, 6, 8],
        [0, 2, 3, 5, 6, 8],
        [0, 2, 3, 4, 5, 6, 8],
        [0, 1, 2, 3, 5, 6, 7, 8],
        [0, 1, 2, 3, 4, 5, 6, 7, 8],

    ]

    const grid = grids[num] ?? []


    const renderDot = (i) => grid.includes(i) ? (
        <div
            key={`dot-${i}`}
            className="dot"
        />
    ) : <div key={`dot-${i}`}/>;

    return (
        <div className="dots">
            {
                [...Array(9).keys()].map(renderDot)
            }
        </div>
    );
}