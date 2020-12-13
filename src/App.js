import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles, ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

import Content from './Content';
import Header from './Header';
import Drawer from './Drawer';
import Expenses from './Expenses';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    spacing: 0,
    justify: 'space-around'
  },
}));

function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });  
  const classes = useStyles();
  const [state, setState] = useState({ menuOpen: false });

  const handleMenuButtonClick = () => {
    setState({ ...state, menuOpen: !state.menuOpen });
  };

  return (
    <ThemeProvider theme={theme}>      
      <Paper className={classes.root}>
        <Drawer {...state} onMenuButtonClick={handleMenuButtonClick} />
        <Grid container direction="column">
          <Header onMenuButtonClick={handleMenuButtonClick}/>
          <Grid item container>
            <Grid item xs={false} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <Content />
              <Expenses />
            </Grid>
            <Grid item xs={false} sm={2}></Grid>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
