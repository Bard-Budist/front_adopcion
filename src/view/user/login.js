import React, { useState }  from 'react';
import './user.css'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logoRegister from './img/logo-register.png';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const { history } = props;
    const [ alert, setAlert] = useState(false);

    const handleLogin = () => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
        // console.log(name)
        axios.post('http://localhost:5000/api/usuario/login', JSON.stringify({
            correo: email,
            contraseña: pass,
        }))
        .then(res => {
            if (res.status == 200) {
                if (res.data.status == 'ok') {
                    console.log(res.data.data)
                    localStorage.setItem('usuario', JSON.stringify(res.data.data))
                    history.push('/blog')
                }
            } else {
                setAlert(true)
            }
            
        })
        .catch(err => {
            setAlert(true)
        })

        // const config = {
        //     url: 'http://7ff5d63cdc5c.ngrok.io/api/Usuarios',
        //     method: 'POST',
        //     data: JSON.stringify({"dawdawd": "adawdawd"}),
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Accept': '*/*',
        //       'Access-Control-Allow-Origin': '*'
        //     }
        //   };
        //     axios
        //     .request(config)
        //     .then(function(response) {
        //       // handle success
        //       console.log(response);
        //     })
        //     .catch(function(error) {
        //       // handle error
        //       console.log(error);
        //     })
        //     .finally(function() {
        //       // always executed
        //     });

         }

    return(
        <div>
            <div className="container-register">
           <div className="container-center-login">
               <div className="logo-register">
                   <img src={logoRegister}></img>
               </div>
                <TextField className="button-register button-register-margin" value={email} id="standard-basic"  onChange={(e) => setEmail(e.target.value)} label="Correo" />
                <TextField className="button-register button-register-margin" value={pass} id="standard-basic" onChange={(e) => setPass(e.target.value)} label="Contraseña" type="password"/>
                
                {alert &&
                    <p className="error-login">Usuario/contraseña incorrectos</p>
                }
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Button className="button-send" variant="contained" color="primary" onClick={handleLogin}>
                        Iniciar Sesion
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button className="button-send" variant="contained" color="primary" onClick={() => { history.push('/register')}}>
                            Registrarse
                        </Button>
                    </Grid>
                </Grid>
           </div>
           
        </div>
        </div>
        
    )
}


export default Login;