import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 15,
    paddingRight: 15,    
  },
  card: {
    background: red[500]
  }
}));

const Expenses = props => {
  const classes = useStyles();
  const { travelingCost, videoCost, photoCost, droneCost, usbCost, albumCost, videoEditingCost, totalCost } = props;

  return (
    <Grid item xs={12} className={classes.root}>     
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4">Total Expense: {totalCost}</Typography>
          <Typography>Total Traveling Cost: {travelingCost}</Typography>
          <Typography>Total Video Camera Cost: {videoCost}</Typography>
          <Typography>Total Video Editing Cost: {videoEditingCost}</Typography>
          <Typography>Total Photo Camera Cost: {photoCost}</Typography>
          <Typography>Total Drone Cost: {droneCost}</Typography>
          <Typography>Total USB Cost: {usbCost}</Typography>
          <Typography>Total Album Cost: {albumCost}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Expenses;