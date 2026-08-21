// src/components/PatternBackground.js
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Standard Create React App component imports
import { ReactComponent as AviorShelter } from '../Assets/Header/symbol-avior-shelter.svg';
import { ReactComponent as NoiraMirror } from '../Assets/Header/symbol-noira-mirror.svg';
import { ReactComponent as TharosBeacon } from '../Assets/Header/symbol-tharos-beacon.svg';

export const PatternBackground = ({ children }) => {
    // 1. Render the React SVG components into a single pattern structure
    const rawPatternMarkup = renderToStaticMarkup(
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
            <g fill="var(--pattern-icon-color)">
                <g transform="translate(10, 10) scale(0.8)">
                    <AviorShelter />
                </g>
                <g transform="translate(60, 15) scale(0.8)">
                    <NoiraMirror />
                </g>
                <g transform="translate(35, 60) scale(0.8)">
                    <TharosBeacon />
                </g>
            </g>
        </svg>
    );

    // 2. Encode markup to Data URI for CSS background-image compatibility
    const encodedPattern = encodeURIComponent(rawPatternMarkup)
        .replace(/'/g, '%27')
        .replace(/"/g, '%22');

    const backgroundDataUrl = `url("data:image/svg+xml,${encodedPattern}")`;

    return (
        <div
            className='pattern-background'
            style={{
                width: '100%',
                minHeight: '100vh',
                backgroundImage: backgroundDataUrl,
                backgroundRepeat: 'repeat',
                backgroundColor: 'var(--secondary-bg)',
                transition: 'background-color 0.3s ease',
            }}
        >
            {children}
        </div>
    );
};