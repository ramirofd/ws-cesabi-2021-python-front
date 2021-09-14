import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography, Paper, Button } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { BASE_URL } from "../constants";

const classes = {
    root: {
        flexGrow: 1,
    },
    card: {
        padding: 10,
        background: 'linear-gradient(45deg, rgba(10,100,255,1) 0%, rgba(84,226,255,1) 100%)',
    },
    paper: {
        padding: 5,
        margin: 5,
        backgroundColor: 'rgba(50, 50, 50, 0.3)',
        backdropFilter: 'blur(10px) saturate(100%) contrast(45%) brightness(130%)',
        height:40
    },
    sectionTitle: {
        paddingBottom: 20
    },
    itemTitle: {
        margin:10,
        marginLeft: 40,
        position:'absolute',
        text:'center'
    },
    itemContainer: {
        marginTop: 3,
        marginRight:10,
        marginLeft:'auto',
        float:'left',
        height:48
    },
    buyButton: {
        height:30,
        borderRadius:32,
        marginTop:5,
        marginRight:5,
        float:'right'
    },
};

class Tienda extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tienda: null,
        }
    }

    componentDidMount() {
        this.getTienda();
    }

    render() {
        const {tienda} = this.state;
        var items = [];
        if(tienda !== null) {
            items = tienda.map(function (item, i) {
                return <Grid item xs={12} key={i}>
                            <Paper style={classes.paper} variant="outlined">
                                <Typography style={classes.itemTitle}>
                                    {item.nombre}
                                </Typography>
                                <div style={classes.itemContainer}>
                                    <img src={item.url} alt={item.nombre} style={classes.sprite}/> 
                                </div>
                                <Button variant="contained" disableElevation style={classes.buyButton} onClick={()=>this.handleCompra(item.nombre)}>
                                    <AttachMoneyIcon style={{ fontSize: 18, margin:0, padding:0, marginLeft:-10}} value={item.nombre}/>
                                    {item.precio}
                                </Button>
                            </Paper>
                        </Grid>;
            },this);
        }
        return (
            <Card style={classes.card} variant="outlined">
                <Typography variant="h4" component="h4" style={{marginBottom: '5px'}}>
                    Tienda
                </Typography>
                <Grid container spacing={0}>
                    {items}
                </Grid>
            </Card>
        )
    }

    getTienda = () => {
        fetch(BASE_URL+'/tienda')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tienda: result,
                    });
                },
                (error) => {
                    this.setState({
                        tienda: null,
                    });
                }
            )
    }

    handleCompra = (nombre) => {
        const data = {
            objeto:nombre,
            personaje:this.props.personaje
        }
        fetch(BASE_URL+'/tienda/comprar',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)})
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.handler(result);
                },
                (error) => {
                    
                }
            )
        // this.props.handler({"py/object": "juego.personaje.Personaje", "nombre": "Alberto", "mochila": {"py/object": "juego.mochila.Mochila", "capacidad": 10, "objetos": {}}, "dinero": 100, "pokemons": [{"py/object": "juego.pokemon.Pokemon", "nombre": "Bulbasaur", "imagen_frente": "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif", "imagen_espalda": "https://img.pokemondb.net/sprites/black-white/anim/back-normal/bulbasaur.gif", "salud": 100, "movimientos": []}, {"py/object": "juego.pokemon.Pokemon", "nombre": "Beedrill", "imagen_frente": "https://img.pokemondb.net/sprites/black-white/anim/normal/beedrill.gif", "imagen_espalda": "https://img.pokemondb.net/sprites/black-white/anim/back-normal/beedrill.gif", "salud": 100, "movimientos": []}]}
    }
}

export default Tienda;