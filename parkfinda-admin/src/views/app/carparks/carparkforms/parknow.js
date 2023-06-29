import React, { Component, Fragment } from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";
import { Alert } from "reactstrap/lib";
import Button from "reactstrap/lib/Button";
import CardBody from "reactstrap/lib/CardBody";
import CustomInput from "reactstrap/lib/CustomInput";
import Row from "reactstrap/lib/Row";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import ParkScheduleCard from "./parkschedulecard";
import ParkScheduleCard24h from "./parkschedulecard24h";

class ParkNow extends Component {
  state = {
    isParkNow: false,
    parkingType: "standard",
    parkings: [],
    currentParkId: 0,
    prevParking: [],
  };

  componentDidMount() {
    if (
      this.props.data.parkings.length > 0 &&
      this.props.data.parkings[0].tariffType
    ) {
      this.setState({
        parkingType: this.props.data.parkings[0].tariffType,
      });
    }
  }

  handleEnableParkNow = (event) => {
    if (event.target.checked) {
      let newData = { ...this.props.data };
      newData.isParkNow = true;
      newData.parkings = this.addParkingSchedule(newData.parkings);
      this.props.update(newData);
    } else {
      this.props.update({
        isParkNow: false,
        noOfSpaces: 0,
        parkings: [],
      });
    }
  };

  updateParkings = () => {
    let newData = { ...this.props.data };
    newData.parkings = this.addParkingSchedule(newData.parkings);
    this.props.update(newData);
  };

  addParkingSchedule = (parkings) => {
    const parkId = this.props.data.parkings.length + 1;
    const newParks = [
      ...parkings,
      {
        parkId: parkId,
        isWeek: false,
        weekDays: [],
        isTime: false,
        is24h: false,
        tariffType: this.state.parkingType,
        duration: {},
        tariffs: [
          {
            tariffId: 1,
            from: 0,
            to: 0,
            timeType: "hourly",
            tariff: 0,
            is24: false,
          },
        ],
      },
    ];
    return newParks;
  };

  deleteParkingSchedule = (parkId) => {
    let newData = { ...this.props.data };
    newData.parkings = newData.parkings.filter((item) => {
      if (parkId === item.parkId) {
        return false;
      }
      return true;
    });
    this.props.update(newData);
  };

  updateParkingItem = (parking) => {
    let newData = { ...this.props.data };
    newData.parkings = newData.parkings.map((item) => {
      if (item.parkId === parking.parkId) {
        return parking;
      }
      return item;
    });
    this.props.update(newData);
  };

  handleNoOfSpaces = (event) => {
    let newData = { ...this.props.data };
    newData.noOfSpaces = event.target.value;
    this.props.update(newData);
  };

