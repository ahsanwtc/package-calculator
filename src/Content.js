import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { blue } from '@material-ui/core/colors';

import { Application } from './store';
import ItemCard from './ItemCard';
import { EXPENSES, STRINGS } from './constants';

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(2),
  },
  title: {
    fontSize: 14,
  },
  cardBlue: {
    background: blue[900],
    marginBottom: theme.spacing(3),
  },
}));

const Content = () => {
  const classes = useStyles();
  const packageDays = useSelector(Application.Selectors.getPackageDays);
  const travelling = useSelector(Application.Selectors.getExpense(EXPENSES.travelling));
  const videoCameras = useSelector(Application.Selectors.getExpense(EXPENSES.videoCamera));
  const photoCameras = useSelector(Application.Selectors.getExpense(EXPENSES.photoCamera));
  const drones = useSelector(Application.Selectors.getExpense(EXPENSES.drone));
  const advance = useSelector(Application.Selectors.getAdvancePayment);
  
  return (
    <form className={classes.form} autoComplete="off">
      <Grid container spacing={2} direction="row">
        <ItemCard full title="Total number of Days in this Package" item={[packageDays]} />
        <ItemCard title="Travelling cost" item={travelling} priceBreakdown/>
        <ItemCard title="Videocameras cost" item={videoCameras} priceBreakdown />
        <ItemCard title="Photocameras cost" item={photoCameras} priceBreakdown/>
        <ItemCard title="Drone cost" item={drones} priceBreakdown/>
        <ItemCard deliverable title="Deliverables" />
        <ItemCard full title="Advance payment" item={[{ value: advance, label: STRINGS.advance.label, name: STRINGS.advance.name }]} />
      </Grid>
    </form>
  );
};

export default Content;