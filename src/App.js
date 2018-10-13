import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/page/register';
import Dashboard from './components/page/dashboard';
import Search from './components/page/search';
import Results from './components/page/results';
// import Profile from './components/page/profile';
import IncomingCall from './components/page/incoming-call'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/navbar'
import SendMessage from './components/page/send-message';
import OutgoingCall from './components/page/outgoing-call';

class App extends Component {
  render() {
    return (
      <div>
      <Navbar/>
      <BrowserRouter>
        <div>

            <Switch>

              <Route path='/register' render={(props) => <Register {...props} />}/>
              <Route path='/dashboard' render={(props) => <Dashboard {...props} />}/>
              { <Route path='/search' render={(props) => <Search/>}/> }
              { <Route path='/results' render={(props) => <Results/>}/> }
              { <Route path='/sendMessage' render={(props) => <SendMessage/>}/> }
              {/* <Route path='/profile/:id' render={(props) => <Profile/>}/> */}
              { <Route path='/incomingCall' render={(props) => <IncomingCall/>}/> }
              { <Route path='/outgoingCall' render={(props) => <OutgoingCall/>}/> }
              {/* <Route path='/'
                render={(props) => <Dashboard active={true} />} /> */}
            </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
