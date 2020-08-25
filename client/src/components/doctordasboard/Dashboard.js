import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DashboardCard from './DashboardCard';

import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
    //   backgroundColor: 'var(--secondary-opacity-0)',
    //   display: 'flex'
    },
    main: {
        // backgroundColor: 'red',
        // width: 2021,
        // width: '100vw'
        // overflow: 'auto',
        whiteSpace: 'nowrap',
        maxHeight: 650,
        height: 618
    },
    AppBar: {
      position: "relative",
      backgroundColor: '#f7f7f7',
      height: 55,
    },
    AppBarContent: {
      display: 'flex',
      alignItems: 'center',
      height: 55,
      minHeight: 55,
    },  
    typo: {
      // marginTop: -10,
      // width: 100,
      // height: 23,
      fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#3a3737'
    },
    typoTotal: {
      // marginTop: 2,
      marginLeft: 5,
      // marginTop: -10,
      // width: 18,
      height: 20,
      fontFamily: 'Poppins',
      fontSize: 14,
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#9999a8',
    },
    Button: {
        // padding: 100
        margin: 20,
        backgroundColor: 'white',
        border: "1px solid #008000"
        // backgroundColor: '#ffffff'
    }
  }));

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };

const Application = (props) => {
    const classes = useStyles()
    const history = useHistory();
    const [underApplication, setUnderApplication] = useState([]);
    const [acceptedApplication, setAcceptedApplication] = useState([]);
    const [rejectedApplication, setRejectedApplication] = useState([]);
    const[underSize,setUnderSize] = useState('');
    const[acceptSize,setAcceptSize] = useState('');
    const[rejectSize,setRejectSize] = useState('');


    useEffect( ()=> {
      const SendingRequest = async () => {
        try{
          const response = await fetch('/doctor/getAllAppointment', {
            headers: {
              // 'Content-Type': 'application/json',
              "x-access-token": localStorage.getItem('jwtToken')
              // "Authorization": localStorage.getItem("accessToken")
            },
          });
          const responseData = await response.json();
          console.log(responseData.appointment);
          let temp1=[];
          let temp2=[];
          let temp3=[];
          for(let i=0;i<responseData.appointment.length;i++)
          {
            if(responseData.appointment[i].status===0)
            temp1.push(responseData.appointment[i])
            if(responseData.appointment[i].status===1)
            temp2.push(responseData.appointment[i])
            if(responseData.appointment[i].status===2)
            temp3.push(responseData.appointment[i])
          }
          setUnderApplication(temp1);
          setAcceptedApplication(temp2);
          setRejectedApplication(temp3);
          setUnderSize(temp1.length);
          setAcceptSize(temp2.length);
          setRejectSize(temp3.length);
        } catch (err) {
          console.log(err);
        }
      }
      SendingRequest();
    },[]);

    return (
      
        <div className={classes.root}>
                <Toolbar/>
                <Button variant="contained" className={classes.Button} onClick={()=>{history.push('/doctor/dashboard/upload-pres')}}>
                Write a Prescription
                </Button>
                <Button variant="contained" className={classes.Button} onClick={()=>{history.push('/doctor/viewPrescriptions')}}>
                View Prescriptions
                </Button>
                <Button variant="contained" className={classes.Button} onClick={()=>{history.push('/chat')}}>
                Chat
                </Button>
                <Grid container className={classes.main}>
                    <Grid item xs={12} lg={4} >
                      <React.Fragment>
                        <CssBaseline />
                        <ElevationScroll {...props}>
                          <AppBar className={classes.AppBar}>
                            <Toolbar className={classes.AppBarContent}>
                              <Typography variant="h6" className={classes.typo}>Under Consideration</Typography>
                              <Typography variant="h6" className={classes.typoTotal}>{underSize}</Typography>
                            </Toolbar>
                          </AppBar>
                        </ElevationScroll>
                        <Container>
                          <Box my={2} overflow="auto">
                            {underApplication.map(item => {
                              return(
                                <DashboardCard underApplication={item} option={true}/> 
                              )
                            })}                                                
                          </Box>
                        </Container>
                      </React.Fragment>
                    </Grid>

                    <Grid item xs={12} lg={4} >
                      <React.Fragment>
                        <CssBaseline />
                        <ElevationScroll {...props}>
                          <AppBar className={classes.AppBar}>
                            <Toolbar className={classes.AppBarContent}>
                              <Typography variant="h6" className={classes.typo}>Accepted</Typography>
                              <Typography variant="h6" className={classes.typoTotal}>{acceptSize}</Typography>
                            </Toolbar>
                          </AppBar>
                        </ElevationScroll>
                        <Container>
                          <Box my={2} overflow="auto">
                            {acceptedApplication.map(item => {
                              return(
                                <DashboardCard underApplication={item} option={false}/> 
                              )
                            })}                                                
                          </Box>
                        </Container>
                      </React.Fragment>
                    </Grid>
                    <Grid item xs={12} lg={4} >
                      <React.Fragment>
                        <CssBaseline />
                        <ElevationScroll {...props}>
                          <AppBar className={classes.AppBar}>
                            <Toolbar className={classes.AppBarContent}>
                              <Typography variant="h6" className={classes.typo}>Rejected</Typography>
                              <Typography variant="h6" className={classes.typoTotal}>{rejectSize}</Typography>
                            </Toolbar>
                          </AppBar>
                        </ElevationScroll>
                        <Container>
                          <Box my={2} overflow="auto">
                            {rejectedApplication.map(item => {
                              return(
                                <DashboardCard underApplication={item} option={false}/> 
                              )
                            })}                                                
                          </Box>
                        </Container>
                      </React.Fragment>
                    </Grid>

                    
                </Grid>
        </div>
    )
}

export  default Application;