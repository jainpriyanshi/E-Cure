import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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
  }
}));



const GetAppointment = () => {
    const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

    return (
        <Grid container>
            <Grid item xs={12} className={classes.Form}>
            <div className={classes.FormContent}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Doctors Specialties</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
                >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Doctors Name</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
                >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <TextField id="standard-basic" label="Ailment" className={classes.TextInput}/>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Free Slots</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
                >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            </div>
            </Grid>
        </Grid>
    )
}

export default GetAppointment;