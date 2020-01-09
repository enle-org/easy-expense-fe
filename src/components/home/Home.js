import React from 'react';
import Link from 'next/link';
import Icons from '../common/icons';

const Home = () => (
  <div className="homepageWrapper">
    <header className="u_section">
      <div className="brand">
        <Link href="/" as="/">
          <img src="/logo.png" alt="Easy Expense logo" />
        </Link>
      </div>
      {/* Navigation menu not visibile on mobile device begins here */}
      <nav>
        <ul className="authLinks">
          <li className="button button__primary authLinks__link">
            <Link href="/signup" as="/signup">
              <a href="pages/website/auth/index.html">Sign up</a>
            </Link>
          </li>
          <li className="authLinks__link link">
            <Link href="/login" as="/login">
              <a href="#">Login</a>
            </Link>
          </li>
        </ul>
      </nav>
      {/* Navigation menu not visibile on mobile device ends here */}
      {/* Hamburger menu only visible on a mobile device begins here */}
      <div className="hamburgerMenu">
        {/* Hamburger button */}
        <div id="hamburgerMenu__button" className="hamburgerMenu__button">
          <span />
          <span />
          <span />
          <span />
        </div>
        {/* Hamburger content */}
        <div id="hamburgerMenu__content" className="hamburgerMenu__content">
          <div className="brand">
            <img src="/logo.png" alt="Easy Expense logo" />
          </div>
          <nav>
            <ul className="mobileAuthLinks">
              <li className="button button__primary mobileAuthLinks__link">
                <a href="pages/website/auth/index.html">Sign up</a>
              </li>
              <li className="button button__outline mobileAuthLinks__link">
                <a href="#">Login</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Hamburger menu only visible on a mobile device ends here */}
    </header>
    <main>
      <div className="hero">
        <div className="hero__left">
          <h1>Track and approve business expenses easily</h1>
          <p>
            Easy Expense is an open-source tool designed to make it easier for
            small businesses to track and approve business expenses. It has a
            simple feature set focused on expense tracking, and is open-source, so
            that companies can run and self-host.
          </p>
          <a href="pages/website/auth/index.html" className="link link__primary">
            Sign Up
            <span className="icon icon__forward" />
          </a>
        </div>
        <div className="hero__right">
          <Icons.hero />
        </div>
      </div>
      <div className="u_section benefits">
        <div className="benefits__item">
          <div className="benefits__item__image">
            <Icons.reports />
          </div>
          <h3>Easily capture and create expense reports.</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="benefits__item">
          <div className="benefits__item__image">
            <Icons.manager />
          </div>
          <h3>Review and manage expense workflow</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="benefits__item">
          <div className="benefits__item__image">
            <Icons.calender />
          </div>
          <h3>Saves employees and business owners time.</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </main>
  </div>
);

export default Home;
