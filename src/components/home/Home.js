import React from 'react';
import { push as Menu } from 'react-burger-menu';
import Link from 'next/link';
import Icons from '../common/icons';


const Home = () => (
  <div id="outer-container" className="dashboard-outer">
    <Menu right pageWrapId="page-wrap" outerContainerId="outer-container">
      <div>
        <Link href="/signup" as="/signup">
          <a>Sign up</a>
        </Link>
        <Link href="/login" as="/login">
          <a>Login</a>
        </Link>
      </div>
    </Menu>
    <div id="page-wrap">
      <div className="homepageWrapper">
        <header className="u_section">
          <div className="brand">
            <Link href="/" as="/">
              <img src="/logo.png" alt="Easy Expense logo" />
            </Link>
            {/* Navigation menu not visibile on mobile device begins here */}
            <nav>
              <ul className="authLinks">
                <li className="primary-link">
                  <Link href="/signup" as="/signup">
                    <a href="pages/website/auth/index.html">Sign up</a>
                  </Link>
                </li>
                <li className="secondary-link">
                  <Link href="/login" as="/login">
                    <a href="#">Login</a>
                  </Link>
                </li>
              </ul>
            </nav>
            {/* Navigation menu not visibile on mobile device ends here */}
          </div>
        </header>
        <main>
          <div className="hero">
            <div className="hero__left">
              <h1>Track and approve business expenses easily</h1>
              <p>
                Easy Expense is an open-source tool that helps small businesses
                to track and approve business expenses.
                It streamlines expense tracking and reporting,
                and is free for companies to use and host.
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
              <h3>Capture receipts and create expense reports.</h3>
              <p>
                Take photos of receipts, and convert receipts to expense reports.
              </p>
            </div>
            <div className="benefits__item">
              <div className="benefits__item__image">
                <Icons.manager />
              </div>
              <h3>Review and approve expenses</h3>
              <p>
                Expense approvers can review details,
                and use Easy Expense for quick approval.
              </p>
            </div>
            <div className="benefits__item">
              <div className="benefits__item__image">
                <Icons.calender />
              </div>
              <h3>Saves employees and business owners  time.</h3>
              <p>
                No more emails and spreadsheets.
                This easy web app simplifes the expense management process.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
);

export default Home;
