import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Nes from 'nes/client';

// FIXME: WEBSOCKET
// Need the appropriate path and port
const client = new Nes.Client('ws://localhost:8080');

// async function connect() {
//   await client.connect();

//   // Handler will receive messages from the server, need to hook into app state to initiate call flow, etc
//   const handler = (update, flags) => {
//     console.log({update, flags});
//   };

<<<<<<< HEAD
  // the user ID here should be the same one submitted to /token
  client.subscribe('/volunteer/alex', handler);
}
=======
//   // the user ID here should be the same one submitted to /token
//   client.subscribe('/volunteer/alex', handler);
// }
>>>>>>> 9938518ba464309143a28557c494ff7646fbaaaa
// connect();
// FIXME: END WEBSOCKET

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
