import React from 'react';

const Nav = () => (
  <nav className="accountNav">
    <div className="brand">
      <img src="/logo.png" alt="Easy Expense logo" />
    </div>
    <div className="menu">
      <ul>
        <li className="activeNav">
          <a href="#">
            <span className="icon icon__dashboard" />
            Dashboard
          </a>
        </li>
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
        <li>
          <a href="#">
            <span className="icon icon__settings" />
            Settings
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;
