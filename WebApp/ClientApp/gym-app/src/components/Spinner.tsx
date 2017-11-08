import * as React from 'react';

const logo = require('../giphy.gif');

export class SpinnerBasic extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <p className="default-text">Getting things ready</p>
        <br/>
        <img src={logo} className="loading-gif" alt="logo" />
      </div>
    );
  }
}