import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import {
  Tab,
  Tabs,
  ThemeProvider,
} from "@material-ui/core";

import "./App.css";

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
    textAlign: "center",
  },
  fabStyle: {
    margin: theme.spacing(1),
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
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
  const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar variant="regular" className={classes.appBar}>
            <Typography variant="h6">
              
            </Typography>
          </Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
          >
            {/* Add new tabs here ----------------------------------------------- NEW PROJECTS TABS */}
            <Tab label="empty" {...a11yProps(0)} />
          </Tabs>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default App;
