import { logDOM } from '@testing-library/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.min.css';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Checkbox, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import Anagram from "react-anagram-animation";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const Home = () => {

    const [orderList,setOrderList] = useState([]);
    const [buyerOrder,setbuyerOrder] = useState("");
    const [buyerOrder2,setbuyerOrder2] = useState([]);

    const [searchProduct,setProduct] = useState('');
    const [searchId,setID] = useState('');
   // const [newOrderList,setNewList] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:8000").then((response)=>{
            
            var list2 =  response.data.map(
                    (d) => (
                        {...d, select:false })
                    
                    );
                   
                    console.log(list2);
                   setOrderList(list2);
        
            });
    },[]);
    

//for delete items from state and delete api
    const deleteId =() =>{
        let arrayIds = [];
        orderList.forEach(d => {
            if(d.select) {
                arrayIds.push(d._id);
                
            }
        });
        if(arrayIds.length===0){
            //if no items selected
            alert("please select atleast 1 order !!" );
        }else{

            //api for delete the data in database 
            axios.delete(`http://localhost:8000/delete/${arrayIds}`).then((response) => {
            if(response.status == 200) {
                //document.getElementById('delete').innerHTML = 'Order Deleted Successfully';
            }
            }).catch(error => 
            alert(error)
        );
        }
        console.log("delete :" + arrayIds);

//for delete state data 
           let list4 =  orderList.filter( (d)=>{
                return d.select == false;
            });
            console.log("new list :"+list4);
            setOrderList(list4);      
    }
    const updateOrder = (id) => {
        axios.put("http://localhost:8000/update",{
            buyerOrder:buyerOrder,
            id:id
        });
    };

// update data after submit
const updateData =() =>{
        let arrayIds = [];
        let arrayOds = [];
        let array = [];

        orderList.forEach(d => {
            if(d.select) {
                
                let obj = {};
                obj.id = d._id;
                arrayIds.push(d._id);
                arrayOds.push(d.buyerOrder);
                obj.buyerOrder = d.buyerOrder;
                array.push(JSON.stringify(obj));
                
            }
        });
        console.log(arrayIds);
        console.log(arrayOds);
        // remove checkbox after updating automatically
        

//api for update the data in database 
        if(arrayIds.length===0){
            alert(" Please select atleast one order!!!");
        }else{
            axios.post(`http://localhost:8000/update/${arrayIds}&${arrayOds}`).then((response) => {
                    if(response.status == 200) {
                        //document.getElementById('delete').innerHTML = 'Order Deleted Successfully';
                    }
                }).catch(error => 
                    alert(error)
                ); 
            }
         
    }
//----------------------------------------logout-----------------------
const logout = () => {
    //localStorage.clear();
    window.location.href = "/login";
};

//----------------------------------------to generate pdf -----------------------------------------------
    const generatepdf =() =>{

        var columns = [
            { title: "Date", dataKey: "Date" },
            { title: "SKUID", dataKey: "SKUID" },
            { title: "Order_ID", dataKey: "Order_ID" },
        { title: "Product_Name", dataKey: "Product_Name" },
            { title: "Origin", dataKey: "Origin" },
            ];

            var arrayg  = [];
            orderList.map((d)=>{
                if(d.select){
                    arrayg.push(d);
                }
            })

            var rows = arrayg.map((d)=>{
                return { Date: d.date, SKUID: d.skuid, Order_ID : d.orderid , Product_Name:d.productName, Origin: d.origin  };
            
            })
        
            
            var columns1 = [
            
            { title: "Store_1_Order", dataKey: "Store_1_Order" },
            { title: "Price_$", dataKey: "Price_$" },
            { title: "Store_2_Order", dataKey: "Store_2_Order" },
            { title: "Store_3_Order", dataKey: "Store_3_Order" },
            { title: "Buyer_Order", dataKey: "Buyer_Order" }
            ]
            
            var rows1 =  arrayg.map((d)=>{
               
                return { Store_1_Order:d.store1order ,Price_$:d.price , Store_2_Order:d.store2order , Store_3_Order:d.store3order , Buyer_Order:d.buyerOrder };

                })
            
            var today = new Date();
                var date = today.getFullYear()+"."+today.getMonth()+"."+today.getDate();
            var doc = new jsPDF('p', 'pt');
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.text("Order report", 10, 20);
            doc.text(`date: ${date}`, 10, 50);
            
            doc.autoTable(columns, rows, {
                startY: doc.autoTableEndPosY() + 70,
                margin: { horizontal: 10 },
                styles: { overflow: 'linebreak' },
                bodyStyles: { valign: 'center', halign: 'middle' },
                columnStyles: { email: { columnWidth: 'wrap' } },
                theme: "striped"
            });
            
            doc.autoTable(columns1, rows1, {
                startY: doc.autoTableEndPosY() + 70,
                margin: { horizontal: 10 },
                styles: { overflow: 'linebreak' },
                bodyStyles: { valign: 'middle', halign: 'middle' },
                columnStyles: { email: { columnWidth: 'wrap' } },
                theme: "striped"
            }); 
            doc.save('repro.pdf');


    }
