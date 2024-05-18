import React, { useContext } from 'react';
import { accessLocalStorage } from '../helpers/commonhelper';
import { loginContext } from '../contextApis/LoginContext';
import Cookies from 'js-cookie';

function Header() {
  const login = useContext(loginContext);
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
                <li className="nav-item">
                  <a className="nav-link" href="./">
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
                  </a>
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
