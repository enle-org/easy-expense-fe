import React from 'react';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Dropdown } from 'react-bootstrap';
import cookie from 'js-cookie';

import { logout, getUser } from '../../utils/serverAuth';

const checkActive = (router, linkName) => {
  if (router.pathname === linkName) return 'activeNav';
  return '';
};

// eslint-disable-next-line react/display-name
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    className="dropdown-link"
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

@inject('authStore')
@observer
class Nav extends React.Component {
  state = {
    email: '',
    fullname: '',
  };

  componentDidMount = () => {
    this.setState({
      email: getUser().email,
      fullname: getUser().fullname,
    });
  };

  render() {
    const { router } = this.props;
    const { fullname, email } = this.state;

    return (
      <nav id="accountNav">
        <div className="brand">
          {cookie.get('token') ? (
            <Link href="/dashboard" as="/dashboard">
              <img src="/logo.svg" alt="Easy Expense logo" />
            </Link>
          ) : (
            <Link href="/" as="/">
              <img src="/logo.svg" alt="Easy Expense logo" />
            </Link>
          )}
        </div>
        <div className="menu">
          <ul>
            <Link href="/dashboard" as="/dashboard">
              <li className={checkActive(router, '/dashboard')}>
                <a href="#">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0)">
                      <path d="M19.5108 0H0V3.0657H19.5108V0Z" fill="#212121" />
                      <path
                        d="M19.4994 5.54736H5.47607V8.61329H19.4994V5.54736Z"
                        fill="#212121"
                      />
                      <path
                        d="M19.5108 11.3867H0V14.4526H19.5108V11.3867Z"
                        fill="#212121"
                      />
                      <path
                        d="M19.4994 16.9343H5.47607V20H19.4994V16.9343Z"
                        fill="#212121"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Dashboard
                </a>
              </li>
            </Link>
            <li>
              <a href="#">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      d="M18.863 13.0822C17.1484 12.0005 15.1853 11.4069 13.1565 11.2959C13.6255 11.5155 14.0898 11.7473 14.5301 12.0251C15.5909 12.6935 16.25 13.9038 16.25 15.1831V18.75H20.0001V15.1831C20.0001 14.3298 19.5643 13.5248 18.863 13.0822V13.0822Z"
                      fill="black"
                    />
                    <path
                      d="M13.8629 13.0823C10.0629 10.6848 4.93653 10.6848 1.13768 13.0823C0.435801 13.5242 0 14.3292 0 15.1831V18.75H15V15.1831C15 14.3292 14.5642 13.5242 13.8629 13.0823V13.0823Z"
                      fill="black"
                    />
                    <path
                      d="M11.2427 9.79297C11.6467 9.91529 12.0637 10 12.4999 10C14.912 10 16.8749 8.03716 16.8749 5.62504C16.8749 3.21293 14.912 1.25 12.4999 1.25C12.0637 1.25 11.6467 1.33476 11.2427 1.45708C12.3891 2.4875 13.1249 3.96563 13.1249 5.62501C13.1249 7.28438 12.3892 8.76251 11.2427 9.79297V9.79297Z"
                      fill="black"
                    />
                    <path
                      d="M10.5936 2.53141C12.3022 4.23997 12.3022 7.01003 10.5936 8.71859C8.88504 10.4272 6.11499 10.4272 4.40642 8.71859C2.69786 7.01003 2.69786 4.23997 4.40642 2.53141C6.11499 0.822845 8.88504 0.822883 10.5936 2.53141"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width={20} height={20} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Team Members
              </a>
            </li>
            <Link href="/dashboard/receipts" as="/dashboard/receipts">
              <li className={checkActive(router, '/dashboard/receipts')}>
                <a href="#">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M17.1146 0.513834C16.8106 0.373758 16.4524 0.428266 16.2037 0.65235L14.8916 1.81414C14.8559 1.84591 14.802 1.84572 14.7665 1.81376L12.9812 0.216994C12.6583 -0.0723312 12.1695 -0.0723312 11.8466 0.216994L10.0629 1.81229C10.027 1.84435 9.97282 1.84435 9.93694 1.81229L8.15306 0.216994C7.83016 -0.072284 7.34134 -0.072284 7.01844 0.216994L5.23292 1.81376C5.19718 1.84572 5.14318 1.84586 5.10726 1.81409L3.79396 0.65235C3.44554 0.342508 2.9119 0.373758 2.60204 0.722176C2.4631 0.87842 2.38708 1.08066 2.3887 1.28971V18.7103C2.38558 19.1773 2.7616 19.5584 3.22858 19.5615C3.43778 19.5629 3.64002 19.4867 3.79632 19.3477L5.10844 18.1859C5.14414 18.1541 5.19798 18.1543 5.23348 18.1863L7.01878 19.7831C7.34168 20.0724 7.8305 20.0724 8.15338 19.7831L9.93726 18.1878C9.97314 18.1557 10.0274 18.1557 10.0633 18.1878L11.8471 19.783C12.1701 20.0722 12.6589 20.0722 12.9817 19.783L14.7674 18.1862C14.8031 18.1543 14.8571 18.1541 14.893 18.1859L16.2063 19.3477C16.5549 19.6574 17.0885 19.6259 17.3982 19.2773C17.5369 19.1212 17.6128 18.9192 17.6113 18.7103V1.28971C17.6157 0.955054 17.4204 0.649892 17.1146 0.513834ZM5.51864 6.78532H10.2266C10.4355 6.78532 10.6048 6.95466 10.6048 7.16352C10.6048 7.37238 10.4355 7.54172 10.2266 7.54172H5.51864C5.30978 7.54172 5.14044 7.37238 5.14044 7.16352C5.14044 6.95466 5.30978 6.78532 5.51864 6.78532ZM14.4814 13.2147H5.51864C5.30978 13.2147 5.14044 13.0454 5.14044 12.8365C5.14044 12.6277 5.30978 12.4583 5.51864 12.4583H14.4814C14.6902 12.4583 14.8596 12.6277 14.8596 12.8365C14.8596 13.0454 14.6902 13.2147 14.4814 13.2147ZM14.4814 10.3782H5.51864C5.30978 10.3782 5.14044 10.2089 5.14044 10C5.14044 9.79116 5.30978 9.62182 5.51864 9.62182H14.4814C14.6902 9.62182 14.8596 9.79116 14.8596 10C14.8596 10.2089 14.6902 10.3782 14.4814 10.3782Z"
                        fill="#212121"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Receipts
                </a>
              </li>
            </Link>
            <li>
              <a href="#">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      d="M19.9999 8.44554C19.9985 5.40572 18.3563 2.60348 15.7049 1.11658C13.0535 -0.370114 9.80618 -0.30974 7.21184 1.27446C9.69228 0.487242 12.3902 0.78638 14.6379 2.09782C14.8286 2.20958 14.8927 2.45478 14.7809 2.64548C14.6692 2.83618 14.424 2.90026 14.2333 2.7885C12.9476 2.03744 11.4851 1.64198 9.9961 1.64296C8.45352 1.63924 6.94064 2.065 5.62646 2.87252C8.8992 1.83619 12.4769 2.70918 14.9046 5.13648C17.3325 7.56356 18.2061 11.1411 17.1703 14.4142C18.7713 11.7908 18.8106 8.5022 17.2729 5.84124C17.194 5.71736 17.1895 5.56008 17.2612 5.4317C17.3327 5.30334 17.4691 5.2246 17.616 5.22654C17.7629 5.2285 17.897 5.31096 17.9652 5.44108C19.2574 7.67768 19.5503 10.3545 18.7719 12.8175C19.5781 11.502 20.0033 9.98852 19.9999 8.44554ZM17.0599 4.77618C16.889 4.91646 16.6367 4.89146 16.4966 4.7205C16.1496 4.29728 15.7626 3.90886 15.3409 3.5601C15.1703 3.41922 15.1463 3.16698 15.2872 2.9964C15.4279 2.82582 15.6803 2.8018 15.8507 2.94266C16.3122 3.32386 16.7358 3.74884 17.1156 4.21152C17.1834 4.29358 17.2156 4.39948 17.2051 4.50538C17.1947 4.61128 17.1424 4.70876 17.0599 4.77618Z"
                      fill="#212121"
                    />
                    <path
                      d="M15.6689 15.8627C17.5755 12.566 17.0284 8.39932 14.3352 5.7065C11.642 3.01368 7.4752 2.46698 4.17862 4.37396C3.8619 4.559 3.5575 4.76414 3.26714 4.98826C0.687452 6.98042 -0.50773 10.2846 0.200742 13.4659C0.909412 16.6474 3.39376 19.1321 6.57504 19.8412C9.75634 20.5502 13.0607 19.3557 15.0531 16.7764C15.2786 16.4858 15.4843 16.1806 15.6689 15.8627ZM5.70518 17.9035C5.6581 17.9987 5.57506 18.0714 5.47444 18.1052C5.3738 18.1392 5.2638 18.1318 5.16866 18.0845C4.47678 17.7404 3.84588 17.2857 3.30076 16.7384C2.89688 16.3361 2.54362 15.8862 2.24918 15.3983C2.1724 15.2756 2.1677 15.121 2.23706 14.994C2.30662 14.8672 2.4391 14.7875 2.58368 14.7857C2.72846 14.7842 2.8627 14.8608 2.93498 14.986C3.19642 15.4188 3.51002 15.8178 3.86854 16.1742C4.35232 16.6599 4.91212 17.0636 5.52602 17.369C5.72394 17.467 5.80502 17.7072 5.70674 17.9051L5.70518 17.9035ZM5.99456 13.6476H6.79486C6.79486 14.5315 7.51154 15.2482 8.39546 15.2482C9.2794 15.2482 9.99608 14.5315 9.99608 13.6476C9.99608 12.7635 9.2794 12.047 8.39546 12.047C7.15262 12.0398 6.12078 11.0853 6.01682 9.84694C5.91288 8.60858 6.77122 7.49546 7.99532 7.28112V6.44486H8.79562V7.28112C9.94938 7.4771 10.7942 8.47572 10.7964 9.6461H9.99608C9.99608 8.76196 9.2794 8.04548 8.39546 8.04548C7.51154 8.04548 6.79486 8.76196 6.79486 9.6461C6.79486 10.53 7.51154 11.2467 8.39546 11.2467C9.63814 11.2539 10.67 12.2082 10.7741 13.4466C10.8781 14.6851 10.0197 15.7982 8.79562 16.0124V16.8488H7.99532V16.0124C6.84156 15.8164 5.9967 14.8178 5.99456 13.6476ZM13.6951 16.5239C13.6858 16.5339 13.676 16.5436 13.6658 16.5526C13.609 16.6155 13.5502 16.6779 13.4874 16.7404C11.7864 18.4358 9.35364 19.1739 6.99728 18.7099C6.7806 18.6669 6.63952 18.4563 6.68252 18.2396C6.7255 18.0227 6.93612 17.8819 7.153 17.9248C9.24774 18.3396 11.4113 17.6829 12.922 16.1738C12.9851 16.1113 13.042 16.0493 13.0973 15.9876C13.1016 15.9829 13.1068 15.9784 13.1117 15.9737L13.1172 15.9684C13.1236 15.9624 13.1293 15.9561 13.1356 15.9504C15.2797 13.6074 15.3708 10.0429 13.3493 7.59336C13.2159 7.43138 13.073 7.27428 12.9208 7.12228C10.8583 5.06016 7.66238 4.65356 5.14932 6.13382C2.63644 7.61406 1.44223 10.6062 2.24586 13.4098C2.30642 13.6224 2.18314 13.844 1.97056 13.9046C1.75798 13.9649 1.5366 13.8418 1.47603 13.6293C0.872874 11.5439 1.24684 9.29772 2.49322 7.52048C4.03112 5.31124 6.67274 4.144 9.34172 4.49412C12.0107 4.84446 14.2616 6.65354 15.1775 9.18478C16.0935 11.716 15.5214 14.5468 13.6948 16.5239H13.6951Z"
                      fill="#212121"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width={20} height={20} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Expenses
              </a>
            </li>
            <li>
              <a href="#">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.2857 5.00002H15.7143V0.7143C15.7143 0.319796 15.3945 0 15 0H0.7143C0.319796 0 0 0.319796 0 0.7143V17.1428C0 18.7208 1.27918 20 2.85716 20H17.1428C18.7208 20 20 18.7208 20 17.1428V5.71426C20 5.3198 19.6802 5.00002 19.2857 5.00002ZM5.71426 3.57142H9.99998C10.3945 3.57142 10.7143 3.8912 10.7143 4.28572C10.7143 4.68022 10.3945 5.00002 9.99998 5.00002H5.71426C5.31976 5.00002 4.99996 4.68022 4.99996 4.28572C4.99996 3.8912 5.3198 3.57142 5.71426 3.57142ZM12.1428 17.1428H3.57142C3.1769 17.1428 2.85712 16.823 2.85712 16.4285C2.85712 16.034 3.1769 15.7142 3.57142 15.7142H12.1428C12.5373 15.7142 12.8571 16.034 12.8571 16.4285C12.8571 16.823 12.5373 17.1428 12.1428 17.1428ZM12.1428 14.2857H3.57142C3.1769 14.2857 2.85712 13.9659 2.85712 13.5714C2.85712 13.1769 3.1769 12.8571 3.57142 12.8571H12.1428C12.5373 12.8571 12.8571 13.1769 12.8571 13.5714C12.8571 13.9659 12.5373 14.2857 12.1428 14.2857ZM12.1428 11.4286H3.57142C3.1769 11.4286 2.85712 11.1088 2.85712 10.7143C2.85712 10.3198 3.1769 9.99998 3.57142 9.99998H12.1428C12.5373 9.99998 12.8571 10.3198 12.8571 10.7143C12.8571 11.1088 12.5373 11.4286 12.1428 11.4286ZM12.1428 8.57142H3.57142C3.1769 8.57142 2.85712 8.25162 2.85712 7.85712C2.85712 7.46262 3.1769 7.14282 3.57142 7.14282H12.1428C12.5373 7.14282 12.8571 7.46262 12.8571 7.85712C12.8571 8.25162 12.5373 8.57142 12.1428 8.57142ZM18.5714 17.1428C18.5714 17.9318 17.9318 18.5714 17.1428 18.5714C16.3539 18.5714 15.7143 17.9318 15.7143 17.1428V6.42856H18.5714V17.1428H18.5714Z"
                    fill="#212121"
                  />
                </svg>
                Expense Report
              </a>
            </li>
            <Link href="/dashboard/settings" as="/dashboard/settings">
              <li className={checkActive(router, '/dashboard/settings')}>
                <a href="#">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.8464 7.77778H16.9875C16.6887 7.77778 16.4426 7.61222 16.3281 7.33444C16.2137 7.05666 16.2718 6.76408 16.4827 6.55148L17.797 5.22888C17.9902 5.03444 18.0965 4.77556 18.0965 4.50074C18.0965 4.22556 17.9902 3.96704 17.797 3.77222L16.1217 2.08592C15.7354 1.69704 15.0617 1.6963 14.6746 2.08592L13.3606 3.40852C13.1858 3.58444 12.9938 3.62112 12.8632 3.62112C12.6792 3.62112 12.4963 3.54852 12.3613 3.42148C12.2616 3.3274 12.1423 3.16074 12.1423 2.90074V1.02963C12.1423 0.461852 11.6835 0 11.1194 0H8.74984C8.18578 0 7.72694 0.461852 7.72694 1.02963V2.90074C7.72694 3.35186 7.3601 3.62112 7.0054 3.62112C6.87514 3.62112 6.68306 3.58408 6.5083 3.40852L5.19434 2.08592C4.80726 1.6963 4.13354 1.69704 3.7472 2.08592L2.07192 3.77222C1.87875 3.96666 1.77241 4.22556 1.77241 4.50074C1.77241 4.77556 1.87875 5.03408 2.07192 5.22888L3.38624 6.55148C3.59708 6.76408 3.65484 7.05666 3.54078 7.33444C3.42672 7.61222 3.18056 7.77778 2.88178 7.77778H1.0229C0.458834 7.77778 0 8.23962 0 8.8074V11.1919C0 11.76 0.458834 12.2222 1.0229 12.2222H2.88178C3.18056 12.2222 3.42672 12.3878 3.54114 12.6656C3.65558 12.9433 3.59744 13.2359 3.3866 13.4485L2.0723 14.7711C1.87912 14.9656 1.77278 15.2244 1.77278 15.4993C1.77278 15.7744 1.87912 16.033 2.0723 16.2278L3.74756 17.9141C4.13428 18.3033 4.80764 18.3041 5.19472 17.9141L6.50866 16.5915C6.68344 16.4156 6.8755 16.3789 7.00612 16.3789C7.36046 16.3789 7.72732 16.6485 7.72732 17.0993V18.97C7.72694 19.5378 8.18578 20 8.74984 20H11.1191C11.6831 20 12.142 19.5378 12.142 18.97V17.0993C12.142 16.6481 12.5088 16.3789 12.8632 16.3789C12.9934 16.3789 13.1858 16.4159 13.3606 16.5915L14.6746 17.9141C15.0617 18.3037 15.7354 18.303 16.1217 17.9141L17.797 16.2278C17.9902 16.0333 18.0965 15.7744 18.0965 15.4993C18.0965 15.2244 17.9902 14.9659 17.797 14.7711L16.4827 13.4485C16.2718 13.2359 16.2141 12.9433 16.3281 12.6656C16.4422 12.3878 16.6887 12.2222 16.9875 12.2222H18.8464C19.4104 12.2222 19.8693 11.76 19.8693 11.1922V8.8074C19.8693 8.23962 19.4104 7.77778 18.8464 7.77778ZM12.5103 10C12.5103 11.4293 11.3546 12.5926 9.93464 12.5926C8.51472 12.5926 7.359 11.4293 7.359 10C7.359 8.57074 8.51472 7.4074 9.93464 7.4074C11.3546 7.4074 12.5103 8.57074 12.5103 10Z"
                      fill="#212121"
                    />
                  </svg>
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

          <Dropdown className="m-r-lg">
            <Dropdown.Toggle as={CustomToggle}>
              <div className="profile-area">
                <img
                  src={`https://ui-avatars.com/api/?background=6C63FF&color=fff&name=${
                    fullname !== ''
                      ? `${fullname.split(' ')[0][0]}${
                          fullname.split(' ')[1][0]
                        }`
                      : email.split('@')[0][0]
                  }`}
                  alt=""
                  className="avatar"
                />
                <p>{fullname !== '' ? fullname : email.split('@')[0]}</p>
                <span>
                  <img src="/icons/chevron_down.svg" alt="" />
                </span>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div>
                <button
                  type="button"
                  className="btn-clear btn-full-width"
                  onClick={() => logout()}
                >
                  Sign out
                </button>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
