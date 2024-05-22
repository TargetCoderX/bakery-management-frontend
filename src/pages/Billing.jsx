import React, { useContext, useEffect, useState } from 'react';
import Authlayout from './layouts/Authlayout';
import { titleContext } from '../contextApis/TitleContext';

function Billing() {
    const title = useContext(titleContext);
    const [form, setform] = useState([{ 'product': '', 'quantity': 1, 'price': 0 }]);
    useEffect(() => {
        title.settitle('Billing');
    }, []);

    const addNewItems = (e) => {
        e.preventDefault();
        setform([...form, { 'product': '', 'quantity': 1, 'price': 0 }])
    }
    const deleteProduct = (e, index) => {
        e.preventDefault();
        const newform = [...form];
        newform.splice(index, 1);
        setform(newform);
    }
    return (
        <Authlayout>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Customer Name</label>
                                <select name="customer_name" id="customer_name" className="form-control">
                                    <option value="" style={{ "display": 'none' }}>Select Option</option>
                                </select>
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
                                                <select name="product" className="form-control" value={element.product}>
                                                    <option value="" style={{ 'display': 'none' }}>Select Product</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-2">
                                            <div className="form-group">
                                                <lable className="form-label">Quantity</lable>
                                                <input type="number" value={element.quantity} min={1} step={1} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-2">
                                            <div className="form-group">
                                                <lable className="form-label">Price</lable>
                                                <input type="text" value={element.price} readOnly={true} className="form-control" />
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
            </div>
        </Authlayout>
    );
}

export default Billing;
