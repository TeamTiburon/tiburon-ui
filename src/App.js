import React, { Component } from 'react';
import Splash from './components/page/splash';
import Register from './components/page/register';
import Dashboard from './components/page/dashboard';
import Search from './components/page/search';
import Results from './components/page/results';
import IncomingCall from './components/page/incoming-call'
import Profile from './components/page/profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/navbar'
import SendMessage from './components/page/send-message';
import OutgoingCall from './components/page/outgoing-call';
import VolunteerDashboard from './components/page/volunteer-dashboard';
import VolunteerLogin from './components/page/volunteer-login';
import LocalInformation from './components/page/resources'
;import i18n from "i18next";
import { withI18n, reactI18nextModule } from "react-i18next";
import './App.css';

import en from './locale/en.json';
import es from './locale/es.json';

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources: {
      en,
      es
    },
    lng: window.navigator.language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>

        <div>
           <Navbar/>
            <Switch>
              <Route exact path='/' render={(props) => <Splash {...props} />}/>
              <Route path='/register' render={(props) => <Register {...props} />}/>
              <Route path='/dashboard' render={(props) => <Dashboard {...props} />}/>
              <Route path='/search' render={(props) => <Search {...props} />}/>
              <Route path='/results' render={(props) => <Results {...props} />}/>
              <Route path='/sendMessage' render={(props) => <SendMessage {...props} />}/>
              <Route path='/incomingCall' render={(props) => <IncomingCall {...props} />}/>
              <Route path='/outgoingCall' render={(props) => <OutgoingCall {...props} />}/>
              <Route path='/profile/:id' render={(props) => <Profile {...props} />}/>
              <Route path='/volunteerDashboard' component={ VolunteerDashboard }/>
              <Route path='/volunteerLogin' component={ VolunteerLogin }/>
              <Route path='/localInformation' component={ LocalInformation }/>
            </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default withI18n()(App);
