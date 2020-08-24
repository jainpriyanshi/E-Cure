import React ,{Component} from "react";
import axios from "axios";
import "./InitialOptions.css";

class StateWise extends Component {
    constructor (props) {
      super(props);
      this.state = { 
          statewise: []
       };
    }
    componentDidMount(){
          axios.get('https://api.covidindiatracker.com/state_data.json')
          .then(res=> this.setState({statewise: res.data}))
          .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
               {this.state.statewise.map(data => (
                   <div>
                        {data.state} : {data.active}
                    </div>
               ))}
            </div>
        )}
}

export default StateWise;