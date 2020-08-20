import React , {Component} from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
 
class map extends Component {
  constructor (props) {
    super(props);
    this.state = { 
        total: {},
        statewise: []
     };
   }
    componentDidMount(){
        axios.get('https://api.covidindiatracker.com/state_data.json')
        .then(res=> this.setState({statewise: res.data}));
        axios.get('https://api.covidindiatracker.com/total.json')
        .then(res=> this.setState({total: res.data}));
    }

  render () {

    return (
      <div class="row mx-auto">
         
         <div class="col-lg-5 container col-sm-12 col-md-12 mx-auto" style={{overflowX: "auto"}}>
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
                        {this.state.statewise.map((data) => (
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
         <div class="col-lg-5 container center mx-auto">
             <h1 style={{marginTop: "50px", fontFamily: "roboto"}} class="text-center"> COVID Tracker</h1>  
             <h2 style={{ fontFamily: "roboto"}}> India </h2> 
             <div class="card" style={{margin: "30px 50px" }} >
                    <h4 style={{ fontFamily: "roboto", marginTop:"20px" }}> Confirmed </h4>
                    <h3 style={{color: "red" , fontFamily:"roboto"}}>
                        {this.state.total.confirmed}
                    </h3>
                    <h6 style={{color: "red" , marginBottom:"20px" , fontFamily:"roboto"}}> <b>+{this.state.total.cChanges} </b>  </h6>
             </div>
             <div class="card" style={{margin: "30px 50px"}}>
             <h4 style={{ fontFamily: "roboto", marginTop:"20px" }}> Active </h4>
             <h3 style={{color: "blue" , fontFamily:"roboto"}}>
                        {this.state.total.active}
                    </h3>
                    <h6 style={{color: "blue" , marginBottom:"20px" , fontFamily:"roboto"}}> <b>+{this.state.total.aChanges} </b>  </h6>
             </div>
             <div class="card" style={{margin: "30px 50px"}}>
             <h4 style={{ fontFamily: "roboto", marginTop:"20px" }}> Recovered </h4>
             <h3 style={{color: "green" ,  fontFamily:"roboto" }}>
                        {this.state.total.recovered}
                    </h3>
                    <h6 style={{color: "green" , marginBottom:"20px" , fontFamily:"roboto"}}> <b>+{this.state.total.rChanges} </b> </h6>
             </div>
             <div class="card" style={{margin: "30px 50px"}}>
             <h4 style={{ fontFamily: "roboto", marginTop:"20px" }}> Deaths </h4>
             <h3 style={{color: "darkgrey" ,  fontFamily:"roboto"}}>
                        {this.state.total.deaths}
                    </h3>
                    <h6 style={{color: "darkgrey" , marginBottom:"20px" , fontFamily:"roboto"}}><b>+{this.state.total.dChanges} </b> </h6>
             </div>
         </div>
         
      </div>
    );
  }
}

export default map;