import './styles/pages/App.css'
import './styles/base/font.css';
import './styles/base/base.css';
import './styles/base/variables.css';
import './styles/base/palette.css';
import './styles/base/resources.css';
import './styles/base/scrollbar.css';
import { useState } from "react";
import NewsSection from './Components/NewsSection';
import LandingExtLinks from './Components/LandingExtLinks';
import VesneaBio from './Components/VesneaBio';
import Sparkles from './Components/Sparkles';

import { ReactComponent as PfpBg } from './Assets/Header/header-pfp-0.svg'
import { ReactComponent as LogoHome } from './Assets/Header/header-home.svg'
import { ReactComponent as LogoBluesky } from './Assets/Header/header-bsky.svg'
import { ReactComponent as LogoKofi } from './Assets/Header/header-kofi.svg'

function App() {
  const speed = 0.05;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY * speed;
    document.body.style.setProperty('--scroll-y', `${scrollY}px`);
  }, { passive: true });

  const [theme, setTheme] = useState("light");
  const themes = [
    { id: 'light', class: 'landingbtn1', label: 'Light Theme' },
    { id: 'dark', class: 'landingbtn3', label: 'Dark Theme' },
    { id: 'star', class: 'landingbtn2', label: 'Star Theme' },
    { id: 'infinity', class: 'landingbtn4', label: 'Infinity Theme' },
    { id: 'beacon', class: 'landingbtn5', label: 'Beacon Theme' },
  ];
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save the selected theme
  };

  const charicons1 = [
    "pfp-mythseavalanche.webp",
    "pfp-seavalanche.webp",
    "pfp-seava.webp",
    "pfp-seravyn.webp",
    "pfp-vesnea.webp",
    "pfp-korazu.webp",
    "pfp-uzakon.webp",
    "pfp-zumiko.webp",
  ];
  const charicons2 = [
    "pfp-tharos-glow.webp",
    "pfp-noira-glow.webp",
    "pfp-zeo-glow.webp",
    "pfp-placeholder.webp",
  ];
  const charicons3 = [
    "pfp-arna.webp",
    "pfp-arnamini.webp",
    "pfp-baldor.webp",
    "pfp-rakariki.webp",
    "pfp-veranite.webp",
    "pfp-fondan.webp",
    "pfp-sarchie.webp",
    "pfp-deimev.webp",
  ];
  const charicons4 = [
    "pfp-placeholder.webp",
    "pfp-placeholder.webp",
    "pfp-placeholder.webp",
    "pfp-placeholder.webp",
  ];
  const charicons5 = [
    "pfp-vesneon.webp",
    "pfp-vesrionne.webp",
    "pfp-placeholder.webp",
    "pfp-placeholder.webp",
  ];

  return (
    <div className='landing-container' theme={theme} toggleTheme={toggleTheme}>
      <div className='landing-container-header'>
        <div className='landing-card header'>
          <div className='landing-profile'>
            <div className='pfp-overlay'>
              <div className='pfpzone A0' />
              <div className='pfpzone C0' />
              <div className='pfpzone B0' />
              <div className='pfpzone A1' />
              <div className='pfpzone C1' />
              <div className='pfpzone B1' />
            </div>
            <div className='landing-pfp-container'>
              <div className='landing-pfp' />
              <PfpBg className='landing-pfp-bg' />
            </div>
            <div className='landing-name'>
              <Sparkles>
                veslogo3
              </Sparkles>
            </div>
            <div className='landing-bio'>Call me Vesnea! - She/Her</div>
            <div className='landing-socials'>
              <a className='social-home' href='https://seavalanche.github.io/projectseaweb' target='_blank' rel="noreferrer">
                <div className='social-home-icon'><LogoHome /></div>
                <div className='social-home-name'>
                  <span>Seavalanche's</span>
                  <span>Website</span>
                </div>
              </a>
              <a className='social-links bsky' href='https://bsky.app/profile/seavalanche.bsky.social' target='_blank' rel="noreferrer">
                <div className='social-linkicon bsky'><LogoBluesky /></div>
                <div className='social-linkname'>
                  <span>Seavalanche's</span>
                  <span>Bluesky</span>
                </div>
              </a>
              <a className='social-links kofi' href='https://ko-fi.com/seavalanche' target='_blank' rel="noreferrer">
                <div className='social-linkicon kofi'><LogoKofi /></div>
                <div className='social-linkname'>
                  <span>Seavalanche's</span>
                  <span>Ko-fi</span>
                </div>
              </a>
            </div>
            <LandingExtLinks />
          </div>
          <div className='landing-theme-selection'>
            {themes.map((t) => (
              <button
                key={t.id}
                className={`landing-theme-button ${theme === t.id ? 'active' : ''}`}
                onClick={() => toggleTheme(t.id)}
                aria-label={t.label}
              >
                <div className={`landing-theme-icon ${t.class}`} />
              </button>
            ))}
          </div>
        </div>
        <a className='landing-card charicons' href='https://seavalanche.github.io/projectseaweb/#/CharInfo' target='_blank' rel="noreferrer">
          <div className='LP-card-title'>Seavalanche Characters</div>
          <div className='charicons-wrapper seavalanchefragments'>
            {charicons1.map((icon, i) => {
              const name = icon
                .replace(/\.[^/.]+$/, "")  // remove extension
                .replace(/^pfp-/, "")
                .replace(/-/g, " ");
              const altText = `This is ${name}`;
              return (
                <img
                  key={i}
                  src={`/Assets/characters-pfp/${icon}`}
                  alt={altText}
                  title={altText}
                  className="charicon"
                />
              );
            })}
          </div>
          <div className='charicons-wrapper teamemblem'>
            {charicons2.map((icon, i) => {
              const name = icon
                .replace(/\.[^/.]+$/, "")  // remove extension
                .replace(/^pfp-/, "")
                .replace(/-/g, " ");
              const altText = `This is ${name}`;
              return (
                <img
                  key={i}
                  src={`/Assets/characters-pfp/${icon}`}
                  alt={altText}
                  title={altText}
                  className="charicon"
                />
              );
            })}
          </div>
          <div className='charicons-wrapper themisguided'>
            {charicons3.map((icon, i) => {
              const name = icon
                .replace(/\.[^/.]+$/, "")  // remove extension
                .replace(/^pfp-/, "")
                .replace(/-/g, " ");
              const altText = `This is ${name}`;
              return (
                <img
                  key={i}
                  src={`/Assets/characters-pfp/${icon}`}
                  alt={altText}
                  title={altText}
                  className="charicon"
                />
              );
            })}
          </div>
          <div className='charicons-wrapper thefeared'>
            {charicons4.map((icon, i) => {
              const name = icon
                .replace(/\.[^/.]+$/, "")  // remove extension
                .replace(/^pfp-/, "")
                .replace(/-/g, " ");
              const altText = `This is ${name}`;
              return (
                <img
                  key={i}
                  src={`/Assets/characters-pfp/${icon}`}
                  alt={altText}
                  title={altText}
                  className="charicon"
                />
              );
            })}
          </div>
          <div className='charicons-wrapper multiversevesnea'>
            {charicons5.map((icon, i) => {
              const name = icon
                .replace(/\.[^/.]+$/, "")  // remove extension
                .replace(/^pfp-/, "")
                .replace(/-/g, " ");
              const altText = `This is ${name}`;
              return (
                <img
                  key={i}
                  src={`/Assets/characters-pfp/${icon}`}
                  alt={altText}
                  title={altText}
                  className="charicon"
                />
              );
            })}
          </div>
        </a>
      </div>
      <div className='landing-card bio'>
        <VesneaBio />
      </div>
      <div className='landing-card newsarea'>
        <NewsSection />
      </div>
      <div className='landing-card footer'> Copyright © 2021 - 2026 Seavalanche </div>
    </div >
  );
}

export default App;
