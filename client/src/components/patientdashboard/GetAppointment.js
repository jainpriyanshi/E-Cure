import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 700,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  Form: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
  },
  FormContent: {
      height: 500,
      marginTop: 30,
      display: 'flex',
      flexDirection: 'column',
    //   alignItems: spaceEvenly,
    justifyContent: "space-evenly",
    alignItems: "space-evenly"

  },
  TextInput: {
    //   width: 300,
    //   padding: 10,
      margin: 10,
      borderBottom: 'none',
      boxShadow: 'none',
      textTransform: 'none',
  },
  Button: {
    // padding: 100
    margin: 10,
    backgroundColor: '#008000'
    // backgroundColor: '#ffffff'
  }
}));



const GetAppointment = () => {
    const classes = useStyles();
    const history = useHistory();
  const [speciality, setSpeciality] = React.useState('');
  const [name, setName] = React.useState('');
  const [days, setDays] = React.useState('');
  const [ailment, setAilment] = React.useState('');

  const [doctorSpecialities, setDoctorSpecialities] = useState([]);
  const [doctorName, setDoctorName] = useState([]);
  const [doctorDays, setDoctorDays] = useState([]);

  useEffect(() => {
    
    const sendingRequest = async () => {
      try{
        const response = await fetch(`http://localhost:3000/doctor/getSpecialization`, {
          // headers: {
            // "Authorization": localStorage.getItem("accessToken")
          // }
        });
        const responseData = await response.json();
        // console.log(responseData)
        setDoctorSpecialities(Object.keys(responseData.response))
      } catch(err){
        console.log(err);
      }
    }
    sendingRequest();

    const sendingRequest2 = async () => {
      try{
        const response = await fetch(`http://localhost:3000/doctor/getSpecialization`, {
          // headers: {
            // "Authorization": localStorage.getItem("accessToken")
          // }
        });
        const responseData = await response.json();
        // console.log(responseData)
        Object.entries(responseData.response).map(mainitem => {

          setDoctorName( item => {
            return (
              [
                ...item, {
                  id: mainitem[0],
                  value: mainitem[1]
                }
              ]
            )
          } )
          
        })
        // setDoctorName(responseData.response);
      } catch(err){
        console.log(err);
      }
    }
    sendingRequest2();

    const sendingRequest3 = async () => {
      try{
        const response = await fetch(`http://localhost:3000/doctor/getDays`, {
          // headers: {
            // "Authorization": localStorage.getItem("accessToken")
          // }
        });
        const responseData = await response.json();
        console.log("f",responseData)
        Object.entries(responseData.response).map(mainitem => {

          setDoctorDays( item => {
            return (
              [
                ...item, {
                  id: mainitem[0],
                  value: mainitem[1]
                }
              ]
            )
          } )
          
        })
        // setDoctorDays(responseData.doctorDays);
      } catch(err){
        console.log(err);
      }
    }
    sendingRequest3();



  }, [])

  // useEffect(() => {
  //   console.log(doctorDays)
  // }, [doctorDays])


  const handleChange = (event) => {
    setSpeciality(event.target.value);
  };
  const handleChange2 = (event) => {
    setName(event.target.value);
  };
  const handleChange3 = (event) => {
    setDays(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch(`/patient/postAppointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": localStorage.getItem('jwtToken')
        },
        body: JSON.stringify({
          name: name,
          status: 0,
          specialization: speciality,
          day:days,
          ailment:ailment
        })
      });
      const responseData = await response.json();
      console.log("a",responseData);
      if(responseData.success===false)
      throw Error
      history.push('/patient/dashboard');
    } catch(err){
      console.log(err);
    }
    // setDays(event.target.value);
  };

    return (
        <React.Fragment>
        <Toolbar/>
        <Grid container>
            <Grid item xs={12} className={classes.Form}>
            <form onSubmit={handleSubmit}>
            <div className={classes.FormContent}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Doctors Specialties</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={speciality}
                onChange={handleChange}
                >
                { doctorSpecialities.map( (item) => {
                  return (
                    <MenuItem value={item}>{item}</MenuItem>    
                  )
                } )}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Doctors Name</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={name}
                onChange={handleChange2}
                >
                {
                  speciality && doctorName.filter(item => item.id === speciality).map(filteredvalue => { return filteredvalue.value.map( item => {return <MenuItem value={item}>{item}</MenuItem>} ) })
                }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Doctors Days</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={days}
                onChange={handleChange3}
                >
                {
                  name && doctorDays.filter(item => item.id === name).map(filteredvalue => { return filteredvalue.value.map( item => {return <MenuItem value={item}>{item}</MenuItem>} ) })
                }
                </Select>
            </FormControl>
            <TextField id="standard-basic" label="Ailment" className={classes.TextInput} onChange={(e)=>{setAilment(e.target.value)}} />
            <Button variant="contained" className={classes.Button} type="submit" >
                Get Appointment
            </Button>
            </div>
            </form>
            </Grid>
        </Grid>
        </React.Fragment>
    )
}

export default GetAppointment;