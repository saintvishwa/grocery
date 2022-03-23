import { useState } from 'react';
import './bootstrap.min.css';
import './App.css';
import axios from 'axios';

const AddOrder = () => {
    const [date,setDate] = useState('');
    const [skuid,setSkuid] = useState('');
    const [orderid,setOrderid] = useState('');
    const [productName,setProductName] = useState('');
    const [origin,setOrigin] = useState('');
    const [price,setPrice] = useState('');
    const [store1,setStore1] = useState(0);
    const [store2,setStore2] = useState(0);
    const [store3,setStore3] = useState(0);

    const addOrder = () =>{
        axios.post("http://localhost:8000/add",{
            date:date,
            skuid:skuid,
            orderid:orderid,
            productName:productName,
            origin:origin,
            price:price,
            store1order:store1,
            store2order:store2,
            store3order:store3
        });
    };

    return ( 
        <div className='add-order'>
            <h2 className='page-header lead'>Add An Order</h2>
            <form className='form'>

                <div className='col-sm-6'>
                    <label>Date</label>
                    <input className='form-control' type="date" placeholder='Choose A Date' onChange={(event) =>{
                        setDate(event.target.value);
                    }} required/>
                </div><br/>

                <div className='col-sm-6'>
                    <label>SKUID</label>
                    <input className='form-control' type="text" placeholder='Enter SKUID' onChange={(event) =>{
                        setSkuid(event.target.value);
                    }} required/>
                </div><br/>

                <div className='col-sm-6'>
                    <label>Order ID</label>
                    <input className='form-control' type="text" placeholder='Enter Order ID' onChange={(event) =>{
                        setOrderid(event.target.value);
                    }} required/>
                </div><br/>

                <div className='col-sm-6'>
                    <label>Product Name</label>
                    <input className='form-control' type="text" placeholder='Enter Product Name' onChange={(event) =>{
                        setProductName(event.target.value);
                    }} required/>
                </div><br/>

                <div className='col-sm-6'>
                    <label>Origin</label>
                    <input className='form-control' type="text" placeholder='Enter Origin' onChange={(event) =>{
                        setOrigin(event.target.value);
                    }} required/>
                </div><br/>

                <div className='col-sm-6'>
                    <label>Price USD($)</label>
                    <input className='form-control' type="number" placeholder='Enter Price In USD($)' onChange={(event) =>{
                        setPrice(event.target.value);
                    }} required/>
                </div><br/>

                <div className='col-sm-6'>
                    <label>Store 1 Order</label>
                    <input className='form-control' type="number" placeholder='Enter Store 1 Order' onChange={(event) =>{
                        setStore1(event.target.value);
                    }} required/>
                </div><br/>

                <div className='col-sm-6'>
                    <label>Store 2 Order</label>
                    <input className='form-control' type="number" placeholder='Enter Store 2 Order' onChange={(event) =>{
                        setStore2(event.target.value);
                    }} required/>
                </div><br/>

                <div className='col-sm-6'>
                    <label>Store 3 Order</label>
                    <input className='form-control' type="number" placeholder='Enter Store 3 Order' onChange={(event) =>{
                        setStore3(event.target.value);
                    }} required/>
                </div><br/>

                <button type="submit" className="btn btn-info" onClick={addOrder}>Add Order</button>
                <a href="/" className="btn btn-default">Cancel</a>
            </form>
        </div>
     );
}
 
export default AddOrder;