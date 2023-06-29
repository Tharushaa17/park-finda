import React, { Component } from "react";
import { Card, CardBody, Row } from "reactstrap";
import { Wizard, Steps, Step } from "react-albus";
import { TopNavigation } from "../../../components/wizard/TopNavigation";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import AddCarPark from "./carparkforms/addcarpark";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import ParkNow from "./carparkforms/parknow";
import Monthly from "./carparkforms/monthly";
import Commissions from "./carparkforms/commissions";
import { createCarPark, getCompanyList } from "../../../redux/actions";
import { connect } from "react-redux";
import { Spinner } from "reactstrap/lib";

class AddCarParkLayout extends Component {
  state = {
    addCarPark: null,
    parkNow: {
      isParkNow: false,
      noOfSpaces: 0,
      parkings: [],
    },
    parkLater: {
      isParkNow: false,
      noOfSpaces: 0,
      parkings: [],
    },
    monthly: {
      isMonthly: false,
      monthlyTariff: "",
      spaces: 0,
    },
    commissions: {
      isComParkNow: false,
      parkNow: {
        commission: "",
        serviceFee: "",
        monthlyFee: "",
      },
      isComParkLater: false,
      parkLater: {
        commission: "",
        serviceFee: "",
      },
    },
  };

  componentDidMount() {
    this.props.getCompanyList();
  }

  topNavClick(stepItem, push) {
    push(stepItem.id);
  }

  onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  };

  onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  updateAddCarPark = (value) => {
    let data = {
      ...this.state.addCarPark,
      ...value,
    };
    this.setState({
      addCarPark: data,
    });
  };

  updateParkNow = (value) => {
    this.setState({
      parkNow: value,
    });
  };

  updateParkLater = (value) => {
    this.setState({
      parkLater: value,
    });
  };

  updateMonthly = (value) => {
    this.setState({
      monthly: value,
    });
  };

  updateCommissions = (value) => {
    this.setState({
      commissions: value,
    });
  };

  saveCarPark = () => {
    this.props.createCarPark(this.state);
    this.props.history.push("/app/carparks/parklist");
  };

  render() {
    if (this.props.loading) {
      return (
        <Spinner color="primary" style={{ width: "3rem", height: "3rem" }} />
      );
    }
    return (
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.addcarpark" match={this.props.match} />
          <Separator className="mb-5" />
        </Colxx>
        <Colxx xxs="12" xl="12" className="mb-5">
          <Card>
            <CardBody className="wizard wizard-default">
              <Wizard>
                <TopNavigation
                  className="justify-content-between"
                  disableNav={true}
                  topNavClick={this.topNavClick}
                />
                <Steps>
                  <Step
                    id="step1"
                    name={"Add Car Park"}
                    desc={"New Car Park Details"}
                    render={({ next, previous, step, steps }) => {
                      return (
                        <div className="wizard-basic-step">
                          <AddCarPark
                            {...this.props}
                            data={this.state.addCarPark}
                            update={this.updateAddCarPark}
                            companies={this.props.companyList}
                            save={this.saveCarPark}
                            next={next}
                            previous={previous}
                            step={step}
                            steps={steps}
                          />
                        </div>
                      );
                    }}
                  />
                  <Step
                    id="step2"
                    name={"Park Now"}
                    desc={"Parking Now Schedule"}
                    render={({ next, previous, step, steps }) => {
                      return (
                        <div className="wizard-basic-step">
                          <ParkNow
                            {...this.props}
                            next={next}
                            previous={previous}
                            step={step}
                            steps={steps}
                            data={this.state.parkNow}
                            update={this.updateParkNow}
                            save={this.saveCarPark}
                          />
                        </div>
                      );
                    }}
                  />
                  <Step
                    id="step3"
                    name={"Park Later"}
                    desc={"Parking Later Schedule"}
                    render={({ next, previous, step, steps }) => {
                      return (
                        <div className="wizard-basic-step">
                          <ParkNow
                            {...this.props}
                            data={this.state.parkLater}
                            update={this.updateParkLater}
                            save={this.saveCarPark}
                            type="PARKLATER"
                            next={next}
                            previous={previous}
                            step={step}
                            steps={steps}
                          />
                        </div>
                      );
                    }}
                  />
                  <Step
                    id="step4"
                    name={"Monthly"}
                    desc={"Monthly Parking Schedule"}
                    render={({ next, previous, step, steps }) => {
                      return (
                        <div className="wizard-basic-step">
                          <Monthly
                            {...this.props}
                            data={this.state.monthly}
                            update={this.updateMonthly}
                            save={this.saveCarPark}
                            next={next}
                            previous={previous}
                            step={step}
                            steps={steps}
                          />
                        </div>
                      );
                    }}
                  />
                  <Step
                    id="step5"
                    name={"Commissions"}
                    desc={"Commissions charged for parking"}
                    render={({ next, previous, step, steps }) => {
                      return (
                        <div className="wizard-basic-step">
                          <Commissions
                            {...this.props}
                            data={this.state.commissions}
                            update={this.updateCommissions}
                            save={this.saveCarPark}
                            next={next}
                            previous={previous}
                            step={step}
                            steps={steps}
                          />
                        </div>
                      );
                    }}
                  />
                </Steps>
              </Wizard>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.carPark.loading,
    companyList: state.company.companyList,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    createCarPark: (payload) => dispatch(createCarPark(payload)),
    getCompanyList: () => dispatch(getCompanyList()),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AddCarParkLayout);
