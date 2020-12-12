import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';


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
        margin: 20
    },
}));

const HeaderBar = (props) => {
    const { history } = props;
    const [ user, setUser ] = useState(null) 
    const classes = useStyles();

        if (user == null) {
            setUser(JSON.parse(localStorage.getItem('usuario')))
        }

    return(
        <div className="master-container-blog">
            <AppBar position="static" style={{ background: '#4e2db3'}}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Mi compañero
                    </Typography>
                    { user &&
                        <Button color="inherit">{ user.nombre }</Button>
                    }
                </Toolbar>
            </AppBar> 
        </div>
    )
}


export default HeaderBar;