import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {Link} from "react-router-dom"; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Navbar2 extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  render() {
    const { user } = this.props.auth;

    return (

      <div  >
       <AppBar position="fixed" style={{backgroundColor:"white" , width:"100%", align:"left"}}>
        <Toolbar>
        <Link to =  '/'>
            <Typography variant="h6"  style={{textAlign:"left", color: "green" , fontFamily:'Roboto'}}>
              E Cure
          </Typography>
          </Link>
          <Typography variant="h6"  style={{marginLeft: "auto", color : "black" , fontFamily:'Roboto'}}>
            Hey {user.name}  
          </Typography>
          
          <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginRight: "1rem",
                marginLeft: "1rem",
                color: 'black'
              }}
              onClick={this.onLogoutClick}
              class="btn btn-outline-secondary">
              Logout
            </button>
            </Toolbar>
      </AppBar>
      </div>
    );
  }
}

Navbar2.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar2);
