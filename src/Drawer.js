import React from 'react';
import { Drawer, List, ListItem, TextField, IconButton, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { Application } from './store';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const DrawerComponent = props => {
  const classes = useStyles();
  const pricelist = useSelector(Application.Selectors.getPricelist);
  
  const { wage, videoCamera, photoCamera, album, usb, drone, videoEditing, onMenuButtonClick, menuOpen, onInputChange } = props;

  return (
    <Drawer anchor="left" open={menuOpen}>
      <div className={classes.toolbar}>
        <IconButton onClick={onMenuButtonClick}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem>
          <TextField variant="outlined" label="My Wage" fullWidth value={pricelist.wage} name="cost-wage" onChange={onInputChange} />
        </ListItem>
        <ListItem>
          <TextField variant="outlined" label="Single Videocamera Cost" fullWidth value={videoCamera} name="cost-videoCamera" onChange={onInputChange} />
        </ListItem>
        <ListItem>
          <TextField variant="outlined" label="Video Editing Cost" fullWidth value={videoEditing} name="cost-videoEditing" onChange={onInputChange} />
        </ListItem>
        <ListItem>
          <TextField variant="outlined" label="Single Photocamera Cost" fullWidth value={photoCamera} name="cost-photoCamera" onChange={onInputChange} />
        </ListItem>
        <ListItem>
          <TextField variant="outlined" label="Drone Cost" fullWidth value={drone} name="cost-drone" onChange={onInputChange} />
        </ListItem>
        <ListItem>
          <TextField variant="outlined" label="Album Cost" fullWidth value={album} name="cost-album" onChange={onInputChange} />
        </ListItem>
        <ListItem>
          <TextField variant="outlined" label="USB Cost" fullWidth value={usb} name="cost-usb" onChange={onInputChange} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DrawerComponent;