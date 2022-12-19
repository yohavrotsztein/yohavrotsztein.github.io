import { useState } from 'react';
import { TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addUser } from '../redux/user.js';
import { useDispatch, useSelector } from '../redux/store';
import * as Yup from 'yup';


export default function DialogAddUser(props) {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const userList = useSelector((state) => state.user.users)


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CreateUserSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    first: Yup.string().min(3, "Minimum 3 characters").required("Required").trim(),
    last: Yup.string().min(3, "Minimum 3 characters").required("Required").trim(),
    email: Yup.string().email("Invalid email format").required("Required").trim(),
    number: Yup.number().required("Required").typeError('Required'),
    name: Yup.string().required("Required").trim(),
    city: Yup.string().required("Required").trim(),
    state: Yup.string().required("Required").trim(),
  });

  const { register, control, handleSubmit } = useForm({
    resolver: yupResolver(CreateUserSchema),
  });

  const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    // eslint-disable-next-line
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  const onSubmit = data => {
    console.log(data);
    dispatch(addUser({
      name: { title: data.title, first: data.first, last: data.last },
      email: data.email,
      location: { street: { number: parseInt(data.number), name: data.name }, city: data.city, state: data.state },
      login: { uuid: uuidv4() }
    }))
    console.log(userList)
    setOpen(false);
  }

  return (
    <>
      <Button onClick={handleClickOpen}>+ Add user</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a user</DialogTitle>
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
                    fullWidth
                    defaultValue='DEFAULT'
                  >
                    <option value="DEFAULT" disabled>Choose an option ..</option>
                    <option key="Mr" value="Mr">Mr</option>
                    <option key="Mrs" value="Mrs">Mrs</option>
                    <option key="Miss" value="Miss">Miss</option>
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
                  name="number"
                  control={control}
                  render={({ fieldState: { error } }) => <TextField type="number" label="Number" error={!!error} helperText={error?.message} {...register("number", { valueAsNumber: true })} />}
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
          <DialogActions sx={{p:3}}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
