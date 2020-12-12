import React, { useState, useEffect }  from 'react';
import './home.css'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logoRegister from '../user/img/logo-register.png';

const Home = (props) => {
    const { history } = props;

    const handleAdopcion = () => {
        const user = localStorage.getItem('usuario');
        if (!user)  {
            history.push('/login')
        } else {
            history.push('/blog')
        }
    }

    const handleAdoptar = () => {
        history.push('/blog')
    }

    return(
        <div className="base">
            <div className="content">
                <img src={logoRegister} className="img-logo"></img>
                <p>Puedes ayudar a tu compañero a tener una mejor vida</p>
                <div className="content-buttons">
                    <a href="#" onClick={handleAdoptar}>Adoptar</a>
                    <a href="#" onClick={handleAdopcion}>Dar en adopcion</a>
                </div>
            </div>
        </div>
    )
}


export default Home;