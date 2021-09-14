import React from "react";

import { Grid } from "@material-ui/core";

import Personaje from "./Personaje";
import Tienda from "./Tienda";
import Enemigos from "./Enemigos";
import { BASE_URL } from "../constants";

class JuegoPrincipal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            personaje: props.personaje,
            enemigos: null,
        }
        
    }

    render() {
        const {personaje, tienda} = this.state;
        return (<Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Personaje personaje={personaje} handler={this.handleUpdatePersonaje}></Personaje>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <Tienda personaje={personaje} handler={this.handleUpdatePersonaje}></Tienda>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        {/*<Enemigos></Enemigos>*/}
                    </Grid>
                </Grid>
            );  
    }

    handleUpdatePersonaje = (personaje) => {
        this.setState({
            personaje:personaje
        })
    }
    
}

export default JuegoPrincipal;