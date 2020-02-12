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
    <nav id="accountNav">
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
                <img src="/icons/dashboard.svg" alt="" />
                Dashboard
              </a>
            </li>
          </Link>
          <Link href="/dashboard/receipts" as="/dashboard/receipts">
            <li className={checkActive(router, '/dashboard/receipts')}>
              <a href="#">
                <img src="/icons/receipt.svg" alt="" />
                Receipts
              </a>
            </li>
          </Link>
          <li>
            <a href="#">
              <img src="/icons/expense.svg" alt="" />
              Expenses
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/icons/expense_report.svg" alt="" />
              Expense Report
            </a>
          </li>
          <Link href="/dashboard/settings" as="/dashboard/settings">
            <li className={checkActive(router, '/dashboard/settings')}>
              <a href="#">
                <img src="/icons/settings.svg" alt="" />
                Settings
              </a>
            </li>
          </Link>
        </ul>
      </div>
      <div className="topNav">
        <div className="notification-area">
          <button type="button">
            <img src="/icons/notification.svg" alt="" />
          </button>
        </div>
        <div className="profile-area">
          <img src="/avatar.png" alt="" className="avatar" />
          <p>Jessica Rabbit</p>
          <button type="button">
            <img src="/icons/chevron_down.svg" alt="" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
