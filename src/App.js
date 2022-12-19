import './App.css';
import { useEffect, useState } from 'react';
import { Box, Container, Typography, Stack, TextField, InputAdornment } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch } from './redux/store';
import { getUsers } from './redux/user.js';
import UsersList from './Components/UsersList';
import DialogAddUser from './Components/DialogAddUser';


function App() {

  const dispatch = useDispatch();

  const [inputText, setInputText] = useState("");
  
  let inputHandler = (e) => {
    //convert input text to lower case
    // var lowerCase = e.target.value.toLowerCase();
    setInputText(e.target.value.toLowerCase());
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  return (
    <>
      <Box>
        <Container sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, mt: 3 }}>
            The Users Library
          </Typography>
          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <TextField
              onChange={inputHandler}
              stretchstart={200}
              placeholder="Search user..."
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component={Icon} icon={'eva:search-fill'} sx={{ marginLeft: '8px', width: '20px', height: '20px', color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
            <DialogAddUser />
          </Stack>
          <UsersList input={inputText} />
        </Container>
      </Box>
    </>
  );
}

export default App;
