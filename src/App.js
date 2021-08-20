import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import { createTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";

import "./App.css";
import TabPanel from './TabPanel';

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#BF2633",
    },
    secondary: {
      main: "#D9D166",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingTop: "120px",
  },
  appBar: {
    alignItems: "center",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

function App() {
  const classes = useStyles(theme);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar variant="regular">
            <Typography variant="h6" >
              I Jornadas de Bioingeniería del CESABI
            </Typography>
          </Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
          >
            {/* Add new tabs here ----------------------------------------------- NEW PROJECTS TABS */}
            <Tab label="Variables y Funciones" {...a11yProps(0)} />
            <Tab label="Listas y Diccionarios" {...a11yProps(0)} />
            <Tab label="Clases" {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} >
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
