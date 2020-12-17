import React from 'react';
import { Grid, TextField, Card, CardContent, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';
import { Application } from './store';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 16,
  },
  cardBlue: {
    background: '#4e8d7c',
  },
}));

const ClientInfo = ({ generatePDF }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const client = useSelector(Application.Selectors.getClient);
  const extra = useSelector(Application.Selectors.getExtra);

  const onChange = ({ target: { name, value }}) => dispatch(Application.Actions.updateClient({ key: name, value }));
  const handleExtraOnChange = ({ target: { value }}) => dispatch(Application.Actions.addExtra({ value }));

  const onFocus = event => event.target.select();

  return (
    <Grid item xs={12}>
      <Card className={classes.cardBlue}>
        <CardContent>
          <Typography gutterBottom color="textSecondary" className={classes.title}>Client information</Typography>
          <Grid container spacing={2} direction="row">
            <Grid xs={12} sm={4} item>
              <TextField variant="outlined" label='Name of the Client' fullWidth name='name' onChange={onChange} onFocus={onFocus} value={client.name}/>        
            </Grid>
            <Grid xs={12} sm={4} item>
              <TextField variant="outlined" label='Phone number of the Client' fullWidth name='phone' onChange={onChange} onFocus={onFocus} value={client.phone}/>        
            </Grid>
            <Grid xs={12} sm={4} item>
              <TextField variant="outlined" label='My Extra' fullWidth name='extra' onChange={handleExtraOnChange} onFocus={onFocus} value={extra}/>        
            </Grid>
            <Grid xs={12} sm={6} item>
              <Button onClick={generatePDF} variant="contained" color="primary">Generate Quote/Invoice</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ClientInfo;