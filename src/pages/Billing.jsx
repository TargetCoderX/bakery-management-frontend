import React, { useContext, useEffect, useRef, useState } from 'react';
import Authlayout from './layouts/Authlayout';
import { titleContext } from '../contextApis/TitleContext';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function Billing() {
    const title = useContext(titleContext);
    const [form, setform] = useState([{ 'product': '', 'product_id': '', 'quantity': 1, 'sub_total': 0, 'single_price': 0 }]);
    const [products, setproducts] = useState([]);
    const [customerData, setCustomerData] = useState({ id: 0, name: '', phone: '', email: '', address: '' });
    const disableCustomerEntry = useRef(true);
    const [billNumber, setbillNumber] = useState('');
    const [programetacillySetPhone, setprogrametacillySetPhone] = useState(false);
    const searchButton = useRef(null);
    const params = useParams();
    useEffect(() => {
        title.settitle('Billing');
        getProducts();
        setbillNumber((Math.floor(Math.random() * 1000) + 1).toString().padStart(6, '0'))
        if (params.phone_number !== undefined) {
            setCustomerData({ ...customerData, 'phone': params.phone_number });
            setprogrametacillySetPhone(true);
        }
    }, []);
    useEffect(() => {
        if (params.phone_number !== undefined) {
            searchButton.current.click();
        }
    }, [programetacillySetPhone])
    const addNewItems = (e) => {
        e.preventDefault();
        setform([...form, { 'product': '', 'product_id': '', 'quantity': 1, 'sub_total': 0, 'single_price': 0 }])
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
            formData[parentIndex] = { ...formData[parentIndex], 'single_price': e.target.selectedOptions[0].dataset.product_price, 'product_id': e.target.selectedOptions[0].dataset.product_id }
        formData[parentIndex] = { ...formData[parentIndex], [name]: value };
        const subtotal = formData[parentIndex].single_price * formData[parentIndex].quantity;
        formData[parentIndex] = { ...formData[parentIndex], 'sub_total': subtotal };
        setform(formData);
    }
    const handleCustomerDataChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value })
    }
    const customerNumberHandler = (e) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/get-customer-by-phone/${customerData.phone}`, {
            headers: {
                'Authorization': Cookies.get('secret_token'),
            }
        })
            .then(async response => {
                let data = await response.json();
                let userData = {};
                if (data.status) {
                    if (data.data) {
                        // const { id, ...rest } = data.data;
                        userData = data.data;
                        toast.success('User found with this phone number. We have field the details for you')
                        disableCustomerEntry.current = true;
                    }
                    else {
                        toast.error('No user found, Please create a new one.')
                        userData = { ...customerData, 'name': '', 'email': '', 'address': '', 'id': 0 };
                        disableCustomerEntry.current = false;
                    }

                    setCustomerData(userData);
                }
            })
            .catch(error => console.log(error));
    }
    const checkCondition = () => {
        return Object.values(customerData).some(value => value === '') || form.some(element => {
            return element.product === '' ||
                element.quantity === 0 ||
                element.sub_total === 0 ||
                element.single_price === 0
        });
    }
    const handleBillingSubmit = (e) => {
        e.preventDefault();
        let data = {
            'customer_data': customerData,
            'is_customer': disableCustomerEntry.current,
            'bill': form,
        }
        fetch(`${process.env.REACT_APP_SERVER_URL}/save-bill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Cookies.get('secret_token'),
            },
            body: JSON.stringify(data)
        })
            .then(async response => {
                let data = await response.json();
                toast.success(data.message);
                setform([{ 'product': '', 'product_id': '', 'quantity': 1, 'sub_total': 0, 'single_price': 0 }]);
                setCustomerData({ id: 0, name: '', phone: '', email: '', address: '' });
            })
            .catch(error => console.log(error));
    }
    const allTotalBillingCounter = () => {
        let total = 0;
        form && form.map((element) => {
            return total += element.sub_total
        })
        return total;
    }
    return (
        <Authlayout>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 d-flex align-items-end justify-content-between">
                            <h2>Bill Number: {billNumber}</h2>
                            <h2>Total Amount: ₹{allTotalBillingCounter(0)}</h2>
                        </div>
                        <div className="col-md-12 mb-2">
                            <div className="row align-items-end justify-content-center">
                                <div className="col-10">
                                    <div className="form-group">
                                        <label htmlFor="" className="form-label">Phone Number</label>
                                        <input type="text" value={customerData.phone} onChange={(e) => { setCustomerData({ ...customerData, 'phone': e.target.value }) }} placeholder='Customer phone number' className="form-control" />
                                    </div>
                                </div>
                                <div className="col">
                                    <button className="btn btn-info" ref={searchButton} onClick={(e) => { customerNumberHandler(e) }} >Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Customer Name</label>
                                <input type="text" value={customerData.name} name='name' readOnly={disableCustomerEntry.current} onChange={(e) => { handleCustomerDataChange(e) }} placeholder='Customer name' className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Customer Email</label>
                                <input type="email" value={customerData.email} name='email' readOnly={disableCustomerEntry.current} onChange={(e) => { handleCustomerDataChange(e) }} placeholder='Customer email' className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Customer Address</label>
                                <input type="text" value={customerData.address} name='address' readOnly={disableCustomerEntry.current} onChange={(e) => { handleCustomerDataChange(e) }} placeholder='Customer address' className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-12 mt-4">
                            <div className="d-flex justify-content-between align-items-end mb-4">
                                <label htmlFor="" className="form-label">Add Products</label>
                                <button className="btn btn-success" onClick={(e) => { addNewItems(e) }}>Add Product</button>
                            </div>

                            <form onSubmit={(e) => { handleBillingSubmit(e) }}>
                                {form && form.map((element, index) => (
                                    <div className="row">
                                        <div className="col-md-3 mb-2">
                                            <div className="form-group">
                                                <lable className="form-label">Product</lable>
                                                <select name="product" className="form-control" value={element.product} onChange={(e) => { handleItemChange(e, index) }}>
                                                    <option value="" style={{ 'display': 'none' }}>Select Product</option>
                                                    {
                                                        products && products.map((element) => (
                                                            <option data-product_code={element.code} data-product_id={element.id} data-product_price={element.price}>{element.name}</option>
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
                                                <input type="text" value={element.single_price * element.quantity} name='sub_total' readOnly={true} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-2 d-flex align-items-end justify-content-center">
                                            <div className="form-group">
                                                <button type='button' className="btn btn-danger" onClick={(e) => { deleteProduct(e, index) }}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-3 text-center">
                                    <button type='submit' className="btn btn-primary" disabled={checkCondition()} >Create Bill</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </Authlayout >
    );
}

export default Billing;
