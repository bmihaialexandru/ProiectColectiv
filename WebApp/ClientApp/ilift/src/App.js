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
import {CoursesPageAdmin} from './pages/CoursesPageAdmin';
import {TrainersPageAdmin} from './pages/TrainersPageAdmin';
import {SchedulePageAdmin} from './pages/SchedulePageAdmin';
import {UsersPageAdmin} from './pages/UsersPageAdmin';
import {AdminHome} from './pages/AdminHome';
import {ProfilePage} from './pages/ProfilePage';
import {FeedbackPage} from './pages/FeedbackPage';
import {FeedbackPageAdmin} from './pages/FeedbackPageAdmin';
import {RunAllTests} from "./testing/RunAllTests";
import {PackagePageAdmin} from "./pages/PackagesPageAdmin";
import {PaymentPageAdmin} from "./pages/PaymentPageAdmin";

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
            <Route exact path='/admin' component={AdminHome} />
            <Route exact path='/managecourses' component={CoursesPageAdmin}/>
            <Route exact path='/managetrainers' component={TrainersPageAdmin}/>
            <Route exact path='/manageschedules' component={SchedulePageAdmin}/>
            <Route exact path='/manageusers' component={UsersPageAdmin}/>
            <Route exact path='/managefeedback' component={FeedbackPageAdmin}/>
            <Route exact path='/profile' component={ProfilePage} />
            <Route exact path='/feedback' component={FeedbackPage} />
            <Route exact path='/managepackage' component={PackagePageAdmin} />
             <Route exact path='/managepayments' component={PaymentPageAdmin} />
             <Route exact path={'/testing'} component={RunAllTests}/>

         </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
