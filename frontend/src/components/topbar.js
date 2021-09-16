import React from 'react';
import Button from '@material-ui/core/Button';
import { AppBar, Container, Toolbar, IconButton, Typography, Box, DialogContentText } from '@material-ui/core';
import useStyles from './styles/useStyles';
import TemporaryDrawer from './drawer';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

function Topbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <AppBar position="fixed" color="secondary">
      <Container fixed>
        <Toolbar>
          <IconButton edge="start"
            color="inherit" aria-label="menu" className={classes.menuButton}>
            <TemporaryDrawer />
          </IconButton>
          <Typography variant="h5" className={classes.title}>TodoApp via React</Typography>
          <Box mr={2}>
            <Button color="inherit" variant="outlined" onClick={handleClickOpen}>Log In</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">LOG IN</DialogTitle>
              <DialogContent>
                <DialogContentText>Login to start Multitasking</DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email"
                  type="email"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="pass"
                  label="Password"
                  type="password"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleClose} color="primary">Log In</Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Button color="primary" variant="contained">Sign Up</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Topbar;