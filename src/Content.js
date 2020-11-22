import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(2),
  }
}));

const Content = props => {
  const classes = useStyles();
  const { days, albums, usbs, drones, videoCameras, photoCameras, onInputChange, traveling } = props;
  const onFocus = event => event.target.select();
  const travelingFields = traveling.map((_, i) => {
    const label = `Traveling Cost on day ${i + 1}`;
    const name = `traveling-${i}`;
    return (
      <Grid item xs={12} sm={4} key={`traveling-${i}`}>
        <TextField variant="outlined" label={label} fullWidth value={traveling[i]} name={name} onChange={onInputChange} onFocus={onFocus}/>
      </Grid>
    );
  });
  
  return (
    <form className={classes.form} autoComplete="off">
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} sm={4}>          
          <TextField variant="outlined" label="Number of Days" fullWidth value={days} name="number-days" onChange={onInputChange} onFocus={onFocus}/>
        </Grid>
        {travelingFields}
        <Grid item xs={12} sm={4}>          
          <TextField variant="outlined" label="Number of Albums" fullWidth value={albums} name="number-albums" onChange={onInputChange} onFocus={onFocus}/>
        </Grid>
        <Grid item xs={12} sm={4}>          
          <TextField variant="outlined" label="Number of USBs" fullWidth value={usbs} name="number-usbs" onChange={onInputChange} onFocus={onFocus}/>
        </Grid>
        <Grid item xs={12} sm={4}>          
          <TextField variant="outlined" label="Number of Drones" fullWidth value={drones} name="number-drones" onChange={onInputChange} onFocus={onFocus}/>
        </Grid>
        <Grid item xs={12} sm={4}>          
          <TextField variant="outlined" label="Number of Video Cameras" fullWidth value={videoCameras} name="number-videoCameras" onChange={onInputChange} onFocus={onFocus}/>
        </Grid>
        <Grid item xs={12} sm={4}>          
          <TextField variant="outlined" label="Number of Photo Cameras" fullWidth value={photoCameras} name="number-photoCameras" onChange={onInputChange} onFocus={onFocus}/>
        </Grid>
      </Grid>
    </form>
  );
};

export default Content;