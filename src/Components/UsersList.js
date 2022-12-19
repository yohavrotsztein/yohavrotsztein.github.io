import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import UserCard from './UserCard';
import { useSelector } from '../redux/store';


export default function UsersList(props) {
  const users = useSelector((state) => state.user.users)
  const [userList, setUserList] = useState(users)
  useEffect(() => {
    setUserList(users)
  }, [users])

  // filtered only by mail
  const filteredData = userList.filter((el) => {
    if (props.input === '') {
      return el;
    }
    else {
      return el.email.includes(props.input)
    }
  })


  return (

    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)'
        },

      }}
    >
      {filteredData.map((user, index) =>
        <UserCard key={index} user={user} />
      )}
    </Box>
  );
}
