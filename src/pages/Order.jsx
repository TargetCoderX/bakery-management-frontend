import React, { useEffect, useState } from 'react';
import Authlayout from './layouts/Authlayout';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function Order() {
    const params = useParams();
    const [year, setyear] = useState(new Date().getFullYear());
    const fetchOrderDetails = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/get-customer-order-data/${params.customer_id}/${year}`, {
            headers: {
                'Authorization': Cookies.get('secret_token')
            }
        })
            .then(response => {
                let data = response.json();
                console.log(data);
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        fetchOrderDetails();
    }, []);
    return (
        <Authlayout>
            <div>
                <div className="row g-2 align-items-center">
                    <div className="col-10">
                        <h2 className="page-title m-2">
                            Orders of
                        </h2>
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="table-responsive">
                                <table className="table table-vcenter card-table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Title</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th className="w-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Maryjo Lebarree</td>
                                            <td className="text-secondary">
                                                Civil Engineer, Product Management
                                            </td>
                                            <td className="text-secondary"><a href="#" className="text-reset">mlebarree5@unc.edu</a></td>
                                            <td className="text-secondary">
                                                User
                                            </td>
                                            <td>
                                                <a href="#">Edit</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Egan Poetz</td>
                                            <td className="text-secondary">
                                                Research Nurse, Engineering
                                            </td>
                                            <td className="text-secondary"><a href="#" className="text-reset">epoetz6@free.fr</a></td>
                                            <td className="text-secondary">
                                                Admin
                                            </td>
                                            <td>
                                                <a href="#">Edit</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Kellie Skingley</td>
                                            <td className="text-secondary">
                                                Teacher, Services
                                            </td>
                                            <td className="text-secondary"><a href="#" className="text-reset">kskingley7@columbia.edu</a></td>
                                            <td className="text-secondary">
                                                User
                                            </td>
                                            <td>
                                                <a href="#">Edit</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Christabel Charlwood</td>
                                            <td className="text-secondary">
                                                Tax Accountant, Engineering
                                            </td>
                                            <td className="text-secondary"><a href="#" className="text-reset">ccharlwood8@nifty.com</a></td>
                                            <td className="text-secondary">
                                                Owner
                                            </td>
                                            <td>
                                                <a href="#">Edit</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Haskel Shelper</td>
                                            <td className="text-secondary">
                                                Staff Scientist, Legal
                                            </td>
                                            <td className="text-secondary"><a href="#" className="text-reset">hshelper9@woothemes.com</a></td>
                                            <td className="text-secondary">
                                                Admin
                                            </td>
                                            <td>
                                                <a href="#">Edit</a>
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

export default Order;
