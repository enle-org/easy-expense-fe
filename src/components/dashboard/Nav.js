import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const checkActive = (router, linkName) => {
  if (router.pathname === linkName) return 'activeNav';
  return '';
};

const Nav = () => {
  const router = useRouter();

  return (
    <nav className="accountNav">
      <div className="brand">
        <Link href="/" as="/">
          <img src="/logo.png" alt="Easy Expense logo" />
        </Link>
      </div>
      <div className="menu">
        <ul>
          <Link href="/dashboard" as="/dashboard">
            <li className={checkActive(router, '/dashboard')}>
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
            <li className={checkActive(router, '/dashboard/settings')}>
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
};

export default Nav;
