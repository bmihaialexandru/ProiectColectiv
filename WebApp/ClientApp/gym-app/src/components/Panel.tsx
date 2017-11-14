import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export class LoginPanel extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showPanel: false
    };
  }

  public render() {
    return (
      <div style = {{display: "inline"}}>
        <Label
            style={{ display: "inline", color: "#faed26", fontSize: '20px', fontFamily: "Roboto Slab"}}
            onClick={this._onShowPanel}
        >
            Sign in
        </Label>
        <Panel
          isOpen={ this.state.showPanel }
          type={ PanelType.smallFixedFar }
          onDismiss={ this._onClosePanel }
          headerText='Sign in to your iLift account'
          closeButtonAriaLabel='Close'
          onRenderFooterContent={ this._onRenderFooterContent }
        >
        <TextField
          label='Username'
        />
        <TextField
          label='Password'
        />
        </Panel>
      </div>
    );
  }

  @autobind
  private _onClosePanel(): void {
    this.setState({ showPanel: false });
  }

  @autobind
  private _onRenderFooterContent(): JSX.Element {
    return (
      <div>
        <PrimaryButton
          onClick={ this._onClosePanel }
          style={ { 'marginRight': '8px', backgroundColor: '#faed26', color: "#222"} }
        >
          Sign in
        </PrimaryButton>
        <DefaultButton
          onClick={ this._onClosePanel }
        >
          Cancel
        </DefaultButton>
      </div>
    );
  }

  @autobind
  private _onShowPanel(): void {
    this.setState({ showPanel: true });
  }
}