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
import {
  carParkEdit,
} from "../../../redux/actions";
import { connect } from "react-redux";

class EditCarParkLayout extends Component {
  state = {
    addCarPark: null,
    parkNow: null,
    parkLater: null,
    monthly: null,
    commissions: null,
  };

  componentDidMount() {
    this.setState({
      ...this.props.data,
    });
  }

  topNavClick(stepItem, push) {
    push(stepItem.id);
  }

  onClickNext(goToNext, steps, step) {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  }

  onClickPrev(goToPrev, steps, step) {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  }

  updateAddCarPark = (value) => {
    this.setState({
      addCarPark: value,
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
    this.props.editCarPark({
      data: this.state,
      id: this.props.match.params.id,
    });
    this.props.history.push("/app/carparks/parklist");
  };

  isEditRestricted = (role) => {
    if (role) {
      switch (role) {
        case "operator":
        case "enforcer":
          return true;
        default:
          return false;
      }
    }
    return false;
  };

  render() {
    return (
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.editcarpark" match={this.props.match} />
          <Separator className="mb-5" />
        </Colxx>
        <Colxx xxs="12" xl="12" className="mb-5">
          <Card>
            <CardBody className="wizard wizard-default">
              <Wizard>
                <TopNavigation
                  className="justify-content-between"
                  disableNav={false}
                  topNavClick={this.topNavClick}
                />
                <Steps>
                  <Step
                    id="step1"
                    name={"Edit Car Park"}
                    desc={"Edit Car Park Details"}
                    render={({ next, previous, step, steps }) => {
                      return (
                        <div className="wizard-basic-step">
                          <AddCarPark
                            {...this.props}
                            data={this.state.addCarPark}
                            update={this.updateAddCarPark}
                            companies={this.props.companyList}
                            editRestricted={this.isEditRestricted(
                              this.props.userRole
                            )}
                            save={this.saveCarPark}
                            next={next}
                            previous={previous}
                            step={step}
                            steps={steps}
                          />
                        </div>
                      );
                    }}
                  ></Step>
                  <Step
                    id="step2"
                    name={"Park Now"}
                    desc={"Parking Now Schedule"}
                    render={({ next, previous, step, steps }) => {
                      return (
                        <div className="wizard-basic-step">
                          <ParkNow
                            {...this.props}
                            data={this.state.parkNow}
                            update={this.updateParkNow}
                            editRestricted={this.isEditRestricted(
                              this.props.userRole
                            )}
                            save={this.saveCarPark}
                            next={next}
                            previous={previous}
                            step={step}
                            steps={steps}
                          />
                        </div>
                      );
                    }}
                  ></Step>
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
                            editRestricted={this.isEditRestricted(
                              this.props.userRole
                            )}
                            save={this.saveCarPark}
                            next={next}
                            previous={previous}
                            step={step}
                            steps={steps}
                          />
                        </div>
                      );
                    }}
                  ></Step>
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
                            editRestricted={this.isEditRestricted(
                              this.props.userRole
                            )}
                            save={this.saveCarPark}
                            next={next}
                            previous={previous}
                            step={step}
                            steps={steps}
                          />
                        </div>
                      )
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
                            editRestricted={this.isEditRestricted(
                              this.props.userRole
                            )}
                            next={next}
                            previous={previous}
                            step={step}
                            steps={steps}
                          />
                        </div>
                      )
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
    companyList: state.company.companyList,
    userRole: state.authUser.role,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    editCarPark: (payload) => dispatch(carParkEdit(payload)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(EditCarParkLayout);
