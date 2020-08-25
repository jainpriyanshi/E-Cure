import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class doctorslist extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            doctors: []
         };
        }
        componentDidMount(){
            axios.get('/doctor/getSpecializationAndName')
            .then(res=>  this.setState({doctors: res.data}) )
            .catch(err => console.log(err));
        }
        handleAdd = (event, user) => {
            event.preventDefault();
              var msg = {
                  user1_name: user.name,
                  user1_id: user._id,
                  user2_name: this.props.auth.user.name,
                  user2_id : this.props.auth.user.id
              }
              console.log(msg);
              axios.post('/chat/createchat',msg)
              .then(res=> this.props.history.push('/chat'))
              .catch(err => console.log(err));
          }
    render() {
        return (
            <div style={{marginTop: "70px"}}>
                {this.state.doctors.map(arr => 
                    (
                        <div class="card container" key={arr._id} onClick={(event)=> {this.handleAdd(event,arr)}}>
                            {arr.name} <br/>
                            {arr.specialization}
                        </div>
                    )
                )}
            </div>
        )
    }
}

doctorslist.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(doctorslist);