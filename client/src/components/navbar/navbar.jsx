import React from 'react';
import {Link} from "react-router-dom"; 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root} >
       <AppBar position="static" style={{backgroundColor:"white",width:"100%", align:"left"}}>
        <Toolbar>
            <Typography variant="h6" className={classes.title} style={{textAlign:"left", fontFamily:'Roboto'}}>
            <Link to =  '/'>
            <Button style={{color:"green" , fontFamily:'Roboto', fontSize: "20px"}}> <b>  E Cure </b>  </Button>
            </Link>
          </Typography>
          
          <Link to =  '/patient/register'>
          <Button style={{color:"black"}}>Patient Register</Button>
          </Link>
          <Link to =  '/patient/login'>
          <Button style={{color:"black"}}> Patient Login </Button>
          </Link>
          <Link to =  '/doctor/register'>
          <Button style={{color:"black"}}>Doctor Register</Button>
          </Link>
          <Link to =  '/doctor/login'>
          <Button style={{color:"black"}}>Doctor Login </Button>
          </Link>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;