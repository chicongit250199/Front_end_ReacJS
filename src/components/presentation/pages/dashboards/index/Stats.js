import React, { Component } from 'react';

class Stats extends Component {
  render() {
    return (
      <div className="Stats">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="dashboard-stat dashboard-stat-v2 blue">
              <div className="visual">
                <i className="fa fa-comments" />
              </div>
              <div className="details">
                <div className="number">
                  <span data-counter="counterup" >{this.props.engineer}</span>
                </div>
                <div className="desc"> My Car </div>
              </div>
            </div>
          </div>
        </div>
      </div>          
    );
  }
}
export default Stats;