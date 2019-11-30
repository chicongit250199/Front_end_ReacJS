import React, { Component } from 'react';
import Stats from './Stats';
// import getTotal from '../../../../container/dashboard/GetTotal';
import ShowListCar from './showListCar';
import getCar from '../../../../container/dashboard/getCar';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:null
    }
  }
  async viewCar() {
    const res = await getCar();
    this.setState({
      data: {
        id: res.id,
        carName: res.name,
        image:res.image_url
        // team: res.team,
        // manager: res.manager
      }
    });
  }
  render() {
    if(this.state.data) {
      return (
        <div className="Care Take Care">
          <Stats car={this.state.data.name}
            // project={this.state.data.project}
            // team={this.state.data.team}
            // manager={this.state.data.manager}
          />     
          <div className="portlet light bordered">
            <div className="portlet-title">
              <div className="caption">
                <i className="icon-bar-chart font-dark hide" />
                <span className="caption-subject font-dark bold uppercase">My Car</span>
              </div>
            </div>
            <div >
              <ShowListCar />
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="loading-error">
          <div className="loading-area" style={{position:"relative"}}>
            <div className="wrap">
              <div className="loading">
                <div className="bounceball"></div>
                <div className="text">NOW LOADING</div>
              </div>
            </div>
          </div>
           <div className="portlet light bordered">
            <div className="portlet-title">
              <div className="caption">
                <i className="icon-bar-chart font-dark hide" />
                <span className="caption-subject font-dark bold uppercase">My Car</span>
              </div>
            </div>
            <div >
              <ShowListCar />
            </div>
          </div>
        </div>     
      );
    }  
  }
}
export default Index;