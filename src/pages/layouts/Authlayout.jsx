import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
function Authlayout({ children }) {
    return (
        <>
            <Header />
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
