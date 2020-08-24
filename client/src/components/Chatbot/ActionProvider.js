import React from'react';
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
  handleENTDoctor= (name) => {
    const message = this.createChatBotMessage(
      "Fantastic, We have Following ENT Doctors Available",
      {
        widget: "SearchENT",
      }
    );

    this.updateChatbotState(message);
  };
  handleCardiacDoctor= (name) => {
    const message = this.createChatBotMessage(
      "Fantastic, We have Following Cardiac Doctors Available",
      {
        widget: "SearchCardiac",
      }
    );

    this.updateChatbotState(message);
  };
  handleNeurologistDoctor= (name) => {
    const message = this.createChatBotMessage(
      "Fantastic, We have Following Neurologist Available",
      {
        widget: "SearchNeurologist",
      }
    );

    this.updateChatbotState(message);
  };
  handleDermatologistDoctor= (name) => {
    const message = this.createChatBotMessage(
      "Fantastic, We have Following Dermatologist Available",
      {
        widget: "SearchDermatologist",
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
      `Active Cases in India State Wise` , {widget: "StateWise"}
    );
    this.updateChatbotState(message );
   
  };
  updateChatbotState(message) {
    
   this.setState(prevState => ({
    	...prevState, messages: [...prevState.messages, message]
    }))
  }
}

export default ActionProvider