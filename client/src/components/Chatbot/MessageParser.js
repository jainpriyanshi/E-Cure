class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase()
    
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hey")) {
      this.actionProvider.greet()
    }
    if (lowerCaseMessage.includes("track") || lowerCaseMessage.includes("covid") || lowerCaseMessage.includes("cases")) {
      this.actionProvider.handleTrackCases()
    }
    if (lowerCaseMessage.includes("search") || lowerCaseMessage.includes("doctor") ) {
      this.actionProvider.handleSearchDoctor()
    }
  }
}

export default MessageParser