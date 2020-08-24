class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase()
    
    
    if (lowerCaseMessage.includes("track") || lowerCaseMessage.includes("covid") || lowerCaseMessage.includes("cases")) {
      this.actionProvider.handleTrackCases()
    }
    else
    if (lowerCaseMessage.includes("search") || lowerCaseMessage.includes("doctor") ) {
      this.actionProvider.handleSearchDoctor()
    }
    else  {
      this.actionProvider.greet()
    }
  }
}

export default MessageParser