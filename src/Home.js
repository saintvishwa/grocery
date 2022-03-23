import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.min.css';

const Home = () => {

    const [orderList,setOrderList] = useState([]);
    const [buyerOrder,setbuyerOrder] = useState('');
    const [searchProduct,setProduct] = useState('');
    const [searchId,setID] = useState('');
   // const [newOrderList,setNewList] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:8000").then((response)=>{
            setOrderList(response.data);
        });
    },[]);

    const updateOrder = (id) => {
        axios.put("http://localhost:8000/update",{
            buyerOrder:buyerOrder,
            id:id
        });
    };

    return (
        <div className='App'>
            <h4 className='page-header'>BUYER DASHBOARD</h4>

            <form className='form row'>
                <div className='col col-sm-4'>

                    <input className='form-control' type="search" placeholder='Search By SKUID' onChange={(event) =>{
                        setID(event.target.value);
                    }}/>

                    <input className='form-control' type="search" placeholder='Search By PRODUCT NAME' onChange={(event) =>{
                        setProduct(event.target.value);
                    }}/>
                </div>
            </form><br/>

            { orderList.filter((val) => {
                if(searchProduct === '' && searchId === '') {
                    return val;
                } else if(val.productName.toLowerCase().includes(searchProduct.toLowerCase())) {
                    return val;
                }
            }).filter((val) => {
                if(val.skuid.toLowerCase().includes(searchId.toLowerCase())) {
                    return val;
                }
            }).map((val,key) => {
                return(
                    <div key={key} className="orders">
                        <table className='table table-secondary table-bordered table-hover'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Date</th>
                                    <th>SKUID</th>
                                    <th>Order ID</th>
                                    <th>Product Name</th>
                                    <th>Origin</th>
                                    <th>Price USD($)</th>
                                    <th>Store 1 Order</th>
                                    <th>Store 2 Order</th>
                                    <th>Store 3 Order</th>
                                    <th>Buyer Order</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="checkbox"/></td>
                                    <td>{val.date}</td>
                                    <td>{val.skuid}</td>
                                    <td>{val.orderid}</td>
                                    <td>{val.productName}</td>
                                    <td>{val.origin}</td>
                                    <td>{val.price}</td>
                                    <td>{val.store1order}</td>
                                    <td>{val.store2order}</td>
                                    <td>{val.store3order}</td>
                                    <td><input type="number" value={val.buyerOrder} required onChange={(event) => {
                                        setbuyerOrder(event.target.value);
                                    }}/></td>
                                    <td><button className='btn btn-primary' type='submit' onClick={() => updateOrder(val._id)}>Submit Order</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })
            }
            <button className='btn btn-primary' type='submit'>Save Draft</button>
            <a href='/add' className='btn btn-primary'>Add Order</a>
            <a href='/edit' className='btn btn-primary'>Edit order</a>
            <a href='/delete' className='btn btn-primary'>Delete Order</a>
            <button className='btn btn-primary' type='submit'>Logout</button>
        </div>
      );
}
 
export default Home;
