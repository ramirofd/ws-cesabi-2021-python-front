import React from "react";
import {
    withStyles,
} from "@material-ui/core/styles";
import { Card, Grid, TextField, Typography, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { BASE_URL } from "../constants";


const classes = {
    card: {
        padding: 25,
    },
    form: {
        justifyContent: 'center',
        display: 'flex',
        width: '100%',
    },
    formControl: {
    },
    paper:{
        background:'#757575',
        padding:10,
    },
    pokeContainer: {
        display: 'flex',
        height: '130px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
    }
};

const CssTextField = withStyles({
    root: {
        width: '100%',
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            background:'rgba(0,0,0,0)',
            '&:hover fieldset': {
                borderColor: 'white',
                
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
                
            },
        },
    },
})(TextField);


class CrearPersonaje extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            pokemons: [],
            all_pokemons: [],
            max:0,
            disabled:false,
        };
    }

    componentDidMount() {
        fetch(BASE_URL+'/pokemon')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        all_pokemons: result.all_pokemons,
                        max:result.max_pokemons
                    });
                },
                (error) => {
                    this.setState({
                        all_pokemons: [],
                        max:0
                    });
                }
            )
    }

    render() {
        const { nombre, pokemons, all_pokemons, max } = this.state;
        var elegible_pokemons = all_pokemons.map(function (item, i) {
                        const handleChange = (event) => {
                            if(event.target.checked){
                                pokemons.push(event.target.value);
                                if(pokemons.length==max)
                                    this.setState({
                                        disabled:true,
                                    });
                            }else {
                                var index = pokemons.indexOf(event.target.value);
                                if (index > -1) {
                                    pokemons.splice(index, 1);
                                }
                                if(pokemons.length<max)
                                    this.setState({
                                        disabled:false,
                                    });
                            }
                            this.setState({
                                pokemons:pokemons
                            });
                        };

                        return (<Grid item xs={6} sm={4} md={3} l={2} xl={2} key={i}>
                                    <Card  style={classes.paper}>
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
                                            <Grid item xs={12}>
                                            <FormControlLabel style={classes.checkbox} control={<Checkbox
                                                                        
                                                                        disabled={!(this.state.pokemons.includes(item.nombre)) && this.state.disabled}
                                                                        value={item.nombre}
                                                                        onChange={handleChange}
                                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                    />}
                                                                label="ELEGIDO"/>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>);
                    },this);
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Card style={classes.card}>
                        <Typography variant="h4" component="h4" style={{ marginBottom: 20 }}>
                            Crear Personaje
                        </Typography>
                        <Grid container spacing={2} style={classes.form}>
                            <Grid item xs={8}>
                                <CssTextField onChange={this.handleNameChange} id="outlined" label="Nombre" variant="outlined" value={nombre} />
                            </Grid>
                            <Grid item xs={4} style={{ width: '100%' }}>
                                <Button disabled={this.state.pokemons.length==0 || this.state.nombre===''} onClick={this.handleCreate} variant="contained" style={{ borderRadius: 30, width: '100%', height:'100%' }}>crear</Button>
                            </Grid>
                            <Typography style={{ marginBottom: 5, marginTop:5 }}>
                                Elige tus pokemons (max: {max})
                            </Typography>
                            <Grid item xs={12} style={{ width: '100%' }}>
                                <Grid container spacing={1}>
                                    {elegible_pokemons}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        );
    }

    handleNameChange = (event) => {
        const name = event.target.value
        this.setState({ nombre: name })
    }

    handleCreate = (event) => {
        const name = this.state.nombre;
        const pokemons_list = this.state.pokemons;

        this.props.handler({ 
            nombre: name,
            pokemons: pokemons_list
        })
    }
}

export default CrearPersonaje;