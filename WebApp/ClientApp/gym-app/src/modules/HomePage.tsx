import * as React from 'react';
import './HomePage.css';
import { BackgroundSlider } from '../components/BackgroundSlider';

export class HomePage extends React.Component {
 render() {
   let text: any = [
     <div>
       <h2>Welcome to ILift!</h2>
     </div>,
     "Some motivational quote",
     "Push yourself to the limit!"
   ]
   return (
    <div className="home-page-content">
      <BackgroundSlider
        backgroundCaptions = {text}
      ></BackgroundSlider>
    </div>
   );
 }
}
