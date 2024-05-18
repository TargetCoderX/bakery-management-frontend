import React, { useContext, useEffect, useState } from 'react';
import Authlayout from './layouts/Authlayout';
import { titleContext } from '../contextApis/TitleContext';
import Cookies from 'js-cookie';
import InfiniteScroll from 'react-infinite-scroll-component';
import { showConfirmAlert } from '../helpers/commonhelper';
import { toast } from 'react-toastify';

function Dashboard() {
    const title = useContext(titleContext);
    const [customerData, setcustomerData] = useState([]);
    const [page, setPage] = useState(1);
    const [total_records, setTotalRecords] = useState(0);
    /* setting page title using use context */
    useEffect(() => {
        title.settitle('Dashboard')
        customerDataApi(page);
    }, []);

    const customerDataApi = (pageNumber, blank_array = false) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/get-customers?page=${pageNumber}`, {
            method: 'GET',
            headers: {
                'Authorization': Cookies.get('secret_token'),
            },
        })
            .then(async response => {
                let data = await response.json()
                if (data.status == 1) {
                    if (!blank_array)
                        setcustomerData([...customerData, ...data.data])
                    else
                        setcustomerData(data.data);
                    setTotalRecords(data.total_count);
                    setPage(pageNumber + 1);
                }
            })
            .catch(error => console.log(error));
    }

    const deleteCustomers = (customer_id) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/delete-customer/${customer_id}`, {
            headers: {
                'Authorization': Cookies.get('secret_token'),
            },
        })
            .then(async response => {
                const result = await response.json();
                if (result.status == 1) {
                    toast.success(result.message);
                    customerDataApi(1, true);
                } else {
                    toast.error(result.message);
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <Authlayout>
            <div>
                <div className="row g-2 align-items-center">
                    <div className="col">
                        <h2 className="page-title m-2">
                            Cuatomer Data ({customerData.length} out of {total_records} showing)
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <InfiniteScroll
                                    dataLength={customerData.length}
                                    next={() => { customerDataApi(page) }}
                                    hasMore={total_records !== customerData.length}
                                    loader={<h4>Loading...</h4>}
                                >
                                    <table className="table">
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
                                            {customerData.map((element, index) => (
                                                <tr key={index}>
                                                    <td style={{ 'width': '5%' }}>{index + 1}</td>
                                                    <td style={{ 'width': '15%' }}>{element.name}</td>
                                                    <td style={{ 'width': '15%' }}>{element.address}</td>
                                                    <td style={{ 'width': '15%' }}>{element.phone}</td>
                                                    <td style={{ 'width': '15%' }}>{element.email}</td>
                                                    <td style={{ 'width': '20%' }}>
                                                        <button className="btn btn-success m-2 btn-sm" style={{ "width": "100px" }}>View Orders</button>
                                                        <button className="btn btn-danger m-2 btn-sm" onClick={() => { showConfirmAlert(() => { deleteCustomers(element.id) }, "Confirm to delete", "Once deleted, you cannot recover this any more !") }} style={{ "width": "100px" }}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </InfiniteScroll>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Authlayout>
    );
}

export default Dashboard;
