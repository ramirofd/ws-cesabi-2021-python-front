import React from "react";

import {
    createTheme,
    ThemeProvider,
} from "@material-ui/core/styles";

import "./App.css";
import JuegoPrincipal from "./components/JuegoPrincipal";
import CrearPersonaje from "./components/CrearPersonaje";
import { BASE_URL } from "./constants";

import { Fab } from "@material-ui/core";
import CachedIcon from '@material-ui/icons/Cached';

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#4caf50",
        },
        secondary: {
            main: "#D9D166",
        },
    },
});

const classes = {
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
    },
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personaje: null,
            // personaje: {"py/object": "juego.personaje.Personaje", "nombre": "Enana", "mochila": {"py/object": "juego.mochila.Mochila", "capacidad": 10, "objetos": {}}, "dinero": 100, "pokemons": [{"py/object": "juego.pokemon.Pokemon", "nombre": "Bulbasaur", "imagen_frente": "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif", "imagen_espalda": "https://img.pokemondb.net/sprites/black-white/anim/back-normal/bulbasaur.gif", "salud": 100, "movimientos": []}, {"py/object": "juego.pokemon.Pokemon", "nombre": "Beedrill", "imagen_frente": "https://img.pokemondb.net/sprites/black-white/anim/normal/beedrill.gif", "imagen_espalda": "https://img.pokemondb.net/sprites/black-white/anim/back-normal/beedrill.gif", "salud": 100, "movimientos": []}]}
        };
    }

    render() {
        const { personaje } = this.state;

        var content;
        if (personaje!== null) {
            content = <JuegoPrincipal personaje={personaje}/>;
        } else {
            content = <CrearPersonaje handler={this.handleCreatePersonaje}/>;
        }

        return (
            <div className="App">
                <ThemeProvider theme={theme}>
                    {content}
                    <Fab onClick={this.reset} style={classes.fab} variant="extended">
                        <CachedIcon style={{marginRight:10}}/>
                        Reiniciar juego
                    </Fab>
                </ThemeProvider>
            </div>
        );

    }

    handleCreatePersonaje = (data) => {
        fetch(BASE_URL+'/personaje', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        personaje: result,
                    });
                },
                (error) => {
                    this.setState({
                        personaje: null,
                    });
                }
            )
    };

    reset = () => {
        this.setState({
            personaje:null
        });
    };

}

export default App;
