import React from 'react';
import { Container, TextField, Button, Grid, Typography, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { styled } from '@mui/material/styles';
import { Users_login_login, Users_register_register } from '../utils';
import Cookies from 'js-cookie';

const useStyles = styled((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginBottom: '10px',
  },
  form: {
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[4],
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

function RegisterPage(props) {
    const { onRegister } = props;
    const [error, setError] = React.useState('');
  const classes = useStyles();

  const handleClick = e => {
    //hacking React Virtual Dom
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('lastname').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;

    Users_register_register(email, password, firstName, lastName)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      //if BAD_REQUEST
      if(response.data['code'] == 400) {
        Cookies.set('isregister', false);
        onRegister(false);
        setError(response.data['message']);    
        return;
      }
      Cookies.set('access', response.data['tokens']['access']['token'])
      Cookies.set('refresh', response.data['tokens']['refresh']['token'])
      Cookies.set('isregister', true);
      Cookies.set('username', firstName + ' ' + lastName);
      onRegister(true)
    })
    .catch((error) => {
      console.log(error);
      Cookies.set('isregister', false);
      setError(error.response.data['message']);    
    });
 }
  return (
    <Container className={classes.container}>
      <Box className={classes.form}>
        <form>
          <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
              <TextField
                label={error == '' ? "Linkedly.ai" : ''}
                variant="filled"
                value={error}
                fullWidth
                disabled
                multiline
                color={'error'}
                className={classes.input}
              />
            </Grid>  
          <Grid item xs={12}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
                id="firstname"
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                id="lastname"
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                id="email"
                className={classes.input}
                InputProps={{
                  startAdornment: <EmailIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                id="password"
                className={classes.input}
                InputProps={{
                  startAdornment: <LockIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleClick}>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default RegisterPage;
