import { useState } from 'react';
import { TextField, Button, IconButton, Box, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from '../redux/store';
import { updateUser } from '../redux/user.js';

import * as Yup from 'yup';


export default function DialogPatchUser(props) {

  const dispatch = useDispatch();
  const { name: { title, first, last }, email, location: { street: { num, name }, city, state }, login, picture } = props.user;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const UpdateUserSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    first: Yup.string().min(3, "Minimum 3 characters").required("Required").trim(),
    last: Yup.string().min(3, "Minimum 3 characters").required("Required").trim(),
    email: Yup.string().email("Invalid email format").required("Required").trim(),
    num: Yup.string().required("Required").trim(),
    name: Yup.string().required("Required").trim(),
    city: Yup.string().required("Required").trim(),
    state: Yup.string().required("Required").trim(),
  });

  const defaultValues = {
    title: title,
    first: first,
    last: last,
    email: email,
    num: num,
    name: name,
    city: city,
    state: state,
  };


  const { register, control, handleSubmit } = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const onSubmit = data => {
    dispatch(updateUser({
      picture: { medium: picture.medium },
      name: { title: data.title, first: data.first, last: data.last },
      email: data.email,
      location: { street: { number: parseInt(data.number), name: data.name }, city: data.city, state: data.state },
      login: { uuid: login.uuid }
    }))
    setOpen(false);
  }

  return (
    <>
      <IconButton aria-label="add to favorites" onClick={handleClickOpen}>
        <Box component={Icon} icon={'akar-icons:edit'} sx={{ width: '20px', height: '20px' }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Edit {first} {last}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack spacing={3}>
              <Box
                sx={{
                  display: 'grid',
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState: { error } }) => <TextField
                    {...field}
                    select
                    label="Title"
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="DEFAULT" disabled>Choose an option ..</option>
                    <option key="Mr" value="Mr">Mr</option>
                    <option key="Monsieur" value="Mr">Monsieur</option>
                    <option key="Ms" value="Ms">Ms</option>
                    <option key="Mrs" value="Mrs">Mrs</option>
                    <option key="Miss" value="Miss">Miss</option>
                    <option key="Mademoiselle" value="Miss">Mademoiselle</option>
                  </TextField>}
                />
                <Controller
                  name="first"
                  control={control}
                  render={({ fieldState: { error } }) => <TextField type="text" label="First name" error={!!error} helperText={error?.message} {...register("first")} />}
                />
                <Controller
                  name="last"
                  control={control}
                  render={({ fieldState: { error } }) => <TextField type="text" label="Last name" error={!!error} helperText={error?.message} {...register("last")} />}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ fieldState: { error } }) => <TextField type="text" label="Email" error={!!error} helperText={error?.message} {...register("email")} />}
                />
                <Controller
                  name="num"
                  control={control}
                  render={({ fieldState: { error } }) => <TextField type="number" label="Number" error={!!error} helperText={error?.message} {...register("num", { valueAsNumber: true })} />}
                />
                <Controller
                  name="name"
                  control={control}
                  render={({ fieldState: { error } }) => <TextField type="text" label="Name" error={!!error} helperText={error?.message} {...register("name")} />}
                />
                <Controller
                  name="city"
                  control={control}
                  render={({ fieldState: { error } }) => <TextField type="text" label="City" error={!!error} helperText={error?.message} {...register("city")} />}
                />
                <Controller
                  name="state"
                  control={control}
                  render={({ fieldState: { error } }) => <TextField type="text" label="State" error={!!error} helperText={error?.message} {...register("state")} />}
                />
              </Box>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button type="submit" variant="contained">Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>

        </form>
      </Dialog>
    </>
  );
}
