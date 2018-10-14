import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Nes from 'nes/client';

export const client = new Nes.Client('ws://35.184.88.156:8080');

client.connect().then(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
    serviceWorker.register();
});

export const connection = (function() {
    let subscription;
    let history;

    const handler = (update, flags) => {
        console.log({update, flags});

        if(update.type === 'call_incoming') {
            history.push({
                pathname: '/incomingCall',
                state: {
                  roomName: update.roomName,
                  userName: update.userName
                }
            });
        }
    };

    // Subscribe and ingest React's router history so we can force view changes
    function subscribe(routerHistory, volunteer) {
        history = routerHistory;
        subscription = client.subscribe('/volunteer/' + volunteer.volunteer_id, handler);
    }

    return {
        subscribe
    };
})();
