import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { Card, Grid, LinearProgress, Typography, Badge, CardActions, Button } from '@material-ui/core';

import { BASE_URL } from "../constants";

const classes = {
    root: {
        flexGrow: 1,
    },
    card: {
        padding: 10,
        background: 'linear-gradient(45deg, rgba(28,110,30,1) 20%, rgba(103,245,174,1) 100%)'
    },
    paper: {
        padding: 10,
        margin: 10,
        backgroundColor: 'rgba(50, 50, 50, 0.3)',
        backdropFilter: 'blur(10px) saturate(100%) contrast(45%) brightness(130%)',
    },
    sectionTitle: {
        paddingBottom: 0
    },
    itemContainer: {
        justifyContent:'center',
        display:'flex',
        width:'92%',
        marginTop:10,
        height:48
    },
    pokeContainer: {
        display: 'flex',
        height: '130px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    healthBar:{
        width:'90%',
        height:10,
        borderRadius:10
    }
};

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 10,
      top: 40,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

class Personaje extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        var items = [];
        var pokemons = [];
        var max_obj_label = '';
        if ('mochila' in this.props.personaje && 'objetos' in this.props.personaje.mochila) {
            if ('objetos' in this.props.personaje.mochila)
                max_obj_label = "(max "+this.props.personaje.mochila.capacidad+" objetos)";

            items = Object.entries(this.props.personaje.mochila.objetos).map(function ([key, value], i) {
                        return (<Grid item xs={6} sm={4} md={4} l={2} key={i}>
                                    <Card style={classes.paper} variant="outlined">
                                        <Typography style={classes.itemTitle}>
                                            {key}
                                        </Typography>
                                        <div style={classes.itemContainer}>
                                            <StyledBadge badgeContent={value.length} color="secondary">
                                                <img src={value[0].url} alt={value[0].nombre} style={classes.sprite}/> 
                                            </StyledBadge>
                                        </div>
                                        <CardActions style={{justifyContent:'center',display:'flex', marginBottom:-10, marginTop:5}}>
                                            <Button onClick={()=>this.handleVenta(key)}>vender</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>);
                    }, this)
        }

        if('pokemons' in this.props.personaje) {
            pokemons = this.props.personaje.pokemons.map(function (item, i) {
                        return (<Grid item xs={6} sm={4} md={4} l={2} key={i}>
                                    <Card  style={classes.paper} variant="outlined">
                                        <Grid container spacing={0} style={{width:'100%'}}>
                                            <Grid item xs={12}>
                                                <Typography style={classes.itemTitle}>
                                                    {item.nombre}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div style={classes.pokeContainer}>
                                                    <img src={item.imagen_frente} alt={item.nombre} style={classes.sprite}/> 
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} style={{display:'flex', justifyContent:'center'}}>
                                                <LinearProgress variant="determinate" value={item.salud} style={classes.healthBar}/>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>);
                    })
        }

        
        
        return (
            <Card style={classes.card} variant="outlined">

                <Typography variant="h4" component="h4" style={{marginBottom: '5px'}}>
                    Personaje
                </Typography>

                {'nombre' in this.props.personaje &&
                <Typography variant="h6" component="h4" style={{marginLeft: '15px'}}>
                    Nombre: {this.props.personaje.nombre}
                </Typography> }

                {'dinero' in this.props.personaje &&
                <Typography variant="h6" component="h4" style={{marginLeft: '15px', marginBottom: '15px'}}>
                    Dinero: ${this.props.personaje.dinero}
                </Typography> }

                {'mochila' in this.props.personaje &&
                <Card style={classes.paper} variant="outlined">
                    <Typography variant="h6" style={classes.sectionTitle}>
                        Mochila {max_obj_label}
                    </Typography>
                    <Grid container spacing={0}>
                        {items}
                    </Grid>
                </Card> }

                {'pokemons' in this.props.personaje &&
                <Card style={classes.paper} variant="outlined">
                    <Typography variant="h6" style={classes.sectionTitle}>
                        Pokemons
                    </Typography>
                    <Grid container spacing={0}>
                        {pokemons}
                    </Grid>
                </Card> }
            </Card>
        )
    }

    handleVenta = (nombre) => {
        console.log(this.props.personaje)
        const data = {
            objeto:nombre,
            personaje:this.props.personaje
        }
        fetch(BASE_URL+'/tienda/vender',{
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
    }
}

export default Personaje;