import React, { useContext, useEffect, useState } from 'react';
import Authlayout from './layouts/Authlayout';
import { titleContext } from '../contextApis/TitleContext';
import Cookies from 'js-cookie';
import InfiniteScroll from 'react-infinite-scroll-component';
import { showConfirmAlert } from '../helpers/commonhelper';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Dashboard() {
    const title = useContext(titleContext);
    const [customerData, setcustomerData] = useState([]);
    const [page, setPage] = useState(1);
    const [total_records, setTotalRecords] = useState(0);
    const [searchKey, setsearchKey] = useState("");
    const [newCustomer, setnewCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
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

    const search = (e) => {
        let searchKeyLocal = e.target.value;
        setsearchKey(searchKeyLocal)
        if (searchKeyLocal !== '') {
            fetch(`${process.env.REACT_APP_SERVER_URL}/search-customer?search_key=${searchKeyLocal}`, {
                headers: {
                    "Authorization": Cookies.get('secret_token')
                }
            })
                .then(async response => {
                    let data = await response.json();
                    setPage(0);
                    setTotalRecords(data.total_count);
                    setcustomerData(data.data);
                })
                .catch(error => console.log(error));
        } else {
            console.log(searchKeyLocal);
            customerDataApi(1, true);
        }
    }

    const newCustomerONChangeHandle = (e) => {
        const { name, value } = e.target;
        setnewCustomer({ ...newCustomer, [name]: value })
    }

    const submitNewCustomer = (e) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/add-customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('secret_token'),
            },
            body: JSON.stringify(newCustomer)
        })

            .then(async response => {
                let data = await response.json();
                if (data.status === 1) {
                    toast.success(data.message);
                    customerDataApi(1, true);
                } else {
                    toast.error(data.message);
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <Authlayout>
            <div>
                <div class="page-header d-print-none">
                    <div class="container-xl">
                        <div class="row g-2 align-items-center">
                            <div class="col">
                                <div class="page-pretitle">
                                    Overview
                                </div>
                                <h2 class="page-title">
                                    Dashboard
                                </h2>
                            </div>
                            <div class="col-auto ms-auto d-print-none">
                                <div class="btn-list">
                                    <button class="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal" data-bs-target="#modal-add-customer">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 5l0 14"></path><path d="M5 12l14 0"></path></svg>
                                        New Customer
                                    </button>
                                    <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                                        <div className="input-icon">
                                            <span className="input-icon-addon">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24"
                                                    strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                                    <path d="M21 21l-6 -6" />
                                                </svg>
                                            </span>
                                            <input type="text" onChange={(e) => { search(e) }} value={searchKey} className="form-control" placeholder="Search…" aria-label="Search in website" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                    <td style={{ 'width': '15% !important' }}>{element.phone}</td>
                                                    <td style={{ 'width': '15%' }}>{element.email}</td>
                                                    <td style={{ 'width': '45%', 'display': 'flex' }} >
                                                        <Link to={`/orders/${element.id}`} className="btn btn-success m-2" style={{ "width": "100px" }}>View Orders</Link>
                                                        <button className="btn btn-info m-2" onClick={() => { showConfirmAlert(() => { deleteCustomers(element.id) }, "Confirm to delete", "Once deleted, you cannot recover this any more !") }} style={{ "width": "100px" }}>New Bill</button>
                                                        <button className="btn btn-danger m-2" onClick={() => { showConfirmAlert(() => { deleteCustomers(element.id) }, "Confirm to delete", "Once deleted, you cannot recover this any more !") }} style={{ "width": "100px" }}>Delete</button>
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
            <div class="modal modal-blur fade" id="modal-add-customer" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">New Customer</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input type="text" class="form-control" value={newCustomer.name} onChange={(e) => { newCustomerONChangeHandle(e) }} name="name" placeholder="Customer Name" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="text" class="form-control" value={newCustomer.email} onChange={(e) => { newCustomerONChangeHandle(e) }} name="email" placeholder="Customer Email" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Phone</label>
                                <input type="text" class="form-control" value={newCustomer.phone} onChange={(e) => { newCustomerONChangeHandle(e) }} name="phone" placeholder="Customer Phone" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Address</label>
                                <input type="text" class="form-control" value={newCustomer.address} onChange={(e) => { newCustomerONChangeHandle(e) }} name="address" placeholder="Customer Address" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-link link-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button class="btn btn-primary ms-auto" data-bs-dismiss="modal" onClick={(e) => { submitNewCustomer(e) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                Create new customer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Authlayout>
    );
}

export default Dashboard;
