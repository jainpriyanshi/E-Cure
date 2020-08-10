import React from "react";
import { Route} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar2 from "../navbar/navbar2"

const PrivateRoute = ({ component: Component,auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Navbar2 {...props} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
