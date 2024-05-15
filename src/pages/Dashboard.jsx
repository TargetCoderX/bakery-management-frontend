import React, { useContext, useEffect } from 'react';
import Authlayout from './layouts/Authlayout';
import { titleContext } from '../contextApis/TitleContext';

function Dashboard() {
    const title = useContext(titleContext);
    
    /* setting page title using use context */
    useEffect(() => {
        title.settitle('Dashboard')
    }, []);
    return (
        <Authlayout>
            <div>
                <div className="row g-2 align-items-center">
                    <div className="col">
                        <h2 className="page-title">
                            Empty page
                        </h2>
                    </div>
                </div>
            </div>
        </Authlayout>
    );
}

export default Dashboard;
