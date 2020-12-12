import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles, ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

import Content from './Content';
import Header from './Header';
import Drawer from './Drawer';
import Expenses from './Expenses';
import { getNewTravelingArray, calculateTotalCost, calculateExternalCost } from './functions';
import { Application } from './store';


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
  const numberRegex = new RegExp(/^[0-9]+$/i);

  const [packageDays, setPackageDays] = useState([{ value: 2, label: 'Number of Days', name: 'number-of-days' }]);

  const [cost, setCost] = useState({
    wage: 5000,
    videoCamera: 5000,
    photoCamera: 5000,
    album: 10000,
    usb: 1000,
    drone: 10000,
    videoEditing: 2000
  });

  const [state, setState] = useState({
    menuOpen: false
  });

  const [number, setNumber] = useState({
    days: 1,
    albums: 1,
    usbs: 2,
    drones: 0,
    videoCameras: 1,
    photoCameras: 1
  });

  const [traveling, setTraveling] = useState([]);

  const travelingCost = calculateTotalCost(traveling);
  const videoCost = calculateExternalCost({ days: number.days, number: number.videoCameras, cost: cost.videoCamera });
  const videoEditingCost = calculateExternalCost({ days: number.days, number: number.videoCameras, cost: cost.videoEditing });
  const photoCost = calculateExternalCost({ days: number.days, number: number.photoCameras, cost: cost.photoCamera });
  const droneCost = calculateExternalCost({ days: number.days, number: number.drones, cost: cost.drone });
  const usbCost = calculateExternalCost({ days: number.days, number: number.usbs, cost: cost.usb });
  const albumCost = calculateExternalCost({ days: number.days, number: number.albums, cost: cost.album });  
  const totalCostItems = [travelingCost, videoCost, photoCost, droneCost, usbCost, albumCost, videoEditingCost];
  const totalCost = calculateTotalCost(totalCostItems);

  const totalWage = parseInt(cost.wage) * parseInt(number.days);
  const clientQuote = totalCost + totalWage;

  useEffect(() => {
    const t = getNewTravelingArray({ days: parseInt(number.days), traveling });
    setTraveling(t);
  }, [number.days, traveling]);


  const handleMenuButtonClick = () => {
    setState({ ...state, menuOpen: !state.menuOpen });
  };

  const handleInputOnChange = ({ target: { name, value }}) => {
    if (numberRegex.test(value) || value.length === 0) {
      const nameArray = name.split('-');
      switch(nameArray[0]) {
        case 'cost': {
          setCost({ ...cost, [nameArray[1]]: value });
          break;
        }
        case 'number': {
          setNumber({ ...number, [nameArray[1]]: value });
          break;
        }
        case 'traveling': {
          traveling[parseInt(nameArray[1])] = value;
          setTraveling([...traveling]);
          break;
        }
        default:
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>      
      <Paper className={classes.root}>
        <Drawer {...cost} {...state} onMenuButtonClick={handleMenuButtonClick} onInputChange={handleInputOnChange} />
        <Grid container direction="column">
          <Header onMenuButtonClick={handleMenuButtonClick} clientQuote={clientQuote}/>
          <Grid item container>
            <Grid item xs={false} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <Content packageDays={packageDays} {...number} onInputChange={handleInputOnChange} traveling={traveling}/>
              <Expenses travelingCost={travelingCost} videoCost={videoCost} photoCost={photoCost} videoEditingCost={videoEditingCost}
                droneCost={droneCost} usbCost={usbCost} albumCost={albumCost} totalCost={totalCost} clientQuote={clientQuote} totalWage={totalWage}
              />
            </Grid>
            <Grid item xs={false} sm={2}></Grid>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
