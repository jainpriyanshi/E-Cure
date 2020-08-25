import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import axios from 'axios';
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import PatientRegister from "./components/patientauth/register";
import PatientLogin from "./components/patientauth/login";
import PatientVerify from './components/patientauth/verify';
import PatientDashboard from './components/patientdashboard/Dashboard';
import PatientGetAppointment from './components/patientdashboard/GetAppointment';

import DoctorRegister from "./components/doctorauth/register";
import DoctorLogin from "./components/doctorauth/login";
import DoctorVerify from './components/doctorauth/verify';
import DoctorDashboard from './components/doctordasboard/Dashboard';
import UploadPrescription from './components/doctordasboard/UploadPrescription';
import ViewPrescriptions from './components/doctordasboard/Prescriptions';

import Navbar from './components/navbar/navbar';
import PrivateNavbar from './components/privateroutes/PrivateNavbar'

import Map from './components/landing/map';

import Chat from './components/chat/homepage'
import List from "./components/doctorslist"

if (localStorage.jwtToken) {

  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./";
  }
}
class App extends Component {
  constructor (props) {
    super(props);
    this.state = { 
        total: {},
        statewise: []
     };
   }
    componentDidMount(){
        axios.get('https://api.covidindiatracker.com/state_data.json')
        .then(res=> this.setState({statewise: res.data}))
        .catch(err => console.log(err));
        axios.get('https://api.covidindiatracker.com/total.json')
        .then(res=> this.setState({total: res.data}))
        .catch(err => console.log(err));
    }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App"> 
          <Switch>
              <PrivateNavbar  component={Navbar} />
            </Switch>  
            <Route exact path="/" render={(props) => <Map {...props} state={this.state}/> } />
            <Route exact path="/patient/register" component={PatientRegister} />
            <Route exact path="/patient/verify" component={PatientVerify} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/list" component={List} />
            <Route exact path="/patient/login" component={PatientLogin} />
            <Route exact path="/patient/dashboard" component={PatientDashboard} />
            <Route exact path="/patient/getAppointment" component={PatientGetAppointment} />
            <Route exact path="/doctor/register" component={DoctorRegister} />
            <Route exact path="/doctor/verify" component={DoctorVerify} />
            <Route exact path="/doctor/login" component={DoctorLogin} />
            <Route exact path="/doctor/dashboard" component={DoctorDashboard} />
            <Route exact path="/doctor/dashboard/upload-pres" component={UploadPrescription} />
            <Route exact path="/doctor/viewPrescriptions" component={ViewPrescriptions} />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
