import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography, Paper, IconButton } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        padding: 10,
        background: 'linear-gradient(45deg, #FE6B8B 10%, #FF8E53 100%)',
    },
    paper: {
        padding: 5,
        margin: 5,
        backgroundColor: 'rgba(50, 50, 50, 0.3)',
        backdropFilter: 'blur(10px) saturate(100%) contrast(45%) brightness(130%)',
        height:70
    },
    sectionTitle: {
        paddingBottom: 20
    },
    itemTitle: {
        margin:10,
        marginLeft: 10,
        position:'absolute',
        text:'center'
    },
    itemContainer: {
        marginTop: 38,
        marginLeft:5,
        float:'left'
    },
    playButton: {
        marginTop:5,
        marginRight:5,
        float:'right'
    },
}));

function Enemigos() {

    const classes = useStyles();

    var stock = [
        {'nombre':'Misty', 'url':'https://img.pokemondb.net/sprites/items/potion.png', 'pokemons':[0,1,2]},
        {'nombre':'Brooke', 'url':'https://img.pokemondb.net/sprites/items/super-potion.png', 'pokemons':[0,1,2,3,4]},
        {'nombre':'Gary', 'url':'https://img.pokemondb.net/sprites/items/max-potion.png',  'pokemons':[0,1]},
    ]

    var items = stock.map(function (item, idx) {

        const pokeballs = [];
        
        for (var i=0; i < item.pokemons.length; i++) {
            pokeballs.push(<RadioButtonCheckedIcon fontSize="small" key={i}/>);
        }

        for (var j=0; j < (6-item.pokemons.length); j++) {
            pokeballs.push(<RadioButtonUncheckedIcon fontSize="small" key={6-j}/>);
        }

        return <Grid item xs={12} key={idx}>
                    <Paper className={classes.paper} variant="outlined">
                        <Typography className={classes.itemTitle}>
                            {item.nombre}
                        </Typography>
                        <div className={classes.itemContainer}>
                            {pokeballs}
                        </div>

                        <IconButton variant="contained" className={classes.playButton}>
                            <PlayCircleFilledIcon fontSize="large"/>
                        </IconButton>
                    </Paper>
                </Grid>;
    })

    return (
        <Card className={classes.card} variant="outlined">
            <Typography variant="h4" component="h4" style={{marginBottom: '5px'}}>
                Enemigos
            </Typography>
            <Grid container spacing={0}>
                {items}
            </Grid>
        </Card>
    )
}

export default Enemigos;