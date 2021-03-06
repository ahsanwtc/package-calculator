import React from 'react';
import { Grid, TextField, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';

import { getDispatchParams, calculateExternalCost } from './functions';
import { Application } from './store';
import { DEFAULT_PRICELIST, EXPENSES, STRINGS } from './constants';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 16,
  },
  cardBlue: {
    background: blue[900],
    // marginBottom: theme.spacing(2),
  },
}));

const ItemCard = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deliverables = useSelector(Application.Selectors.getDeliverables);  
  const { title, full: f, deliverable: d, item, priceBreakdown: pd, client: c } = props;
  const full = (f !== undefined && f !== null) ? f : false;
  const deliverable = (d !== undefined && d !== null) ? d : false;
  const priceBreakdown = (pd !== undefined && pd !== null) ? pd : false;
  const client = (c !== undefined && c !== null) ? c : false;

  let items = null, breakdown = [];
  
  const gridItemProps = { item: true, xs: 12, lg: 3 };
  if (full) { gridItemProps.lg = 12; } else { gridItemProps.sm = 6; }

  if (client) {
    gridItemProps.sm = 6;
    gridItemProps.lg = 6;
  }

  const onChange = ({ target: { name, value }}) => {
    const state = getDispatchParams({ name, value });
    if (state) {
      const { index, expense } = state;
      dispatch(Application.Actions[state.dispatch]({ index, value, expense }));
    }
  };

  const onFocus = event => event.target.select();

  if (item) {
    items = item.map((i, index) => {
      const { name, label, value } = i;
      if (priceBreakdown) {
        const n = name.split('-');
        const price = n[1] === EXPENSES.travelling ? 1 : DEFAULT_PRICELIST[n[1]];
        breakdown.push(
          <Grid item key={`breakdown-${name}`}>
            <Typography variant="caption">Cost on day {index + 1}: {calculateExternalCost({ expense: [i], price })}</Typography>
          </Grid>
        );
      }

      return (
        <Grid key={`${name}-${index}`} {...gridItemProps} item>
          <TextField variant="outlined" label={label} fullWidth name={name} onChange={onChange} onFocus={onFocus} value={value}/>        
        </Grid>
      );
    });
  }

  if (deliverable) {
    items = [];
    for (const d of Object.keys(deliverables)) {
      items.push (
        <Grid key={`deliverable-${d}`} {...gridItemProps} item>
          <TextField variant="outlined" label={STRINGS[d].label} fullWidth name={STRINGS[d].name} onChange={onChange} onFocus={onFocus} value={deliverables[d]}/>        
        </Grid>
      );
    }
  }

  return (
    <Grid item xs={12}>
      <Card className={classes.cardBlue}>
        <CardContent>
          <Typography gutterBottom color="textSecondary" className={classes.title}>
            {title}
          </Typography>
          <Grid container spacing={2} direction="row">
            {items}
          </Grid>
          <Grid container direction="column">
            {breakdown}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ItemCard;