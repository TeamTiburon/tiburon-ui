import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/page/register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          



            <Switch>
              <Route path='/register' render={(props) => <Register/>}/>
           
              {/* <Route path='/'
                render={(props) => <Dashboard active={true} />} /> */}
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
