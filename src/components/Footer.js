import React from 'react';

function Footer() {
  return (
    <div>
      <footer className="footer footer-transparent d-print-none">
        <div className="container-xl">
          <div className="row text-center align-items-center flex-row-reverse">
            <div className="col-lg-auto ms-lg-auto">
              <ul className="list-inline list-inline-dots mb-0">                
                <li className="list-inline-item">
                  <a href="https://github.com/sponsors/codecalm" target="_blank" className="link-secondary" rel="noopener">
                    <span> Made With  </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon text-pink icon-filled icon-inline" width="24"
                      height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                      strokeLinecap="round" >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                    </svg>
                     <span> By Soumya Manna</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-auto mt-3 mt-lg-0">
              <ul className="list-inline list-inline-dots mb-0">
                <li className="list-inline-item">
                  Copyright &copy; {new Date().getFullYear()}
                  <a href="javascript:;" className="link-secondary"> Soumya Manna </a>.
                  <span> All rights reserved.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
