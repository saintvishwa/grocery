import React from 'react';
import ReactDOM from 'react-dom';
import '../components/buy.css';
import { Button, TextField } from "@mui/material";
export default function Header() {
  return (
    <div className='header'>
        <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <h2 className="mx-5 navbar-brand">company name</h2>
          <h2 className='buy'>Buyers Dashboard</h2>
          
        </div>
      </nav>
    </div>
  )
}
