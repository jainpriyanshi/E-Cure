import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerDoctor } from "../../actions/authActions";
import classnames from "classnames";

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

var sectionStyle = {
  height: "170vh",
 background: `url(${process.env.PUBLIC_URL}/bg.jpg)` ,
 backgroundPosition: 'center',
 backgroundSize: 'cover',
 backgroundRepeat: 'no-repeat',
 backgroundAttachment: "static",
};

class RegisterDoctor extends Component {
  constructor() {
    super();
    this.state = {
      name:"",
      email: "",
      address:"",
      reg_num:"",
      phone:"",
      specialization: "",
      password: "",
      password2: "",
      errors: {},
      hospital_name: "",
      mon: true,
      tues: true,
      wed: true,
      thurs: true,
      fri: true,
      sat: true,
      sun: true,
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated ) {
      this.props.history.push("/doctor/dashboard");
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
      address:this.state.address,
      phone:this.state.phone,
      reg_num: this.state.reg_num,
      hospital_name: this.state.hospital_name,
      specialization:this.state.specialization,
      password: this.state.password,
      password2: this.state.password2,
      mon: this.state.mon,
      tues: this.state.tues,
      wed: this.state.wed,
      thrus: this.state.thrus,
      fri: this.state.fri,
      sat: this.state.sat,
      sun: this.state.sun,
    };
    console.log(newUser);
    this.props.registerDoctor(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div style={sectionStyle}>
        <br />
        <div class="container">
          <div class="row">
          <div class="col-lg-6 col-sm-12 container">  
          </div>
            <div class="col-lg-6 col-sm-12 container">  
              <Box width ="100%" height="100%"  item xs={12} sm={8} md={5} component={Paper} elevation={6} className="card" >
                <div class="conainer">
                <div >
                <h4 style={{ margin: "50px 50px "  }}>
              <b>Register as Doctor</b>
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
                  id="email"
                  placeholder="email"
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
                  value={this.state.address}
                  error={errors.address}
                  id="address"
                  placeholder="address"
                  type="text"
                  className={classnames("", {
                    invalid: errors.address
                  })}
                />
               
                <span className="red-text">{errors.address}</span>
                </div>

                

                <div className="input-field col s12">
                  <input
                  onChange={this.onChange}
                  value={this.state.reg_num}
                  error={errors.reg_num}
                  placeholder="registration number"
                  id="reg_num"
                  type="text"
                  className={classnames("", {
                    invalid: errors.reg_num
                  })}
                />
                
                <span className="red-text">{errors.reg_num}</span>
                </div>


                <div className="input-field col s12">
                  <input
                  onChange={this.onChange}
                  value={this.state.hospital_name}
                  error={errors.hospital_name}
                  id="hospital_name"
                  placeholder="Hospital name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.hospital_name
                  })}
                />
               
                <span className="red-text">{errors.hospital_name}</span>
                </div>



                
                <div className="input-field col s12">
                  <input
                  onChange={this.onChange}
                  value={this.state.specialization}
                  error={errors.specialization}
                  id="specialization"
                  placeholder="specialization"
                  type="text"
                  className={classnames("", {
                    invalid: errors.specialization
                  })}
                />
              
                <span className="red-text">{errors.specialization}</span>
                </div>


                

                <div className="input-field col s12">
                  <input
                  onChange={this.onChange}
                  value={this.state.phone}
                  error={errors.phone}
                  id="phone"
                  placeholder="Contact Number"
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
                  placeholder="Confirm Password"
                  id="password2"
                  type="password"
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
                  Register
                  </button>
                  <p className="grey-text text-darken-1 mt-2 mb-2">
                  Already have an account? <Link to="/doctor/login"> Login</Link>
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

RegisterDoctor.propTypes = {
  registerDoctor: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerDoctor }
)(withRouter(RegisterDoctor));