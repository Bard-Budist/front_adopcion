import React, { useState, useEffect }  from 'react';
import './blog.css'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import logoRegister from '../user/img/logo-register.png';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    cards: {
        width: '48%',
        margin: '36px'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    titleCard: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 200,
        margin: 20,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
}));

const Blog = (props) => {
    const { history } = props;
    const [ dataPost, setDataPost ] = useState([])
    const [ user, setUser ] = useState(null);
    const [ openModal, setOpenModal ] = useState(false)
    const [ selectData, setSelectData ] = useState({})
    const classes = useStyles();

        let loadData = async () =>{
            let axiosConfig = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
              };
            // console.log(name)
            await axios.get('http://localhost:5000/api/posting')
            .then(res => {
                console.log(res.data)
                setDataPost(res.data);
            })
        }
        
        if (dataPost.length == 0) {
            loadData()
        }
        if (localStorage.getItem('usuario') && !user) {
            setUser(JSON.parse(localStorage.getItem('usuario')))
        }

        const handleOpen = (usuario, nombre) => {
            console.log(usuario)
            const url = "https://api.whatsapp.com/"
            const msg = `Buenas, me gustaria tener mas informacion de ${nombre}`
            window.open(`${url}send?phone=57${usuario.celular}&text=${msg}`,'_blank');
        };

        const handleClose = () => {
            setOpenModal(false);
        };

        const cerrarSesion = () => {
            localStorage.clear()
            history.push('/home')
        }
    return(
        <div className="master-container-blog">
            <AppBar position="static" style={{ background: '#4e2db3'}}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Mi compañero
                    </Typography>
                    <Button color="inherit" onClick={() => { history.push('/blog')}}>Inicio</Button>
                    
                    {user && (
                        <div>
                            <Button color="inherit">{ user.nombre }</Button>
                            <Button color="inherit" onClick={() => { history.push('/posting/create')}}>Publicar</Button>
                            <Button color="inherit" onClick={() => { cerrarSesion()}}>Cerrar sesion</Button>
                        </div>
                        )
                    } 
                </Toolbar>
            </AppBar>
            {dataPost && dataPost.map((value) => {
                return (
                    <div className="container-cards-posting">
                        <Card className={classes.cards} variant="outlined">
                            <img className={classes.media} src={value.imagen} style={{borderRadius: 40}}></img>
                            <CardContent>
                                {/* <Typography className={classes.titleCard} color="textSecondary" gutterBottom>
                                    Word of the Day
                                </Typography> */}
                                <Typography variant="h5" component="h2">
                                    { value.nombre }
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Edad { value.edad } - Raza { value.raza }
                                </Typography>
                                <Typography variant="body2" component="p">
                                    { value.descripcion }
                                </Typography>
                            </CardContent>
                        <CardActions>
                        <Button size="small" variant="contained" color="secondary" onClick={() => { handleOpen(value.usuario, value.nombre)}}>Saber mas</Button>
                    </CardActions>
                </Card>
            </div>

                )
            })}
            
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
            }}
            >
                <Fade in={openModal}>
                <div className={classes.paper}>
                    <Grid container spacing={3}>
                        <h2>Deseas saber mas?</h2>
                        <Grid item xs={12} >
                            <p>Estos son los datos de las persona</p>
                        </Grid>
                        <Grid item xs={12}>
                            <p>Estos son los datos de las persona</p>
                        </Grid>

                    </Grid>
                </div>
                </Fade>
            </Modal>
        </div>
    )
}


export default Blog;