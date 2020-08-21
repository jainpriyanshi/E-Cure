import axios from 'axios';
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }
  
  greet() {
    const greetingMessage = this.createChatBotMessage("Hey There 🙏, Welcome to E-Cure. We are here to Help" , {widget: "InitialOptions"})
    this.updateChatbotState(greetingMessage)
  }
  handleSearchDoctor = () => {
    const message = this.createChatBotMessage(
      "Fantastic, We have Following categories of doctors Available",
      {
        widget: "SearchDoctor",
      }
    );

    this.updateChatbotState(message);
  };
  handleTrackCases = () => {
    const message = this.createChatBotMessage(
      "Track Covid Cases in India",
      {
        widget: "TrackCases",
      }
    );

    this.updateChatbotState(message);
  };
  handleIndiaCovidCases = () => {
    const message = this.createChatBotMessage(
      `Covid Cases in India `
    );
    this.updateChatbotState(message);
    axios.get('https://api.covidindiatracker.com/total.json')
        .then(res=> {
          var message = this.createChatBotMessage(
            `Confirmed: ${res.data.confirmed}`
          );
          this.updateChatbotState(message);
          message = this.createChatBotMessage(
            `Active: ${res.data.active}`
          );
          this.updateChatbotState(message);
          message = this.createChatBotMessage(
            `Recovered: ${res.data.recovered}`
          );
          this.updateChatbotState(message);
          message = this.createChatBotMessage(
            `Deaths: ${res.data.deaths}`
          );
          this.updateChatbotState(message);
        });
  };
  handleStateCovidCases = () => {
    const message = this.createChatBotMessage(
      `Active Cases in India State Wise`
    );
    this.updateChatbotState(message);
    axios.get('https://api.covidindiatracker.com/state_data.json')
        .then(res=> {
            var arr = res.data;
            arr.map((data) => {
              var message = this.createChatBotMessage(
                `${data.state}: ${data.active}`
              );
              this.updateChatbotState(message);
            })
        }); 
  };
  updateChatbotState(message) {
    
   this.setState(prevState => ({
    	...prevState, messages: [...prevState.messages, message]
    }))
  }
}

export default ActionProvider