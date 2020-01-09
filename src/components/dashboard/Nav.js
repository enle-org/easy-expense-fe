import React from 'react';
import Link from 'next/link';

const Nav = () => (
  <nav className="accountNav">
    <div className="brand">
      <Link href="/" as="/">
        <img src="/logo.png" alt="Easy Expense logo" />
      </Link>
    </div>
    <div className="menu">
      <ul>
        <Link href="/dashboard" as="/dashboard">
          <li className="activeNav">
            <a href="#">
              <span className="icon icon__dashboard" />
              Dashboard
            </a>
          </li>
        </Link>
        <li>
          <a href="#">
            <span className="icon icon__receipt" />
            Receipts
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon icon__expense" />
            Expenses
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon icon__expense_report" />
            Expense Report
          </a>
        </li>
        <Link href="/dashboard/settings" as="/dashboard/settings">
          <li>
            <a href="#">
              <span className="icon icon__settings" />
              Settings
            </a>
          </li>
        </Link>
      </ul>
    </div>
  </nav>
);

export default Nav;
