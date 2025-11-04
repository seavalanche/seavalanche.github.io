import React, { useState } from 'react';
import socialLinks from '../data/socialLinks.json';
import '../css/main.css'
import '../css/LandingExtLinks.css'

export default function LandingExtLinks() {
  const [open, setOpen] = useState(false);

  return (
    <div className="landing-extlinks">
      <button className="toggle-btn" onClick={() => setOpen(!open)}>
        {open ? 'Hide Links' : 'Show Links'}
      </button>

      {open && (
        <div className="links-grid">
          {socialLinks.map((link, i) => (
            <div key={i} className={`link-item ${link.status}`}>
              {link.url ? (
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              ) : (
                <span>{link.name}</span>
              )}
              <span className={`status ${link.status}`}>{link.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
