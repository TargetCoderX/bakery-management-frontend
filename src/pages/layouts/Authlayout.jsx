import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ToastContainer } from 'react-toastify';
function Authlayout({ children }) {
    return (
        <>
            <Header />
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
            />
            <div className="page">
                <div className="page-wrapper">
                    <div className="page-header d-print-none">
                        <div className="container-xl">
                            {children}
                        </div>
                    </div>
                    <div className="page-body">
                        <div className="container-xl">
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Authlayout;
