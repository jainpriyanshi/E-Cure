import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerPatient } from "../../actions/authActions";
import classnames from "classnames";

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

var sectionStyle = {
  height: "120vh",
 background: `url(${process.env.PUBLIC_URL}/bg.jpg)` ,
 backgroundPosition: 'center',
 backgroundSize: 'cover',
 backgroundRepeat: 'no-repeat',
 backgroundAttachment: "static",
};


class RegisterPatient extends Component {
  constructor() {
    super();
    this.state = {
     name: "",
     email: "",
     password: "",
     password2: "",
     phone: "",
     errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/patient/dashboard");
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state);
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      phone: this.state.phone
    };
    console.log(newUser);
    this.props.registerPatient(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;

    return (
      <div style={sectionStyle}>
        <br></br>
        
      <div class="container">
          <div class="row">
          <div class="col-md-6 col-sm-12 ">
              </div>
              <div class="col-md-6 col-sm-12">
              <Box width ="100%" height="100%"  item xs={12} sm={8} md={5} component={Paper} elevation={6} className="card" >
                <div class="conainer">
              <div >
              <h4 style={{ margin: "50px 50px "  }}>
              <b>Patient Sign In</b>
              </h4>
              </div>
                <form noValidate onSubmit={this.onSubmit} style={{ margin: "40px 40px"  }}>
                  <div className="input-field col s12">
                  <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  placeholder="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
               
                <span className="red-text">{errors.name}</span>
                  </div>

                  <div className="input-field col s12">
                  <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  placeholder="email"
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                
                <span className="red-text">{errors.email}</span>
                </div>

                
                <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.phone}
                  error={errors.phone}
                  placeholder="Contact Number"
                  id="phone"
                  type="text"
                  className={classnames("", {
                    invalid: errors.phone
                  })}
                />
               
                <span className="red-text">{errors.phone}</span>
                  </div>


                <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  placeholder="Password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                
                <span className="red-text">{errors.password}</span>
                </div>

                <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  placeholder="confirm password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                
                <span className="red-text">{errors.password2}</span>
              </div>


                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Sign In
                  </button>
                  <p className="grey-text text-darken-1 mt-2 mb-2">
                  Already have an account? <Link to="/patient/login">Log in</Link>
                </p>
                </div>

              </form>
              </div>
          
              </Box>
              </div>
              
            </div>
      </div>   
      </div>

    );
  }
}

RegisterPatient.propTypes = {
  registerPatient: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerPatient }
)(withRouter(RegisterPatient));