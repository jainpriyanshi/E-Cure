import React ,{Component} from "react";
import axios from "axios";
import "./InitialOptions.css";

class SearchNeurologist extends Component {
    constructor (props) {
      super(props);
      this.state = { 
          statewise: []
       };
    }
    componentDidMount(){
          axios.get('/doctor/getSpecialization')
          .then(res=> this.setState({statewise: res.data.response.Neurologist}))
          .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
               {this.state.statewise>0?
               <div>
                   {this.state.statewise.map(data => (
                   <div class="card">
                        {data}
                    </div>
               ))}
               </div>
               : <div> Sorry , No doctors found </div>
                   }
            </div>
        )}
}

export default SearchNeurologist;