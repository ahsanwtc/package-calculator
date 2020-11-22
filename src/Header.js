import React from 'react';
import { Grid, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = props => {
  const classes = useStyles();
  const { onMenuButtonClick, clientQuote } = props;

  return (
    <Grid item>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onMenuButtonClick}>
            <Menu />
          </IconButton>
          <Typography className={classes.title}>Package Calculator</Typography>
          <Typography>Quote: {clientQuote}</Typography>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Header;