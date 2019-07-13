import React, { Component } from 'react';
import Chart from "react-apexcharts";

class HireLeft extends Component {
    constructor(props) {
        super(props);
       
        this.state ={
            workingStatus: {
                options: {
                    colors: ['#00CECE', '#FFFF33'],
                    xaxis: {
                        categories: []
                      },
                    //   yaxis:[
                    //       {
                    //         title: {
                    //             text: "Millions"
                    //           }
                    //       }
                    //   ]
                },
                series: [
                    {
                        name: 'Hire',
                        type: 'column',
                        data: [21.1, 23, 33.1, 34, 44.1, 44.9, 56.5, 58.5]
                    },
                    {
                        name: 'Left',
                        type: 'column',
                        data: [101.1, 13, 13.1, 14, 14.1, 14.9, 16.5, 18.5]
                    },
        
                ]
              }
        }
    }
    async componentDidMount(){
        const res = await fetch('https://si-enclave.herokuapp.com/api/v1/dashboard/workstatus/' + new Date().getFullYear());
        const data = await res.json();
        console.log(data) 
        let cat = [],numHired = [],numLeft = []
        data.forEach(element => {
            cat.push(element.month)
            numHired.push(element.numHired)
            numLeft.push(element.numLeft)
        });
        this.setState({
            workingStatus: {
                options: {                   
                    xaxis: {
                        categories: cat
                      },
                      yaxis:[
                          {
                            title: {
                                text: "Millions"
                              }
                          }
                      ]
                },
                series: [
                    {
                        name: 'Hire',
                        type: 'column',
                        data: numHired
                    },
                    {
                        name: 'Left',
                        type: 'column',
                        data: numLeft
                    },
        
                ]
              }
        })        
     }

    render() {
        return (
            <div className="portlet light bordered">
                <div className="portlet-title">
                    <div className="caption">
                        <i className="icon-bar-chart font-dark hide" />
                        <span className="caption-subject font-dark bold uppercase">Hire/Left per month</span>
                    </div>
                </div>
                {/* chart here */}
                <div>
                    <Chart
                        options={this.state.workingStatus.options}
                        series={this.state.workingStatus.series}
                        type="bar"
                        width="100%"
                        height="300px"
                    />
                </div>
            </div>
        );
    }
}

export default HireLeft;