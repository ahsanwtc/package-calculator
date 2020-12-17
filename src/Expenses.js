import React, { useEffect } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import { useSelector, useDispatch } from 'react-redux';

import { Application } from './store';
import { calculateExternalCost, calculateTotalCost } from './functions';
import { EXPENSES } from './constants';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15
  },
  cardRed: {
    background: red[500]
  },
  cardGreen: {
    background: green[500]
  },
}));

const Expenses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const packageDays = useSelector(Application.Selectors.getPackageDays);
  const pricelist = useSelector(Application.Selectors.getPricelist);
  const travelling = useSelector(Application.Selectors.getExpense(EXPENSES.travelling));
  const videoCameras = useSelector(Application.Selectors.getExpense(EXPENSES.videoCamera));
  const photoCameras = useSelector(Application.Selectors.getExpense(EXPENSES.photoCamera));
  const drones = useSelector(Application.Selectors.getExpense(EXPENSES.drone));
  const deliverables = useSelector(Application.Selectors.getDeliverables);
  const advance = useSelector(Application.Selectors.getAdvancePayment);
  const extra = useSelector(Application.Selectors.getExtra);

  const totalTravellingCost = calculateExternalCost({ expense: travelling });
  const totalVideoCost = calculateExternalCost({ expense: videoCameras, price: pricelist.videoCamera });
  const totalVideoEditingCost = calculateExternalCost({ expense: videoCameras, price: pricelist.videoEditing });
  const totalPhotoCost = calculateExternalCost({ expense: photoCameras, price: pricelist.photoCamera });
  const totalDroneCost = calculateExternalCost({ expense: drones, price: pricelist.drone });
  const totalUSBCost = calculateExternalCost({ expense: [{ value: deliverables.usb }], price: pricelist.usb });
  const totalAlbumCost = calculateExternalCost({ expense: [{ value: deliverables.album }], price: pricelist.album });

  const totalWage = parseInt(pricelist.wage) * parseInt(packageDays.value);
  const totalCostItems = [
    totalTravellingCost, totalVideoCost, totalVideoEditingCost, totalPhotoCost, totalDroneCost, totalUSBCost, totalAlbumCost
  ];
  const totalCost = calculateTotalCost(totalCostItems);
  const clientQuote = totalCost + totalWage - advance + extra;

  useEffect(() => {
    dispatch(Application.Actions.updateClientQuote(clientQuote));
  }, [clientQuote, dispatch]);

  return (
    <React.Fragment>
    <Grid item xs={12} className={classes.root}>     
        <Card className={classes.cardGreen}>
          <CardContent>
            <Typography variant="h3">Client Quote: {clientQuote}</Typography>
            <Typography>Total Wage: {totalWage}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} className={classes.root}>     
        <Card className={classes.cardRed}>
          <CardContent>
            <Typography variant="h4">Total Expense: {totalCost}</Typography>
            <Typography>Total Traveling Cost: {totalTravellingCost}</Typography>
            <Typography>Total Video Camera Cost: {totalVideoCost}</Typography>
            <Typography>Total Video Editing Cost: {totalVideoEditingCost}</Typography>
            <Typography>Total Photo Camera Cost: {totalPhotoCost}</Typography>
            <Typography>Total Drone Cost: {totalDroneCost}</Typography>
            <Typography>Total USB Cost: {totalUSBCost}</Typography>
            <Typography>Total Album Cost: {totalAlbumCost}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default Expenses;