import './bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Checkbox, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Register = () => {
    
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPwd] = useState('');
    const history = useHistory();

    const register = () => {
        axios.post("http://localhost:8000/register",{
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        });
        history.push("/login");
    };
    return ( 
        <div className="container" style={{
            width: "960px",
            margin:"0 auto",
            marginTop:"100px"
        }}>
            <div className='text-center'>
                <h2 >{<AccountCircleIcon fontSize ='large'/>} Sign up </h2>
            </div>
            
                <div className="">
                    
                    <TextField label="First Name" className='form-control mt-5' type="text" placeholder='Enter First Name' required onChange={(event) => {
                        setFirstName(event.target.value);
                    }}/>
                </div>

                <div className="">
                    
                    <TextField label="Last Name" className='form-control  mt-5' type="text" placeholder='Enter Last Name' required onChange={(event) => {
                        setLastName(event.target.value);
                    }}/>
                </div>

                <div className="">
                    
                    <TextField label="Email" className='form-control mt-5' type="email" placeholder='Enter Email' required onChange={(event) => {
                        setEmail(event.target.value);
                    }}/>
                </div>

                <div className="">
                    
                    <TextField label="Password" className='form-control mt-5' type="password" placeholder='Enter Password' required onChange={(event) => {
                        setPwd(event.target.value);
                    }}/>
                </div>

                <div className='text-center'>
                    <Button size='large' variant='contained' type='submit' className=' mt-5' onClick={register}>Sign Up</Button>
                </div>
                <div className='text-center mt-5 '>
                    <a href='/login' className='registerl'>Already have account? <b> Sign In</b></a>
                </div>
        </div>
     );
}
 
export default Register;