import React, { Component, PropTypes } from 'react';
import VirtualList from 'react-virtual-list';




const TrainersList = (MyList,itemsList) => {
  let MyVirtualList = VirtualList()(MyList);

  return class MyConfigurableList extends Component {
    constructor() {
      super();

      const defaultItemCount = 3;

      const items = itemsList;
      
      const state = {
        itemHeight: 85,
        itemCount: defaultItemCount,
        items: items,
        contained: true,
        containerHeight: 400,
        itemBuffer: 0,
      };
      
      this.state = state;
    };

    addTrainer = () => {
      const items = [];
      items[0]={id:99,name:this.refs.newTrainerName.value , position:this.refs.newTrainerPosition.value};
      for (var i = 1; i <= this.state.items.length ; i++) {
        items[i] = this.state.items[i-1];
      }
      
      const state = {
        items: items,
      };
      this.setState(state);
    };

    render() {
      return (
        <div>
          <div className="row">

            <div className="col-xs-6" id="container" ref="container" style={this.state.contained ? { overflow: 'scroll', height: this.state.containerHeight } : {}}>

              <MyVirtualList
                items={this.state.items}
                itemBuffer={this.state.itemBuffer}
                itemHeight={this.state.itemHeight}/>
                </div>
              <div className="col-xs-1">
              </div>
            

            <div className="col-xs-5" id="container" >
            <div className="form-group">
              <h3>Add a new trainer </h3>
            </div>
            <div className="form-group">
              <input  className="form-control" type="text" placeholder="Trainer Name" id="newTrainerName" ref="newTrainerName"  />
            </div>
            <div className="form-group">
              <input  className="form-control" type="text" placeholder="Trainer Description" id="newTrainerPosition" ref="newTrainerPosition" />  
            </div>
            <div className="form-group">
              <input type="button" name="add_trainer" value="Add Trainer" onClick={this.addTrainer} />
            </div>
          </div>
          </div>
        </div>
      );
    };
  };
};

export default TrainersList;