import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import InitialOption from "./InitialOption";
import SearchDoctor from "./SearchDoctor";
import TrackCases from "./TrackCases";
import StateWise from "./StateWise";
import SearchENT from "./SearchENT"
import SearchCardiac from "./SearchCardiac"
import SearchNeurologist from "./SearchNeurologist"
import SearchDermatologist from "./SearchDermatologist"

const config = {
  botName: "E-Cure",
  initialMessages: [createChatBotMessage(`Hey There 🙏, Welcome to E-Cure. We are here to Help`),createChatBotMessage("Stay Home Stay Safe 😷",{widget: "InitialOptions"})],
  customStyles: {
    backgroundColor: "black",
    botMessageBox: {
      backgroundColor: "grey",
    },
    chatButton: {
      backgroundColor: "green",
    },
    
  },
  widgets: [
    {
      widgetName: "InitialOptions",
     widgetFunc: (props) => <InitialOption {...props} />,
    },
    {
      widgetName: "SearchDoctor",
     widgetFunc: (props) => <SearchDoctor {...props} />,
    },
    {
      widgetName: "TrackCases",
     widgetFunc: (props) => <TrackCases {...props} />,
    },
    {
      widgetName: "StateWise",
     widgetFunc: (props) => <StateWise {...props} />,
    },
    {
      widgetName: "SearchENT",
     widgetFunc: (props) => <SearchENT {...props} />,
    },
    {
      widgetName: "SearchCardiac",
     widgetFunc: (props) => <SearchCardiac {...props} />,
    },
    {
      widgetName: "SearchNeurologist",
     widgetFunc: (props) => <SearchNeurologist {...props} />,
    },
    {
      widgetName: "SearchDermatologist",
     widgetFunc: (props) => <SearchDermatologist {...props} />,
    },

  ],
}

export default config