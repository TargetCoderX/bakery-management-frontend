import React, { useContext, useEffect, useState } from 'react';
import Authlayout from './layouts/Authlayout';
import { titleContext } from '../contextApis/TitleContext';
import Cookies from 'js-cookie';

function Billing() {
    const title = useContext(titleContext);
    const [form, setform] = useState([{ 'product': '', 'quantity': 1, 'sub_total': 0, 'single_price': 0 }]);
    const [products, setproducts] = useState([]);
    const [customerNumber, setcustomerNumber] = useState('');
    const [customerData, setCustomerData] = useState({ name: '', email: '', address: '' });
    useEffect(() => {
        title.settitle('Billing');
        getProducts();
    }, []);

    const addNewItems = (e) => {
        e.preventDefault();
        setform([...form, { 'product': '', 'quantity': 1, 'sub_total': 0, 'single_price': 0 }])
    }
    const deleteProduct = (e, index) => {
        e.preventDefault();
        const newform = [...form];
        if (newform.length > 1) {
            newform.splice(index, 1);
            setform(newform);
        }
    }

    const getProducts = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/get-all-products`, {
            headers: {
                'Authorization': Cookies.get('secret_token')
            }
        })
            .then(async response => {
                let data = await response.json();
                setproducts(data.data);
            })
            .catch(error => console.log(error));
    }
    const handleItemChange = (e, parentIndex) => {
        const { name, value } = e.target;
        const formData = [...form];
        if (name === 'product')
            formData[parentIndex] = { ...formData[parentIndex], 'single_price': e.target.selectedOptions[0].dataset.product_price }
        formData[parentIndex] = { ...formData[parentIndex], [name]: value };
        const subtotal = formData[parentIndex].single_price * formData[parentIndex].quantity;
        formData[parentIndex] = { ...formData[parentIndex], 'sub_total': subtotal };
        setform(formData);
    }
    const handleCustomerDataChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value })
    }
    return (
        <Authlayout>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Phone Number</label>
                                <input type="text" value={customerNumber} onChange={(e) => { setcustomerNumber(e.target.data) }} placeholder='Customer phone number' className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Customer Name</label>
                                <input type="text" value={customerData.name} name='name' onChange={(e) => { handleCustomerDataChange(e) }} placeholder='Customer phone number' className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Customer Email</label>
                                <input type="text" value={customerData.email} name='email' onChange={(e) => { handleCustomerDataChange(e) }} placeholder='Customer phone number' className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Customer Address</label>
                                <input type="text" value={customerData.address} name='address' onChange={(e) => { handleCustomerDataChange(e) }} placeholder='Customer phone number' className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-12 mt-4">
                            <div className="d-flex justify-content-between align-items-end mb-4">
                                <label htmlFor="" className="form-label">Add Products</label>
                                <button className="btn btn-success" onClick={(e) => { addNewItems(e) }}>Add Product</button>
                            </div>

                            <form>
                                {form && form.map((element, index) => (
                                    <div className="row">
                                        <div className="col-md-3 mb-2">
                                            <div className="form-group">
                                                <lable className="form-label">Product</lable>
                                                <select name="product" className="form-control" value={element.product} onChange={(e) => { handleItemChange(e, index) }}>
                                                    <option value="" style={{ 'display': 'none' }}>Select Product</option>
                                                    {
                                                        products && products.map((element) => (
                                                            <option data-product_code={element.code} data-product_price={element.price}>{element.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-2">
                                            <div className="form-group">
                                                <lable className="form-label">Quantity</lable>
                                                <input type="number" value={element.quantity} onChange={(e) => { handleItemChange(e, index) }} min={1} step={1} className="form-control" name='quantity' />
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-2">
                                            <div className="form-group">
                                                <lable className="form-label">Price</lable>
                                                <input type="text" value={element.single_price * element.quantity} name='sub_total' readOnly={false} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-2 d-flex align-items-end justify-content-center">
                                            <div className="form-group">
                                                <button type='button' className="btn btn-danger" onClick={(e) => { deleteProduct(e, index) }}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </Authlayout >
    );
}

export default Billing;