  handleTariffType(event, parkId) {
    let newData = { ...this.props.data };
    if (event.target.value !== this.state.parkingType) {
      this.setState({
        ...this.state,
        parkingType: event.target.value,
      });
      if (this.state.prevParking.length == 0) {
        this.setState({ prevParking: newData.parkings });
        newData.parkings = this.addParkingSchedule([]);
        newData.parkings[0].tariffType = event.target.value;
      } else if (this.state.prevParking[0].tariffType === event.target.value) {
        newData.parkings = this.state.prevParking;
      } else {
        newData.parkings = this.addParkingSchedule([]);
        newData.parkings[0].tariffType = event.target.value;
      }
    } else {
      this.setState({ ...this.state, parkingType: event.target.value });
      let newData = { ...this.props.data };
      let timeType = event.target.value === "standard" ? "Hrs" : "24Hrs";

      newData.parkings = newData.parkings.map((item) => {
        item.is24h = timeType === "standard" ? true : false;
        if (item.parkId === parkId) {
          item.tariffType = event.target.value;
        } else {
          item.tariffType = event.target.value;
          newData.parkings = this.addParkingSchedule(newData.parkings);
        }
        item.timeType = timeType;
        return item;
      });
    }
    this.props.update(newData);
  }

  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <Row className="mt-4">
          <Colxx sm={12}>
            <Alert color="warning">
              Note : A car park can have only one tariff option,Please select a Tariff type below.
            </Alert>
          </Colxx>
        </Row>
        <Row className="mb-4">
          <Colxx xxs="12">
            <CardBody>
              <div className="d-flex">
                <div className="d-flex flex-grow-1">
                  <CustomInput
                    id="isParkNow"
                    type="checkbox"
                    label={
                      this.props.type === "PARKLATER"
                        ? "Enable Park Later"
                        : "Enable Park Now"
                    }
                    onChange={this.handleEnableParkNow}
                    defaultChecked={data?.isParkNow}
                    disabled={this.props.editRestricted}
                  />
                  <FormGroup row className="ml-3">
                    <Label sm={5}>Number of Spaces</Label>
                    <Col sm={7}>
                      <Input
                        className="form-control"
                        type="number"
                        value={data?.noOfSpaces}
                        onChange={(event) => this.handleNoOfSpaces(event)}
                        readOnly={this.props.editRestricted}
                      />
                    </Col>
                  </FormGroup>
                </div>
              </div>

              <Row>
                <Colxx sm={2}>
                  {data?.isParkNow && (
                    <FormGroup>
                      <Label>Time Type</Label>
                      <Input
                        id={`tariff-type-${data.parkId}`}
                        className="form-control"
                        type="select"
                        value={this.state.parkingType}
                        onChange={(event) => {
                          this.handleTariffType(event, data.parkId);
                        }}
                      >
                        <option value="standard">Standard Tariff</option>
                        <option value="24h">24Hr Tariff</option>
                      </Input>
                    </FormGroup>
                  )}
                </Colxx>
              </Row>
              <Row>
                <Colxx xxs="12" className="mt-3">
                  {data?.parkings.map((park, index) => (
                    <div className="mb-2" key={index}>
                      {park.tariffType === "standard" ? (
                        <ParkScheduleCard
                          {...this.props}
                          data={{ ...park }}
                          deleteItem={this.deleteParkingSchedule}
                          update={this.updateParkingItem}
                          editRestricted={this.props.editRestricted}
                        />
                      ) : (
                        <ParkScheduleCard24h
                          {...this.props}
                          data={{ ...park }}
                          deleteItem={this.deleteParkingSchedule}
                          update={this.updateParkingItem}
                          editRestricted={this.props.editRestricted}
                        />
                      )}
                    </div>
                  ))}
                </Colxx>
              </Row>
              {this.state.parkingType === "standard" && data?.isParkNow && (
                <div className="mt-4 mb-4 d-flex justify-content-end">
                  <Button
                    color="primary"
                    onClick={this.updateParkings}
                    disabled={this.props.editRestricted}
                  >
                    Add
                  </Button>
                </div>
              )}
              <div className={"wizard-buttons justify-content-between"}>
                <Button
                  color="primary outline"
                  className={
                    "mr-1 " +
                    (this.props.steps.indexOf(this.props.step) <= 0
                      ? "disabled"
                      : "")
                  }
                  onClick={() => {
                    this.props.previous();
                  }}
                >
                  Prev
                </Button>
                {
                  <Button
                    color="primary outline"
                    className={
                      this.props.steps.indexOf(this.props.step) >=
                      this.props.steps.length - 1
                        ? "d-none"
                        : ""
                    }
                    onClick={() => {
                      this.props.next();
                    }}
                  >
                    {"Next"}
                  </Button>
                }
              </div>
              {!this.props.editRestricted && (
                <div className="mt-4 mb-4 d-flex justify-content-end">
                  <Button
                    color="primary"
                    className=""
                    onClick={this.props.save}
                  >
                    Save
                  </Button>
                </div>
              )}
            </CardBody>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default ParkNow;
