import * as React from 'react';
import './App.css';
import { MainMenu } from './components/MainMenu';
import {
  Route,
  HashRouter
} from "react-router-dom";
import { HomePage } from "./modules/HomePage";
import { TrainersPage } from './modules/TrainersPage';
import { ContactPage } from './modules/ContactPage';
import { CoursesPage } from './modules/CoursesPage';
import { SchedulePage } from './modules/SchedulePage';


class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <div className="background">
            <MainMenu/>
            <div className="App-body">
              <Route exact path="/" component={HomePage}/>
              <Route path="/trainers" component={TrainersPage}/>
              <Route path="/contact" component={ContactPage}/>
              <Route path="/courses" component={CoursesPage}/>
              <Route path="/schedule" component={SchedulePage}/>
            </div>
          </div>
          <div className="App-footer">
              <p>Powered by AwesomeTeamName</p>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
