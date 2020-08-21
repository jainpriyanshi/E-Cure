import React , {Component} from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chatbot from '../Chatbot/Chatbot'
class map extends Component {
  
    
    render () {

    return (
      <div class="row mx-auto center container">
         <div class="col-lg-7 center row">
             <h1 style={{marginTop: "50px", fontFamily: "roboto"}} class="text-center col-lg-12"> COVID Tracker</h1>  
             <h2 style={{ fontFamily: "roboto"}} class="col-lg-12"> India </h2> 
             <div class="card col-lg-4" style={{margin: "30px 50px" }} >
                    <h4 style={{ fontFamily: "roboto", marginTop:"20px" }}> Confirmed </h4>
                    <h3 style={{color: "red" , fontFamily:"roboto"}}>
                        {this.props.state.total.confirmed}
                    </h3>
                    <h6 style={{color: "red" , marginBottom:"20px" , fontFamily:"roboto"}}> <b>+{this.props.state.total.cChanges} </b>  </h6>
             </div>
             <div class="card col-lg-4" style={{margin: "30px 50px"}}>
             <h4 style={{ fontFamily: "roboto", marginTop:"20px" }}> Active </h4>
             <h3 style={{color: "blue" , fontFamily:"roboto"}}>
                        {this.props.state.total.active}
                    </h3>
                    <h6 style={{color: "blue" , marginBottom:"20px" , fontFamily:"roboto"}}> <b>+{this.props.state.total.aChanges} </b>  </h6>
             </div>
             <div class="card col-lg-4" style={{margin: "30px 50px"}}>
             <h4 style={{ fontFamily: "roboto", marginTop:"20px" }}> Recovered </h4>
             <h3 style={{color: "green" ,  fontFamily:"roboto" }}>
                        {this.props.state.total.recovered}
                    </h3>
                    <h6 style={{color: "green" , marginBottom:"20px" , fontFamily:"roboto"}}> <b>+{this.props.state.total.rChanges} </b> </h6>
             </div>
             <div class="card col-lg-4" style={{margin: "30px 50px"}}>
             <h4 style={{ fontFamily: "roboto", marginTop:"20px" }}> Deaths </h4>
             <h3 style={{color: "darkgrey" ,  fontFamily:"roboto"}}>
                        {this.props.state.total.deaths}
                    </h3>
                    <h6 style={{color: "darkgrey" , marginBottom:"20px" , fontFamily:"roboto"}}><b>+{this.props.state.total.dChanges} </b> </h6>
             </div>
             
         </div>
         <div class="col-lg-2">
            
         </div>
         <div class="col-lg-3 ">
            <Chatbot />
         </div>
         <div class="col-lg-12" style={{overflowX: "auto" , marginTop: "20px"}}>
         <TableContainer>
            <Table style={{fontFamily: "Lato sans-serif"}}>
                <colgroup>
                    <col width="30%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                </colgroup>
                <TableHead>
                    <TableRow style={{ height: "10px"}}>
                        <TableCell style={{color: "black"}}> <b> State </b></TableCell>
                        <TableCell   style={{color: "red"}} > <b>Confirmed </b> </TableCell>
                        <TableCell style={{color: "blue"}}> <b> Existing</b> </TableCell>
                        <TableCell  style={{color: "green"}} > <b>Recovered</b> </TableCell>
                        <TableCell style={{color: "grey"}}> <b> Deaths </b> </TableCell>
                    </TableRow>
                </TableHead>
                    <TableBody>
                        {this.props.state.statewise.map((data) => (
                            <TableRow key={data.name} style={{ height: "10px"}}>
                            <TableCell  style={{color: "black" , textDecoration: "bold"}}>  {data.state} </TableCell>
                        <TableCell  style={{color: "red"}}> {data.confirmed} <br/>  <b><i> {data.cChanges>=0 ?<span>+</span>: null}{data.cChanges}</i></b></TableCell>
                            <TableCell style={{color: "blue"}} >  {data.active} <br/>  <b><i>   {data.aChanges>=0 ?<span>+</span>: null}{data.aChanges}</i></b> </TableCell>
                            <TableCell  style={{color: "green"}}>  {data.recovered}  <br/>  <b><i>  {data.rChanges>=0 ?<span>+</span>: null}{data.rChanges}</i></b> </TableCell>
                            <TableCell style={{color: "grey"}} >  {data.deaths}  <br/>  <b><i>  {data.dChanges>=0 ?<span>+</span>: null}{data.dChanges}</i></b> </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
         </div>
      </div>
    );
  }
}

export default map;