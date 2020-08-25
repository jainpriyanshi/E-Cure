import React, { Component } from 'react'
import {Link} from "react-router-dom"; 
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import io from "socket.io-client";
import bg from "../images/bg.png"
const socket = io.connect("https://summer20-sps-83.appspot.com/");
class homepage extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            current_user : "",
            current_id: "",
            chats: [],
            chatlist: [],
            msg: "",
         };
       }
        componentDidMount(){
            socket.on("change_data", this.change_data);
            axios.get(`/chat/getuser/${this.props.auth.user.id}`)
            .then(res=>  this.setState({chatlist: res.data}) )
            .catch(err => console.log(err));
            this.change_data()
        }
        onMessageSubmit = e => {
            e.preventDefault();
            const chat = {
                  sender: this.props.auth.user.name,
                  receiver: this.state.current_user,
                  sender_id: this.props.auth.user.id,
                  receiver_id: this.state.current_id,
                  msg: this.state.msg
              };
              socket.emit("chat message" , chat);
              this.setState({msg: ""});
          };
          onChange = e => {
            this.setState({ [e.target.id]: e.target.value });
            console.log(this.state);
            };
          change_data = () =>{
            console.log("data changed")
            axios.get('/chat/getchat')
            .then((response) => {
              this.setState({chats : response.data});
          });
        }
        handleChangeUser = (event, user) => {
            event.preventDefault();
            this.setState({current_user: user.user_name , current_id: user.user_id})
            console.log(this.state);
          }
    fetch_user(){
        return this.state.chatlist.map(user =>{
            console.log(user);
            return(
                <div key={user.user_id} user={user} onClick={(event)=> {this.handleChangeUser(event,user)}}>
                    {user.user_id===this.state.current_id?
                    <p style={{fontSize:"17px" , margin: "7px 25px" , color: "green"}}> {user.user_name} </p>:
                    <p style={{fontSize:"17px" , margin: "7px 25px"}}> {user.user_name} </p>
                    }
                    
                    <hr style={{backgroundColor: "green"}} />
                </div>
            )
        })
    }
    render() {
        return (
            <div class="row">
                <div class="col-lg-3 card" style={{marginTop: "66px" , height: "510px" , overflowY: "scroll"}}>
                  {this.state.chatlist.length>0?
                  
                    this.fetch_user() : null
                  }
                </div>
                <div class="col-lg-9" style={{marginTop: "60px"}}>
                   {(this.state.current_id==="")? 
                   <div class="container mx-auto">
                       <div class="center" style={{margin: "30px"}}>
                        <img src={bg} />
                        <br />
                          <Link to="/list">
                          <button>
                           <p style={{margin: "10px"}}>  Start a Chat </p> 
                          </button>
                          </Link>
                        </div>
                    </div>
                    :
                    <div>
                        <div  style={{ margin:"20px 0px 20px 20px"}}> {this.state.current_user} </div>
                        <div class=" card" style={{  height: "380px" , overflowY: "scroll"}}>
                       
                        {this.state.chats.map(arr=> (
                            <div>
                                {(arr.sender_id===this.props.auth.user.id && arr.receiver_id===this.state.current_id)?
                                <div class="card" style={{ width: "40%" , marginLeft: "60%" , color: "black" ,opacity: "0.5"}}>
                                    <p style={{marginLeft: "10px"}}> {arr.sender}</p>
                                    <p style={{marginLeft: "20px"}}> {arr.msg} </p>    
                                </div>: null
                                }
                                {(arr.receiver_id===this.props.auth.user.id && arr.sender_id===this.state.current_id)?
                                <div class="card"  style={{backgroundColor:"green" , color: "white" , width: "40%", opacity: "0.5"}}>
                                    <p style={{marginLeft: "10px"}}> {arr.sender}</p>
                                    <p style={{marginLeft: "20px"}}> {arr.msg} </p>    
                                </div>: null
                                }
                            </div>
                        ))}
                         </div>
                        <div>
                        <form  onSubmit={this.onMessageSubmit} >
                            <input
                                onChange={this.onChange}
                                value={this.state.msg}
                                id="msg"
                                type="text"
                                autofocus="true"
                                placeholder="type message"
                            />
                        </form>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

homepage.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(homepage);