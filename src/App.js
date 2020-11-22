import React from 'react';
import { Grid, AppBar, Typography, Toolbar, Card, CardContent } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  title: {
    flexGrow: 1
  }
}));

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container direction="column">
        <Grid item><AppBar position='static'><Toolbar><Typography className={classes.title}>Package Calculator</Typography></Toolbar></AppBar></Grid>
        <Grid item container>
          <Grid item xs={false} sm={2}></Grid>
          <Grid item xs={12} sm={8}>
          <Typography color="textSecondary" gutterBottom>Word of the Day</Typography>
            <Card>
              <CardContent>
                
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={false} sm={2}></Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
