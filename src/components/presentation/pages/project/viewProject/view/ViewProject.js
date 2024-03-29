import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'react-tagsinput/react-tagsinput.css';
import Chart from "react-apexcharts";
import moment from 'moment';
import 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
import getData from '../../../../../container/project/GetDetailProject';
import numeral from 'numeral'
import './viewProject.css'
import TeamMember from './TeamMember';
import Preloader from '../../../../include/Preloader'
class ViewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamData: null,
      id: this.props.match.params.id,
      category: "",
      team: "",
      status: "",
      updatedAt: "",
      data: null,
      options: {
        chart: {
          height: 380,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'              
            }           
          },
          labels:{
            formatter: function (val) {
              return  numeral(val).format('0,0')
          }
          }
        },
        colors: ['#33b2df', '#546E7A'],
        dataLabels: {
          formatter: function (val) {
            return  numeral(val).format('0,0') + " VND"
        },
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: ["Earning", "Average "],
          labels: {
            style: {
              fontSize: '12px',
            },
            formatter: function (val) {
              return numeral(val).format('0,0')
            }
          }
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              fontSize: "15px",
              // fontFamily: "Chalkduster, fantasy",
              // fontWeight: "20px",
              color: "#0c5460"
            }
          }
        },
        title: {
          text: 'Earning Compare to the Average Earning',
          align: 'center',
          floating: true,
          style:{
            fontSize: "20px",
              // fontFamily: "Chalkduster, fantasy",
              // fontWeight: "20px",
              color: "#0c5460"
          }
        },
      },
      series: [{
        name: "number",
        data: []     
      }]
    };
  }
  async componentDidMount() {
    const res = await getData(this.state.id);
    this.setState({
      id: res.id,
      name: res.name,
      technology: res.technology,
      description: res.description,
      start: moment(res.start).format('DD/MM/YYYY'),
      end: moment(res.end).format('DD/MM/YYYY'),
      earning: numeral(res.earning).format('0,0'),
      earningPerMonth: numeral(res.earningPerMonth).format('0,0'),
      status: res.status,
      updatedAt: moment(res.updatedAt).format('DD/MM/YYYY'),
      team: res.team ? res.team.name : "Do not have team",
      teamId: res.team ? res.team.id : null,
      category: res.category.name,
      data: 0
    });
    if (res.team !== null) {
      const res2 = await fetch('https://si-enclave.herokuapp.com/api/v1/teams/' + res.team.id)
      let teamInf = await res2.json();
      let teamTable = teamInf.engineers.map((value, key) => {
        return (
          <TeamMember
            key={key}
            id={value.id}
            avatar={value.avatar}
            email={value.email}
            firstName={value.firstName}
            lastName={value.lastName}
            role={value.role}
            expYear={value.expYear}
          />
        )
      })
      this.setState({ teamData: teamTable })
    }
    let listProject = await fetch('https://si-enclave.herokuapp.com/api/v1/projects?limit=100000000&offset=0')
    listProject = await listProject.json()
    let totalEarning = 0
    listProject.results.forEach(element => {
      totalEarning += element.earning
    });
    let averageEarning = Math.round(totalEarning / listProject.results.length)
    let color = res.status === "done" ? "#B5CEFD" : res.status === "inProgress" ? "#B8E7F5" : "#fab1a0"
    this.setState({
      options: {
        ...this.state.options,
        chart: {
          id: "basic-bar"
        },
        colors: [color, '#546E7A'],
      },
      series: [{
        name: "number",
        data: [res.earning, averageEarning]
      }]
    })
  }
  render() {
    let root = document.documentElement;
    if (this.state.status === "done") {
      root.style.setProperty('--bg', "#b5cefd7d")
      root.style.setProperty('--border', "#ff")
      root.style.setProperty('--boxColor', "#659be0")
    }
    if (this.state.status === "pending") {
      root.style.setProperty('--bg', "#fab1a047")
      root.style.setProperty('--border', "#ff")
      root.style.setProperty('--boxColor', "#ed6b75")
    }
    if (this.state.status === "inProgress") {
      root.style.setProperty('--bg', "#b8e7f596")
      root.style.setProperty('--border', "#ff")
      root.style.setProperty('--boxColor', "#36c6d3")
    }

    let color = null
    if (this.state.status === "done") {
      color = 'label-info'
    } else if (this.state.status === "inProgress") {
      color = 'label-success'
    } else if (this.state.status === 'pending') {
      color = 'label-danger'
    }
    let team = this.state.team === "Do not have team" ? (
      <div className="portlet light bordered">
        <div className="portlet-title tabbable-line">
          <div className="caption">
            <i className=" icon-social-twitter font-dark hide" />
            <span className={"label label-sm " + color} style={{ fontSize: "15px" }}> {this.state.team} </span>
          </div>
        </div>
      </div>
    ) : (
        <div className="portlet light bordered ">
          <div className="portlet-title tabbable-line">
            <div className="caption">
              <i className=" icon-social-twitter font-dark hide" />
              <Link to={"/teams/" + this.state.teamId} className={"label label-sm " + color} style={{ fontSize: "15px" }}> {this.state.team} </Link>
            </div>
          </div>
          <div className="portlet-body-custom-color">
            <div className="tab-content">
              <div className="tab-pane active" id="tab_actions_pending">
                {this.state.teamData}
              </div>
            </div>
          </div>
        </div>
      )
    let loadData = (this.state.data !== null) ? (
      <div className="portlet box custom color">
        <div className="portlet-title">
          <div className="caption">
            {this.state.name}   </div>
        </div>
        <div className="portlet-body">
          <div className="row">
            <div className="col-lg-6 col-xs-12 col-sm-12">
              <div className="portlet light bordered">
                <div className="portlet-title tabbable-line">
                  <div className="caption">
                    <i className="icon-bubbles font-dark hide" />
                    <span className="caption-subject font-dark bold uppercase">BASIC INFORMATION</span>
                  </div>
                </div>
                <div className="portlet-body-custom-color">
                  <div className="tab-content">
                    <div className="portlet-body">
                      <div className="general-item-list">
                        <div className="item">
                          <div className="item-head">
                            <div className="item-details">
                              <span className="item-name" >Project name</span>
                            </div>
                          </div>
                          <div className="mt-comment-text"> {this.state.name}    </div>
                        </div>
                        <div className="item">
                          <div className="item-head">
                            <div className="item-details">
                              <span className="item-name">Status</span>
                            </div>
                          </div>
                          <div className="mt-comment-text">  <span className={"label label-sm " + color} style={{ fontSize: "15px" }}> {this.state.status} </span>   </div>
                        </div>
                        <div className="item">
                          <div className="item-head">
                            <div className="item-details">
                              <span className="item-name">Category</span>
                            </div>
                          </div>
                          <div className="mt-comment-text"> {this.state.category}    </div>
                        </div>
                        <div className="item">
                          <div className="item-head">
                            <div className="item-details">
                              <span className="item-name">Description</span>
                            </div>
                          </div>
                          <div className="mt-comment-text"> {this.state.description}    </div>
                        </div>
                        <div className="item">
                          <div className="item-head">
                            <div className="item-details">
                              <span className="item-name">Technology</span>
                            </div>
                          </div>
                          <div className="mt-comment-text"> {this.state.technology}    </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="portlet light bordered">
                  <div className="portlet-title tabbable-line">
                    <div className="caption">
                      <i className=" icon-social-twitter font-dark hide" />
                      <span className="caption-subject font-dark bold uppercase">finance</span>
                    </div>
                  </div>
                  <div className="portlet-bodyx">
                    <div className="tab-content">
                      <div className="table-main-pagination">
                        <div className="table-scrollable-custom">
                          <table className="table table-striped table-bordered table-advance table-hover">
                            <thead>
                              <tr>
                                <th width="50%">Earning </th>
                                <th>Earning Per Month </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th width="50%">{this.state.earningPerMonth} VND</th>
                                <th >{this.state.earning} VND</th>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="portlet light bordered">
                    <div className="portlet-title tabbable-line">
                      <div className="caption">
                        <i className="icon-bubbles font-dark hide" />
                        <span className="caption-subject font-dark bold uppercase">TIME</span>
                      </div>
                    </div>
                    <div className="portlet-bodyx">
                      <div className="tab-content">
                        <div className="table-main-pagination">
                          <div className="table-scrollable-custom">
                            <table className="table table-striped table-bordered table-advance table-hover">
                              <thead>
                                <tr>
                                  <th width="50%">Start </th>
                                  <th>End </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th width="50%">{this.state.start} </th>
                                  <th >{this.state.end} </th>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xs-12 col-sm-12">
              <div className="portlet light bordered">
                <div className="portlet-title tabbable-line">
                  <div className="caption">
                    {/* <i className=" icon-social-twitter font-dark hide" /> */}
                    {/* <span className="caption-subject font-dark bold uppercase">CHART</span> */}
                  </div>
                </div>
                <div className="portlet-bodyx">
                  <div className="tab-content">
                    <div>
                      <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="bar"
                        width="100%"
                        height="200px"
                      />
                    </div>
                  </div>
                </div>
                {team}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : <Preloader styleCustom={"unset"} />
    return (
      <div className="portlet light bordered ViewProject">
        {loadData}
      </div>
    )
  }
}
export default ViewProject;