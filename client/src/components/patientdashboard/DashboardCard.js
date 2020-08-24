import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import Dialog from './Dialog';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 150,
    marginBottom: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  CardContent: {
    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'center',
    //   alignItems: 'center',
      marginTop: 20,
      marginLeft: 20
  }
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
//   if(props.underApplication)
//   console.log("asassa",props.underApplication.status)
const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
    <Card className={classes.root} variant="outlined" onClick={handleClickOpen}>
      <CardContent className={classes.CardContent}>
        <Typography variant="h5" component="h2">
            {props.underApplication && props.underApplication.doctor_name}
        </Typography>
        <Typography variant="body2" component="p">
        {props.underApplication && props.underApplication.ailment}
        </Typography>
      </CardContent>
    </Card>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Doctor Name -"}{props.underApplication && props.underApplication.doctor_name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ailment - {props.underApplication && props.underApplication.ailment}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Day - {props.underApplication && props.underApplication.day}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Specialization - {props.underApplication && props.underApplication.specialization}
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Reject
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}