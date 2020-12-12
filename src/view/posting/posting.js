import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logoRegister from '../user/img/logo-register.png';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextareaAutosize } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './posting.css'

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
    titleCard: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 200,
        margin: 20
    },
}));

const Posting = (props) => {
    const { history } = props;
    const [ user, setUser ] = useState(null);
    const [ dataInfo, setDataInfo ] = useState({});
    const [ titulo, setTitulo ] = useState("");
    const [ descripcion, setDescripcion ] = useState("");
    const [ animal, setAnimal ] = useState("");
    const [ imagen, setImagen ] = useState("");
    const [ raza, setRaza ] = useState("");
    const [ genero, setGenero ] = useState("");
    const [ cantidad, setCantidad ] = useState("");
    const [ vacuna, setVacuna ] = useState("");
    const [ requisitos, setRequisitos ] = useState("");
    const [ operado, setOperado ] = useState("");
    const [ edad, setEdad ] = useState(0);


    function isEmptyObject(obj) {
        return !Object.keys(obj).length;
    }


    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setImagen(base64);
    };

    let loadData = async () =>{
        // console.log(name)
        await axios.get('http://localhost:5000/api/info')
        .then(res => {
            setDataInfo(res.data);

        })
    }

    if (isEmptyObject(dataInfo)) {
        loadData()
    }
      
    if (user == null) {
        setUser(JSON.parse(localStorage.getItem('usuario')))
    }

    function savePosting() {
        console.log(titulo)
        console.log(descripcion)
        console.log(raza)
        console.log(genero)
        console.log(cantidad)
        console.log(vacuna)
        const data = {
            'nombre': titulo,
            'descripcion': descripcion,
            'animal': animal,
            'raza': raza,
            'genero': genero,
            'edad': edad,
            'cantidad': cantidad,
            'vacunas': vacuna,
            'requisitos': requisitos,
            'operado': operado,
            'id_user': user.id,
            'imagen': imagen
        }
        axios.post('http://localhost:5000/api/info/', JSON.stringify({
            data
        }))
        .then(res => {
            console.log(res.data)
            history.push('/blog')
        })


    }



    const classes = useStyles();

    return(
        <div>
            <div>
                <AppBar position="static" style={{ background: '#4e2db3'}}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Mi compañero
                        </Typography>
                        <Button color="inherit" onClick={() => { history.push('/blog')}}>Inicio</Button>
                        { user &&
                            <Button color="inherit">{ user.nombre }</Button>
                        }
                    </Toolbar>
                </AppBar>
            </div>
            <div className="container-posting-create">
                <Typography variant="h6" gutterBottom style={{color: 'black'}}>
                    ¡Alegrale la vida a una mascota!
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="title"
                            name="title"
                            label="Titulo"
                            fullWidth
                            value={titulo}
                            onChange={event => setTitulo(event.target.value)}
                            autoComplete="given-name"
                            defaultValue=""
                        />
                    </Grid>
                   
                    <Grid item xs={12} sm={6}>
                        <InputLabel id="label-animal">Animal</InputLabel>
                        <Select
                            labelId="label-animal"
                            id="select-animal"
                            onChange={event => setAnimal(event.target.value)}
                            fullWidth>
                                {dataInfo.Animal && dataInfo.Animal.map((animal) => {
                                    return (
                                        <MenuItem value={animal.id}>{animal.nombre}</MenuItem>
                                    )}
                                )}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{alignSelf: 'center'}}>
                        <label className="label-textarea">Imagen</label>
                        <input type="file" onChange={(e) => uploadImage(e)}/> 
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="Raza"
                            name="Raza"
                            label="Raza"
                            fullWidth
                            value={raza}
                            defaultValue=""
                            onChange={event => setRaza(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel id="label-animal">Genero</InputLabel>
                            <Select
                                labelId="label-animal"
                                id="select-animal"
                                defaultValue=""
                                onChange={event => setGenero(event.target.value)}
                                fullWidth
                                >
                                    {dataInfo.Genero && dataInfo.Genero.map((genero) => {
                                    return (
                                        <MenuItem value={genero.id}>{genero.nombre}</MenuItem>
                                    )}
                                )}
                            </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="Edad"
                            name="Edad"
                            label="Edad"
                            fullWidth
                            value={edad}
                            defaultValue=""
                            onChange={event => setEdad(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="Cantidad"
                            name="Cantidad"
                            label="Cantidad"
                            fullWidth
                            value={cantidad}
                            defaultValue=""
                            onChange={event => setCantidad(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel id="label-animal">Vacunado?</InputLabel>
                            <Select
                                labelId="label-animal"
                                id="select-animal"
                                defaultValue=""
                                onChange={event => setVacuna(event.target.value)}
                                fullWidth>
                                    {dataInfo.Vacunas && dataInfo.Vacunas.map((vacuna) => {
                                        return (
                                            <MenuItem value={vacuna.id}>{vacuna.nombre}</MenuItem>
                                        )}
                                    )}
                            </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel id="label-animal">Operado?</InputLabel>
                            <Select
                                labelId="label-animal"
                                id="select-animal"
                                fullWidth
                                defaultValue=""
                                onChange={event => setOperado(event.target.value)}
                                >
                                    {dataInfo.Operado && dataInfo.Operado.map((operado) => {
                                        return (
                                            <MenuItem value={operado.id}>{operado.nombre}</MenuItem>
                                        )}
                                    )}
                            </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label className="label-textarea">Descripcion</label>
                        <TextareaAutosize className="text-area-posting" value={descripcion} onChange={event => setDescripcion(event.target.value)} defaultValue="">
                        </TextareaAutosize>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label className="label-textarea">Requisitos</label>
                        <TextareaAutosize className="text-area-posting" value={requisitos} onChange={event => setRequisitos(event.target.value)} defaultValue="">
                        </TextareaAutosize>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth onClick={savePosting}>
                            Publicar
                        </Button>
                    </Grid>
                    
                </Grid>
            </div>
        </div>
    )
}


export default Posting;