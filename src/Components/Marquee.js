import React from 'react';
import '../styles/components/Marquee.css';

const Marquee = ({ announcements }) => {
    const renderItems = (isDuplicate = false) => {
        return announcements.map((item, index) => (
            <React.Fragment key={`${index}-${isDuplicate ? 'dup' : 'orig'}`}>
                <span
                    className="marquee-item-text"
                    style={{ color: item.color || 'inherit' }}
                >
                    {item.text}
                </span>
                <span className="marquee-separator">•</span>
            </React.Fragment>
        ));
    };

    return (
        <div className="marquee-container">
            <div className="marquee-track">
                <div className="marquee-group">
                    {renderItems(false)}
                </div>
                <div className="marquee-group" aria-hidden="true">
                    {renderItems(true)}
                </div>
            </div>
        </div>
    );
};

export default Marquee;