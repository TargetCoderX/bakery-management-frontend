import React, { useContext } from 'react';
import { accessLocalStorage } from '../helpers/commonhelper';
import { loginContext } from '../contextApis/LoginContext';
import Cookies from 'js-cookie';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const login = useContext(loginContext);
  const uselocation = useLocation();
  const logout = (e) => {
    login.setisLoggedin(false);
    Cookies.remove('secret_token');
  }
  const getUserData = accessLocalStorage('user_data');
  return (
    <div>
      <header className="navbar navbar-expand-md d-print-none">
        <div className="container-xl">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu"
            aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href=".">
              <img src={`${process.env.REACT_APP_PUBLIC_URL}/assets/static/logo.svg`} width="110" height="32" alt="Tabler" className="navbar-brand-image" />
            </a>
          </h1>
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown">
              <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown"
                aria-label="Open user menu">
                <span className="avatar avatar-sm" style={{ "backgroundImage": `url(${process.env.REACT_APP_PUBLIC_URL}/assets/static/avatars/000m.jpg)` }}></span>
                <div className="d-none d-xl-block ps-2">
                  <div>{getUserData.name}</div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a href="javascript:;" onClick={(e) => { logout(e) }} className="dropdown-item">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="navbar-expand-md">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar">
            <div className="container-xl">
              <ul className="navbar-nav">
                <li className={`nav-item ${uselocation.pathname === '/dashboard' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/dashboard">
                    <span
                      className="nav-link-icon d-md-none d-lg-inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24"
                        strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                      </svg>
                    </span>
                    <span className="nav-link-title">
                      Home
                    </span>
                  </Link>
                </li>
                <li className={`nav-item ${uselocation.pathname === '/all-orders' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/all-orders">
                    <span
                      className="nav-link-icon d-md-none d-lg-inline-block">
                      <svg fill="#000000" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                        <g id="a" />
                        <g id="b">
                          <path d="M55.873,21.7808c-.5488-.4834-1.1465-.897-1.7744-1.228-1.3103-.6929-2.8191-.6383-4.0703,.015v-2.4266c0-.1636-.0801-.3164-.2139-.4102-.045-.0311-.0979-.0422-.1492-.0571l.0037-.0127-21-6.1411c-.0918-.0264-.1895-.0264-.2812,0L7.3877,17.6611l.0038,.0129c-.0514,.0149-.1044,.026-.1493,.0569-.1338,.0938-.2139,.2466-.2139,.4102v25.043c0,1.0322,.6484,1.9717,1.6143,2.3384l19.709,7.4673c.0566,.0215,.1172,.0322,.1768,.0322s.1201-.0107,.1768-.0322l4.7718-1.8079c.1243,.5645,.2361,.9236,.2516,.972,.0674,.2075,.2598,.3462,.4756,.3462l.0322-.001c.1895-.0122,4.665-.3325,7.7754-3.0176l-.01-.0116c.0338-.0291,.0732-.0506,.0989-.089l1.3146-1.9651,4.9998-1.8938c.9648-.3662,1.6133-1.3057,1.6133-2.3379v-5.6538l6.6016-9.8682c1.252-1.8716,.9268-4.3999-.7568-5.8813ZM28.5283,12.521l19.4025,5.674-8.9662,3.2903-17.9672-6.762,7.5309-2.2023Zm0,12.7939l-19.4025-7.1199,10.2748-3.0048,18.1273,6.8222-8.9996,3.3025ZM8.0283,43.1841V18.8574l20,7.3391v25.6014l-19.0312-7.2104c-.5801-.2197-.9688-.7837-.9688-1.4033Zm21,8.6138V26.1965l20-7.3391v2.4217c-.2537,.2375-.4925,.496-.6943,.7975l-14.5459,21.7441c-.0239,.0358-.0175,.079-.0311,.1183l-.0236-.0084c-.8105,2.2712-.6904,4.6404-.4419,6.252l-4.2632,1.6152Zm5.4162-6.7241c1.8631,1.9025,3.9426,3.3076,6.2037,4.1861-2.2558,1.5803-5.05,2.0708-6.0759,2.1992-.2536-.9896-.8016-3.7194-.1277-6.3853Zm7.0369,3.4341c-2.4697-.8613-4.6494-2.3242-6.6436-4.4575l12.3685-18.4886c2.8398,.3173,5.0165,1.7821,6.6361,4.4679l-12.361,18.4783Zm7.5469-5.3237c0,.6196-.3896,1.1836-.9678,1.4028l-3.6871,1.3965,4.6549-6.9583v4.159Zm6.7695-16.0776l-1.3502,2.0183c-1.6509-2.5337-3.8733-4.0389-6.625-4.4844l1.3433-2.008c.9844-1.4727,2.9473-2.0005,4.4658-1.1953,.5586,.2944,1.0908,.6631,1.5811,1.0947,1.3076,1.1514,1.5596,3.1182,.585,4.5747Z" />
                        </g>
                      </svg>
                    </span>
                    <span className="nav-link-title">
                      Orders
                    </span>
                  </Link>
                </li>
                <li className={`nav-item ${uselocation.pathname === '/billing' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/billing">
                    <span
                      className="nav-link-icon d-md-none d-lg-inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-script">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 20h-11a3 3 0 0 1 0 -6h11a3 3 0 0 0 0 6h1a3 3 0 0 0 3 -3v-11a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v8" />
                      </svg>
                    </span>
                    <span className="nav-link-title">
                      Billing
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
