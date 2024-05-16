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
                            Cuatomer Data
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Customer Name</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Phone Nunber</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>
                                                <button className="btn btn-warning">View Orders</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Authlayout>
    );
}

export default Dashboard;
