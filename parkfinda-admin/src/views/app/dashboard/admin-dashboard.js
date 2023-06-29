import React, { Component, Fragment } from "react";
import { getEnforcements } from "../../../services/enforcementsService";
import  {SmallLineChart}  from "../../../components/charts";
import { AreaChart } from "../../../components/charts";

import { areaChartData } from "../../../data/charts";

import {
	smallChartData1,
  } from "../../../data/charts";

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    records: [],
  };

  async componentDidMount() {
    const { data: enforcements } = await getEnforcements();
    this.setState({ records: enforcements });
  }

  render() {
    return (
      <Fragment>
        <div className="row border-bottom">
          <div className="col ">
            <div className="heading">Dashboard</div>
          </div>
        </div>
        <div className="row ">
          <div className="col-lg-6  mt-4">
            <div className="widget-card-dashboard">
              <div className="widget-title">
                Park Now
                <span>Total Parking Revenue</span>
              </div>
              <div className="row offset-lg-2 mt-4">
                <div className="col-md-3 col-sm-12 mt-2 text-center">
                  <div className="numeric">
                    £ 589,00<span>Today</span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 mt-2 text-center">
                  <div className="numeric">
                    £ 589,00<span>Month</span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 mt-2 text-center">
                  <div className="numeric">
                    £ 589,00<span>Year</span>
                  </div>
                </div>
              </div>
              <div className="mcp-chart-lines mt-5 text-center">
			  <div className="line-chart-mcp">
			  <SmallLineChart data={smallChartData1} />
			  </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-4">
            <div className="widget-card-dashboard">
              <div className="widget-title">
                Park Later
                <span>Total Parking Revenue</span>
              </div>
              <div className="row offset-lg-2 mt-4">
                <div className="col-md-3 col-sm-12 mt-2 text-center">
                  <div className="numeric">
                    £ 589,00<span>Today</span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 mt-2 text-center">
                  <div className="numeric">
                    £ 589,00<span>Month</span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 mt-2 text-center">
                  <div className="numeric">
                    £ 589,00<span>Year</span>
                  </div>
                </div>
              </div>
              <div className="mcp-chart-lines mt-5 text-center">
			  <div className="line-chart-mcp">
			  <SmallLineChart className="chert-size" data={smallChartData1} />
			  </div>
              </div>
		
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4  mt-3">
            <div className="widget-card-dashboard height-auto">
              <div className="widget-title">MCP Revenue</div>
              <div className="row text-center">
                <div className="col mt-2">
                  <div className="numeric">
                    £ 589,00<span>Today</span>
                  </div>
                </div>
                <div className="col mt-2 ">
                  <div className="numeric">
                    £ 589,00<span>Month</span>
                  </div>
                </div>
                <div className="col mt-2">
                  <div className="numeric">
                    £ 589,00<span>Year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col mt-3">
            <div className="widget-card-dashboard min-height-2">
              <div className="widget-title"></div>
              <div className=" text-center">
                <div className="numeric">
                  45<span>Company</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col mt-3">
            <div className="widget-card-dashboard min-height-2">
              <div className="widget-title"></div>
              <div className=" text-center">
                <div className="numeric">
                  35<span>Locations</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col mt-3">
            <div className="widget-card-dashboard min-height-2">
              <div className="widget-title"></div>
              <div className="text-center">
                <div className="numeric">
                  1245<span>Drivers</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-12 mt-3">
            <div className="widget-card-dashboard height-auto">
              <div className="widget-title">Sessions</div>
              <div className="row text-center">
                <div className="col mt-2">
                  <div className="numeric">
                    £ 589,00<span>Today</span>
                  </div>
                </div>
                <div className="col mt-2 ">
                  <div className="numeric">
                    £ 589,00<span>Month</span>
                  </div>
                </div>
                <div className="col mt-2">
                  <div className="numeric">
                    £ 589,00<span>Year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6  mt-4">
            <div className="widget-card-dashboard">
              <div className="d-flex space-between">
                <div className="widget-title d-block">
                  Locations
                  <br></br>
                  <span>All Locations Summary</span>
                </div>
                <div className="drop-down-outlined-sm">
                  <div className="mb-5 dropdown">
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="dropdown-toggle btn btn-outline-secondary"
                    >
                      This Week
                    </button>
                    <div
                      tabindex="-1"
                      role="menu"
                      aria-hidden="true"
                      className="dropdown-menu"
                    >
                      <h6 tabindex="-1" className="dropdown-header">
                        Header
                      </h6>
                      <button
                        type="button"
                        disabled=""
                        tabindex="-1"
                        className="disabled dropdown-item"
                      >
                        Action
                      </button>
                      <button
                        type="button"
                        tabindex="0"
                        role="menuitem"
                        className="dropdown-item"
                      >
                        Another Action
                      </button>
                      <div tabindex="-1" className="dropdown-divider"></div>
                      <button
                        type="button"
                        tabindex="0"
                        role="menuitem"
                        className="dropdown-item"
                      >
                        Another Action
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="list-carparks text-center mt-4">
			  <AreaChart shadow data={areaChartData} />
			  </div>
            </div>
          </div>
          <div className="col-lg-6  mt-4">
            <div className="widget-card-dashboard">
              <div className="d-flex space-between">
                <div className="widget-title d-block">
                  Status
                  <br></br>
                  <span>All Locations</span>
                </div>
                <div className="drop-down-outlined-sm">
                  <div className="mb-5 dropdown">
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="dropdown-toggle btn btn-outline-secondary"
                    >
                      Live
                    </button>
                    <div
                      tabindex="-1"
                      role="menu"
                      aria-hidden="true"
                      className="dropdown-menu"
                    >
                      <h6 tabindex="-1" className="dropdown-header">
                        Header
                      </h6>
                      <button
                        type="button"
                        disabled=""
                        tabindex="-1"
                        className="disabled dropdown-item"
                      >
                        Action
                      </button>
                      <button
                        type="button"
                        tabindex="0"
                        role="menuitem"
                        className="dropdown-item"
                      >
                        Another Action
                      </button>
                      <div tabindex="-1" className="dropdown-divider"></div>
                      <button
                        type="button"
                        tabindex="0"
                        role="menuitem"
                        className="dropdown-item"
                      >
                        Another Action
                      </button>
                    </div>
                  </div>
                </div>
              </div>
			  <div className="list-carparks text-center mt-4">
				  </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
