import React, { useState }  from 'react';
import './user.css'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logoRegister from './img/logo-register.png';
import Grid from '@material-ui/core/Grid';

const Register = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState();
    const [pass, setPass] = useState("");
    const [numero, setNumero] = useState("");
    const { history } = props;

    const handleRegister = (props) => {
        // console.log(name)
        
        axios.post('http://localhost:5000/api/usuario', JSON.stringify({
            'nombre': name,
            'correo': email,
            'edad': Number(age),
            'contraseña': pass,
            'departamento': 1,
            'minucipio': 1,
            'direccion': "Default",
            'celular': numero
        }))
        .then(res => {
            localStorage.setItem('usuario', JSON.stringify(res.data))
            history.push('/blog')
        })
    }

    return(
        <div className="container-register">
           <div className="container-center-register">
               <div className="logo-register">
                   <img src={logoRegister}></img>
               </div>
                <TextField className="button-register button-register-margin" id="standard-basic" value={name} label="Nombre" onChange={(e) => setName(e.target.value)}/>
                <TextField className="button-register button-register-margin" value={email} id="standard-basic"  onChange={(e) => setEmail(e.target.value)} label="Correo" />
                <TextField className="button-register button-register-margin" value={age} id="standard-basic" onChange={(e) => setAge(e.target.value)} label="Edad"/>
                <TextField className="button-register button-register-margin" value={numero} id="standard-basic" onChange={(e) => setNumero(e.target.value)} label="Numero Telefono"/>
                <TextField className="button-register button-register-margin" value={pass} id="standard-basic" onChange={(e) => setPass(e.target.value)} label="Contraseña" type="password"/>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Button className="button-send" variant="contained" color="primary" onClick={handleRegister}>
                            Registrarse
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button className="button-send" variant="contained" color="primary" onClick={() => { history.push('/login')}}>
                            Iniciar Sesion
                        </Button>
                    </Grid>
                </Grid>
                
                
           </div>
        </div>
    )
}


export default Register;