//-----------------------------------structure part ------------------------------------------------------------------------
    return (
        <div className='App mx-5'>
        <div className='d-flex flex-row justify-content-between'>
            <div className='p-2 flex-fill'>
            <form className=''>
                <div className='col col-sm-6'>

                    <TextField variant='outlined' label="SKUID" fullWidth className='search mt-5 ' type="search" placeholder='Search By SKUID' onChange={(event) =>{
                        setID(event.target.value);
                    }}/>

                    <TextField variant='outlined' label="PRODUCT NAME" fullWidth className='search mt-5' type="search" placeholder='Search By PRODUCT NAME' onChange={(event) =>{
                        setProduct(event.target.value);
                    }}/>
                </div>
            </form>
            </div>
            <div className='p-2 flex-fill d-flex flex-row'>
                    <div className='ani align-self-center flex-fill text-center'>
                    <Anagram
                            words={["canspirit", "tirinascp"]}
                            
                            animationOptions={{
                                        waitToStart: 1000,
                                        randomStartMin: 0,
                                        randomStartMax: 0,
                                        randomReverseMin: 6000,
                                        randomReverseMax: 6000,
                                        loopAnimation: 20000
                                        }}
                        />

                    </div>
            </div>
        </div>
            <br/>
            <div className="orders">
                        <table className='table align-middle table-hover'>
                            <thead>
                                <tr className='table-dark'>
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
                               </tr>
                            </thead>
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
                    
                                    <tbody key={key} className="">
                                        <tr>
                                            <td><Checkbox type="checkbox" onChange={(e)=>{
                                                let checked = e.target.checked;
                                                var list3 =  orderList.map((d) => {
                                                    if(d._id==val._id){ d.select = checked;}
                                                    return d;
                                                    
                                                });
                                                
                                                console.log(list3);
                                                setOrderList(list3);
                                                                                        
                                                    
                                            }} checked={val.select}/></td>
                                            <td>{val.date}</td>
                                            <td>{val.skuid}</td>
                                            <td>{val.orderid}</td>
                                            <td>{val.productName}</td>
                                            <td>{val.origin}</td>
                                            <td>{val.price}</td>
                                            <td>{val.store1order}</td>
                                            <td>{val.store2order}</td>
                                            <td>{val.store3order}</td>
                                            <td><TextField disabled={!val.select} variant='outlined'  label="Order" type="number" value={val.buyerOrder} required onChange={(event) => {
                                                let od = event.target.value;
                                                var list4 =  orderList.map((d) => {
                                                    if(d._id==val._id){ d.buyerOrder = od;}
                                                    return d;
                                                    
                                                });
                                                setOrderList(list4);
                                            }}/></td>
                                        </tr>
                                    </tbody>
                        
                );
            })
            }
            </table>
                    </div>

            <div className='mb-5 mx-5 p-5 fixed-bottom'>
            <Stack direction="row" spacing={20} >
            <Button variant='contained' size='large' className='' type='submit' startIcon={<SaveIcon />} onClick={generatepdf} >Save Draft</Button>
            <Button href='/add' size='large' variant='contained' startIcon={<AddCircleIcon />} >Add</Button>
            <Button variant='contained' size='large' type='submit' className='' onClick={deleteId} startIcon={<DeleteIcon />}>Delete</Button>
            <Button variant='contained' size='large' className=''  type='submit' onClick={updateData} startIcon={<SendIcon />} >Submit</Button>
            <Button  variant='contained' size='large' className=''  type='submit' endIcon={<LogoutIcon /> } onClick={logout} >Logout</Button>
            </Stack>
            </div>
        
        </div>
      );
}
 
export default Home;
