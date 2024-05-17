import React, { useContext, useEffect, useState } from 'react';
import Authlayout from './layouts/Authlayout';
import { titleContext } from '../contextApis/TitleContext';
import Cookies from 'js-cookie';
import InfiniteScroll from 'react-infinite-scroll-component';

function Dashboard() {
    const title = useContext(titleContext);
    const [customerData, setcustomerData] = useState([]);
    const [page, setPage] = useState(0);
    const [total_records, setTotalRecords] = useState(0);
    /* setting page title using use context */
    useEffect(() => {
        title.settitle('Dashboard')
        fetchCustomerData();
    }, []);

    const fetchCustomerData = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/get-customers?page=${page + 1}`, {
            method: 'GET',
            headers: {
                'Authorization': Cookies.get('secret_token'),
            },
        })
            .then(async response => {
                let data = await response.json()
                if (data.status == 1) {
                    setcustomerData([...customerData, ...data.data])
                    setTotalRecords(data.total_count);
                    setPage(page + 1);
                }
            })
            .catch(error => console.log(error));
    }
    const fetchMoreData = () => {
        fetchCustomerData();
    }
    return (
        <Authlayout>
            <div>
                <div className="row g-2 align-items-center">
                    <div className="col">
                        <h2 className="page-title m-2">
                            Cuatomer Data
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <InfiniteScroll
                                    dataLength={customerData.length}
                                    next={() => { fetchMoreData() }}
                                    hasMore={total_records !== customerData.length}
                                    loader={<h4>Loading...</h4>}
                                >
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
                                            {customerData.map((element, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{element.name}</td>
                                                    <td>{element.address}</td>
                                                    <td>{element.phone}</td>
                                                    <td>{element.email}</td>
                                                    <td>
                                                        <button className="btn btn-warning">View Orders</button>
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
