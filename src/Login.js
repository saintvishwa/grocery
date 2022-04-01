import './bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LoginIcon from '@mui/icons-material/Login';
import { Checkbox, TextField } from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import './components/buy.css';

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();

    const login = () => {
        try {   
            axios.post('http://localhost:8000/login',{
                email:email,
                password:password
            }, history.push("/") );
        } catch (error) {
            alert(error);
        }
    };

    return ( 
        
    <div className='container'>
        <div className='text-center '>
        <h1 className=''>Sign In  {<LocalGroceryStoreIcon fontSize='large'/>}</h1>
        </div>
            <div className="">

                
                <TextField label="Email" className='form-control mt-5' type="email" placeholder='Enter Email' required onChange={(event) => {
                    setEmail(event.target.value);
                }}/>
            </div>

            <div className="">
                
                <TextField className='form-control mt-5' type="password" placeholder='Enter Password' label= "Password"  required onChange={(event) => {
                    setPassword(event.target.value);
                }}/>
            </div>
            <div className='text-center mt-5'>
            <Button size='large' variant='contained' color='primary' type='submit' className='login' startIcon={<LoginIcon />} onClick={login}>Sign in</Button>
            </div>
        <div className='text-center mt-5'>
        <a href='/register' className='registerl '>Don't have an account? <b>Sign up</b></a>
    </div> 
    </div>
    );
}
 
export default Login;