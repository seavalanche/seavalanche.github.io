import './css/main.css';
import './Theme.css';
import './Layout.css';
import './css/themebtn.css';
import './Components/NewsSection'
import './Components/LandingExtLinks'
import React, { useState } from "react";
import NewsSection from './Components/NewsSection';
import LandingExtLinks from './Components/LandingExtLinks';

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save the selected theme
  };

  const charicons1 = [
    "PFP_MythSeavalanche.png",
    "PFP_Seavalanche.png",
    "PFP_Seava.png",
    "PFP_Vesnea.png",
    "PFP_Korazu.png",
    "PFP_Uzakon.png",
    "PFP_Zumiko.png",
  ];
  const charicons2 = [
    "PFP_Tharos_glow.png",
    "PFP_Noira_glow.png",
    "PFP_Zeo_glow.png",
    "PFP_placeholder.png",
  ];
  const charicons3 = [
    "PFP_Arna.png",
    "PFP_Arnamini.png",
    "PFP_Baldor.png",
    "PFP_Rakariki.png",
    "PFP_Veranite.png",
    "PFP_Fondan.png",
    "PFP_Sarchie.png",
    "PFP_Deimev.png",
  ];

  return (
    <div className='landing-container' theme={theme} toggleTheme={toggleTheme}>
      <div className='landing-card header'>
        <div className='landing-profile'>
          <div className='landing-pfp' />
          <div className='landing-name'>Seavalanche</div>
          <div className='landing-bio'>Call me Vesnea! - She/Her</div>
          <div className='landing-socials'>
            <a className='social-links home' href='https://seavalanche.github.io/projectseaweb' target='_blank' rel="noreferrer">
              <div className='social-linkicon home'></div>
              <div className='social-linkname'>Seavalanche's Website</div>
            </a>
            <a className='social-links kofi' href='https://ko-fi.com/seavalanche' target='_blank' rel="noreferrer">
              <div className='social-linkicon kofi'></div>
              <div className='social-linkname'>Seavalanche's Ko-fi</div>
            </a>
            <a className='social-links bsky' href='https://bsky.app/profile/seavalanche.bsky.social' target='_blank' rel="noreferrer">
              <div className='social-linkicon bsky'></div>
              <div className='social-linkname'>Seavalanche's Bluesky</div>
            </a>
          </div>
          <LandingExtLinks />
        </div>
        <div className='landing-theme-selection'>
          <button className="landing-theme-button landingbtn1" onClick={() => toggleTheme("light")} aria-label="Switch Theme" />
          <button className="landing-theme-button landingbtn3" onClick={() => toggleTheme("dark")} aria-label="Switch Theme" />
          <button className="landing-theme-button landingbtn2" onClick={() => toggleTheme("star")} aria-label="Switch Theme" />
        </div>
      </div>
      <a className='landing-card charicons' href='https://seavalanche.github.io/projectseaweb/#/CharInfo' target='_blank' rel="noreferrer">
        <div className='charicons-title'>Seavalanche Characters</div>
        <div className='charicons-wrapper mainchar'>
          {charicons1.map((icon, i) => {
            const name = icon
              .replace(/\.[^/.]+$/, "")  // remove extension
              .replace(/^PFP_/, "")      // remove "PFP_" prefix
              .replace(/_/g, " ");       // underscores → spaces
            const altText = `This is ${name}`;
            return (
              <img
                key={i}
                src={`/Assets/charcardPFP/${icon}`}
                alt={altText}
                title={altText}
                className="charicon"
              />
            );
          })}
        </div>
        <div className='charicons-wrapper deuterachar'>
          {charicons2.map((icon, i) => {
            const name = icon
              .replace(/\.[^/.]+$/, "")  // remove extension
              .replace(/^PFP_/, "")      // remove "PFP_" prefix
              .replace(/_/g, " ");       // underscores → spaces
            const altText = `This is ${name}`;
            return (
              <img
                key={i}
                src={`/Assets/charcardPFP/${icon}`}
                alt={altText}
                title={altText}
                className="charicon"
              />
            );
          })}
        </div>
        <div className='charicons-wrapper psyvillainchar'>
          {charicons3.map((icon, i) => {
            const name = icon
              .replace(/\.[^/.]+$/, "")  // remove extension
              .replace(/^PFP_/, "")      // remove "PFP_" prefix
              .replace(/_/g, " ");       // underscores → spaces
            const altText = `This is ${name}`;
            return (
              <img
                key={i}
                src={`/Assets/charcardPFP/${icon}`}
                alt={altText}
                title={altText}
                className="charicon"
              />
            );
          })}
        </div>
      </a>
      <div className='landing-card newsarea'>
        <NewsSection />
      </div>
    </div >
  );
}

export default App;
