import React, { Component } from 'react';
import Chatbot from 'react-chatbot-kit';
import "./InitialOptions.css";
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

export default class chatbot extends Component {
    render() {
        return (
            <div style={{marginTop: "50px"  }} class="center mx auto">
                <Chatbot 
                config={config} 
                actionProvider={ActionProvider}   
                messageParser={MessageParser} />
            </div>
        )
    }
}
