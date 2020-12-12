import React from 'react';
import { Grid, TextField, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { blue } from '@material-ui/core/colors';

import { Application } from './store';
import ItemCard from './ItemCard';
import { EXPENSES } from './constants';

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

const Content = props => {
  // const dispatch = useDispatch();
  const classes = useStyles();
  // const { 
  //   days, albums, usbs, drones, /*videoCameras, photoCameras,*/ onInputChange, traveling
  // } = props;

  const packageDays = useSelector(Application.Selectors.getPackageDays);
  const travelling = useSelector(Application.Selectors.getExpense(EXPENSES.travelling));
  const videoCameras = useSelector(Application.Selectors.getExpense(EXPENSES.videoCamera));
  const photoCameras = useSelector(Application.Selectors.getExpense(EXPENSES.photoCamera));


  
  // const travelingFields = traveling.map((_, i) => {
  //   const label = `Traveling Cost on day ${i + 1}`;
  //   const name = `traveling-${i}`;
  //   return (
  //     <Grid item xs={12} sm={4} key={`traveling-${i}`}>
  //       <TextField variant="outlined" label={label} fullWidth value={traveling[i]} name={name} onChange={onInputChange} onFocus={onFocus}/>
  //     </Grid>
  //   );
  // });
  
  return (
    <form className={classes.form} autoComplete="off">
      <Grid container spacing={2} direction="row">
        <ItemCard full title="Total number of Days in this Package" item={[packageDays]} />
        <ItemCard title="Travelling cost" item={travelling} />
        <ItemCard title="Videocameras cost" item={videoCameras} />
        <ItemCard title="Photocameras cost" item={photoCameras} />
        <ItemCard deliverable title="Deliverables" />
        
        {/* <Grid item xs={12}>
          <TextField variant="outlined" label="Number of Days" fullWidth value={days} name="number-days" onChange={onInputChange} onFocus={onFocus}/>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField variant="outlined" label="Number of Days" fullWidth value={days} name="number-days" onChange={onInputChange} onFocus={onFocus}/>
        </Grid>
        {travelingFields} */}
        {/* <Grid item xs={12} sm={4}>          
          <TextField variant="outlined" label="Number of Albums" fullWidth value={albums} name="number-albums" onChange={onInputChange} onFocus={onFocus}/>
        </Grid>
        <Grid item xs={12} sm={4}>          
          <TextField variant="outlined" label="Number of USBs" fullWidth value={usbs} name="number-usbs" onChange={onInputChange} onFocus={onFocus}/>
        </Grid> */}
        {/* <Grid item xs={12} sm={4}>          
          <TextField variant="outlined" label="Number of Drones" fullWidth value={drones} name="number-drones" onChange={onInputChange} onFocus={onFocus}/>
        </Grid> */}
        {/* <Grid item xs={12} sm={4}>          
          <TextField variant="outlined" label="Number of Video Cameras" fullWidth value={videoCameras} name="number-videoCameras" onChange={onInputChange} onFocus={onFocus}/>
        </Grid> */}
        {/* <Grid item xs={12} sm={4}>          
          <TextField variant="outlined" label="Number of Photo Cameras" fullWidth value={photoCameras} name="number-photoCameras" onChange={onInputChange} onFocus={onFocus}/>
        </Grid> */}
      </Grid>
    </form>
  );
};

export default Content;