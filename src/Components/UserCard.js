import { useState } from 'react';
import { Card, CardHeader, Avatar, Button , Typography, CardContent, CardActions, IconButton, Box, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch } from '../redux/store';
import { deleteUser } from '../redux/user.js';
import DialogPatchUser from './DialogPatchUser';


export default function UserCards(props) {
  const dispatch = useDispatch();

  const { name, email, picture, location, login } = props.user;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={picture?.medium || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />}
        title={`${name.title} ${name.first} ${name.last}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Box component={Icon} icon={'akar-icons:envelope'} sx={{ width: '10px', height: '10px', mr: "5px" }} />{email}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Box component={Icon} icon={'akar-icons:location'} sx={{ width: '10px', height: '10px', mr: "5px" }} /> {parseInt(location.street.number)} {location.street.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {location.city},{location.country}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: "flex", justifyContent: "flex-end" }}>
        <DialogPatchUser user={props.user} />
        <IconButton aria-label="add to favorites" onClick={handleClickOpen}>
          <Box component={Icon} icon={'akar-icons:trash-can'} sx={{ width: '20px', height: '20px' }} />
        </IconButton>
      </CardActions>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete {name.first} {name.last}?</DialogTitle>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => {dispatch(deleteUser(login.uuid)); setOpen(false);}} variant="contained">Yes, delete</Button>
          <Button type="submit" >Cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

