import React, { useContext, useEffect, useState } from 'react';
import Authlayout from './layouts/Authlayout';
import { titleContext } from '../contextApis/TitleContext';
import Cookies from 'js-cookie';

function AllOrders() {
    const title = useContext(titleContext);
    const [allOrders, setallOrders] = useState([]);
    const [search, setsearch] = useState('');
    useEffect(() => {
        title.settitle('Orders')
        getAllOrders();
    }, []);
    const getAllOrders = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/get-all-orders`, {
            headers: {
                'Authorization': Cookies.get('secret_token')
            }
        })
            .then(async response => {
                let data = await response.json();
                setallOrders(data.data);
            })
            .catch(error => console.log(error));
    }
    const onchangeSearchHandler = (e) => {
        setsearch(e.target.value);
        let searchInput = e.target.value;
        let input = searchInput.toLowerCase();
        let table = document.getElementById('table');
        let rows = table.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) {  // Start from 1 to skip the header row
            let cells = rows[i].getElementsByTagName('td');
            let rowContainsSearchTerm = false;

            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().includes(input)) {
                    rowContainsSearchTerm = true;
                    break;
                }
            }

            if (rowContainsSearchTerm) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
    return (
        <Authlayout>
            <div className="row">
                <div className="col-md-12 text-end">
                    <input type="text" className="w-25 form-control d-inline-block m-2" placeholder='Search' value={search} onChange={(e) => { onchangeSearchHandler(e) }} />
                </div>
                <div className="col-md-12">
                    <table className="table" id='table'>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allOrders && allOrders.length > 0 ? (
                                    allOrders.map((elements, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{elements.name}</td>
                                                <td>{elements.email}</td>
                                                <td>{elements.phone}</td>
                                                <td>{elements.product_name}</td>
                                                <td>{elements.price}</td>
                                                <td>{elements.date}</td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={7} className='text-center'>No Record Found</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Authlayout>
    );
}

export default AllOrders;
