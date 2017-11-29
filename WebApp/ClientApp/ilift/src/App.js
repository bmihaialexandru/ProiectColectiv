import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {CoursesPage} from './pages/CoursesPage';
import {TrainersPage} from './pages/TrainersPage';
import {AboutPage} from './pages/AboutPage';
import {ContactPage} from './pages/ContactPage';
import {SchedulePage} from './pages/SchedulePage';
import {LoginPage} from './pages/LoginPage';
import {ProfilePage} from './pages/ProfilePage';
import {FeedbackPage} from './pages/FeedbackPage';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
         <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/courses' component={CoursesPage} />
            <Route exact path='/trainers' component={TrainersPage} />
            <Route exact path='/schedule' component={SchedulePage} />
            <Route exact path='/contact' component={ContactPage} />
            <Route exact path='/about' component={AboutPage} />
            <Route exact path='/profile' component={ProfilePage} />
            <Route exact path='/feedback' component={FeedbackPage} />
         </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
