import React, { Component } from 'react';
import TableData from './TableData';

class MyCar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="MyCar" >
        <div className="row">
        <div className="col-md-12">
            <div className="portlet box">
              <TableData/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MyCar;