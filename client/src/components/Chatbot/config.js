import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import InitialOption from "./InitialOption";
import SearchDoctor from "./SearchDoctor";
import TrackCases from "./TrackCases";
const config = {
  botName: "E-Cure",
  initialMessages: [createChatBotMessage(`Hey There 🙏, Welcome to E-Cure. We are here to Help`),createChatBotMessage("Stay Home Stay Safe 😷",{widget: "InitialOptions"})],
  customStyles: {
    bot: {
      backgroundColor: "black"
    },
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
  ],
}

export default config