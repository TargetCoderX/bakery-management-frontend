import React, { useContext, useEffect, useState } from 'react';
import Authlayout from './layouts/Authlayout';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { titleContext } from '../contextApis/TitleContext';

function Order() {
    const params = useParams();
    const [year, setyear] = useState(new Date().getFullYear());
    const [orderDetails, setorderDetails] = useState({});
    const [lastYears, setlastYears] = useState([]);
    const title = useContext(titleContext);

    const fetchOrderDetails = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/get-customer-order-data/${params.customer_id}/${year}`, {
            headers: {
                'Authorization': Cookies.get('secret_token')
            }
        })
            .then(async response => {
                let data = await response.json();
                let object = {
                    "customer_name": data.data[0].name,
                    "phone": data.data[0].phone,
                    "address": data.data[0].address,
                    "email": data.data[0].email,
                    "order_data": data.data,
                }
                setorderDetails(object);
            })
            .catch(error => console.log(error));
    }

    const getYearArray = () => {
        let yearsList = [];
        let year = new Date().getFullYear();
        yearsList.push(year);
        for (let index = 1; index <= 5; index++) {
            yearsList.push(year - index);
        }
        setlastYears(yearsList);
    }
    const handleYearChange = () => {

    }

    useEffect(() => {
        title.settitle("Customer Order");
        getYearArray();
        fetchOrderDetails();
    }, []);
    return (
        <Authlayout>
            <div>
                <div className="row g-2 align-items-center">
                    <div className="col-10">
                        <h2 className="page-title m-2">
                            Orders of {orderDetails.customer_name}
                        </h2>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Year</label>
                            <select name="" id="" className="form-control" value={year} onChange={() => { handleYearChange() }}>
                                {lastYears && lastYears.map((element, index) => (
                                    <option value={element} key={index}>{element}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="table-responsive">
                                <table className="table table-vcenter card-table table-striped">
                                    <thead>
                                        <tr>
                                            <th>product Name</th>
                                            <th>Price</th>
                                            <th>Date of purchase</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetails.order_data && orderDetails.order_data.map((element, index) => (
                                            <tr key={index}>
                                                <td>{element.product_name}</td>
                                                <td>{element.price}</td>
                                                <td>{element.date}</td>
                                            </tr>
                                        ))}
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
