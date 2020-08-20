import React, { Component } from 'react';
import Chatbot from 'react-chatbot-kit';

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

export default class chatbot extends Component {
    render() {
        return (
            <div style={{marginTop: "150px" , marginLeft: "200px" }} class="center mx auto">
                <Chatbot config={config} actionProvider={ActionProvider}   messageParser={MessageParser} />
            </div>
        )
    }
}
