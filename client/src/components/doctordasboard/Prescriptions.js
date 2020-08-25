import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Toolbar } from '@material-ui/core';
import Pres1 from '../PrescriptionImages/Prescription1.jpeg';
// import Pres2 from '../PrescriptionImages/Prescription2.jpeg';
// import Pres3 from '../PrescriptionImages/Prescription3.jpeg';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 10
  },
  media: {
    height: 140,
  },
  PrescriptionText: {
      display: 'flex',
      width: '100vw',
      justifyContent: 'center',
      fontSize: 40,
      fontFamily: 'Roboto',
      color: 'green',
      marginTop: 10,
      marginBottom: 10,
  }
});

const Prescription = () => {
  const [uploadedFile, setUploadedFile] = useState([{}]);

useEffect( ()=> {
    const SendingRequest = async () => {
      try{
        const response = await fetch('/doctor/displayPrescription', {
          headers: {
            // 'Content-Type': 'application/json',
            "x-access-token": localStorage.getItem('jwtToken')
            // "Authorization": localStorage.getItem("accessToken")
          },
        });
        const responseData = await response.json();
        console.log(responseData);
        // let temp=[];
        for(let i=0;i<responseData.length;i++)
        {
            setUploadedFile( item => {
                return [ ...item , responseData[i]]
            })
        }
      } catch (err) {
        console.log(err);
      }
    }
    SendingRequest();
  },[]);

  const classes = useStyles();

  return (
    <React.Fragment>
    <Toolbar/>
    <div className={classes.PrescriptionText}>
        Prescription
    </div>
    {uploadedFile.map(item => {
        return (
        <>
        <Card className={classes.root}>
            <CardActionArea>
            <CardMedia
                className={classes.media}
                image={Pres1}
                title="Prescriptions"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {"Shweta Gurnani"}
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
        <Card className={classes.root}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image={Pres1}
            title="Prescriptions"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {"Priyanshi Jain"}
            </Typography>
        </CardContent>
        </CardActionArea>
        </Card>
        <Card className={classes.root}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image={Pres1}
            title="Prescriptions"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {"Susmita Mazumdar"}
            </Typography>
        </CardContent>
        </CardActionArea>
        </Card>
        </>
        )
    })}
    </React.Fragment>
  );
};

export default Prescription;
