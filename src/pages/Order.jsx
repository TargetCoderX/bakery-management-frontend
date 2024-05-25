import React, { useContext, useEffect, useRef, useState } from 'react';
import Authlayout from './layouts/Authlayout';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { titleContext } from '../contextApis/TitleContext';
const ExcelJS = require('exceljs');


function Order() {
    const params = useParams();
    const [year, setyear] = useState(new Date().getFullYear());
    const [orderDetails, setorderDetails] = useState({});
    const [lastYears, setlastYears] = useState([]);
    const title = useContext(titleContext);
    const total = useRef(0);
    const fetchOrderDetails = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/get-customer-order-data/${params.customer_id}/${year}`, {
            headers: {
                'Authorization': Cookies.get('secret_token')
            }
        })
            .then(async response => {
                let data = await response.json();
                total.current = 0;
                let object = {
                    "customer_name": data.customer_data.name,
                    "phone": data.customer_data.phone,
                    "address": data.customer_data.address,
                    "email": data.customer_data.email,
                    "order_data": data.data,
                }
                /* getting total */
                data.data.forEach(element => {
                    total.current += element.price;
                });
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
    const handleYearChange = (e) => {
        let value = e.target.value;
        setyear(value);
    }

    useEffect(() => {
        title.settitle("Customer Order");
        getYearArray();
        fetchOrderDetails();
    }, [year]);

    const convertExcel = () => {
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Bakery Management System';
        workbook.lastModifiedBy = 'Bakery Management System';
        workbook.created = new Date(new Date().getFullYear().toString(), new Date().getMonth().toString(), new Date().getDate().toString());
        workbook.modified = new Date();
        workbook.lastPrinted = new Date(new Date().getFullYear().toString(), new Date().getMonth().toString(), new Date().getDate().toString());
        workbook.properties.date1904 = true;
        const sheet = workbook.addWorksheet('Bakert Management System');
        sheet.columns = [
            {
                'header': 'Product Name',
                'key': 'product_name',
                'width': 10,
            },
            {
                'header': 'Price',
                'key': 'price',
                'width': 10,
            },
            {
                'header': 'Date',
                'key': 'date',
                'width': 10,
            },
        ];
        orderDetails.order_data.map((result) => {
            return sheet.addRow({
                'product_name': result.product_name,
                'price': result.price,
                'date': result.date,
            });
        })
        workbook.xlsx.writeBuffer().then(async (data) => {
            const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const objectUrl = window.URL.createObjectURL(blob);
            const anchore = document.createElement('a')
            anchore.href = objectUrl;
            anchore.download = "myfile.xlsx";
            anchore.click();
            window.URL.revokeObjectURL(objectUrl);
        })
    }

    return (
        <Authlayout>
            <div>
                <div className="row g-2 align-items-center">
                    <div className="col-8">
                        <h2 className="page-title m-2">
                            Orders of {orderDetails.customer_name}
                        </h2>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Year</label>
                            <select name="" id="" className="form-control" value={year} onChange={(e) => { handleYearChange(e) }}>
                                {lastYears && lastYears.map((element, index) => (
                                    <option value={element} key={index}>{element}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary mt-4" onClick={(e) => { convertExcel(e) }}>Convert Excel</button>
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="table-responsive">
                                <table className="table table-vcenter card-table table-striped">
                                    <thead>
                                        <tr>
                                            <th>SL.No</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Date of purchase</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetails.order_data && orderDetails.order_data.length > 0 ? (orderDetails.order_data.map((element, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{element.product_name}</td>
                                                    <td>{element.quantity}</td>
                                                    <td>{element.price}</td>
                                                    <td>{element.date}</td>
                                                </tr>
                                            )
                                        }

                                        )) : (
                                            <tr>
                                                <td className='text-center' colSpan={4}>No Record Found</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td colSpan={2} style={{ 'fontSize': '20px', 'fontWeight': 'bold' }} className='text-center'>Total </td>
                                            <td colSpan={2} style={{ 'fontSize': '20px', 'fontWeight': 'bold' }} className='text-center'>{total.current}</td>
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
