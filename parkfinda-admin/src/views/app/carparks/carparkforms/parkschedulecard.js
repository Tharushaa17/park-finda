import { Form } from "formik";
import React, { Component, Fragment } from "react";
import { Button, Card, CustomInput, FormGroup, Input, InputGroup, Label, InputGroupText } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import "./carparkforms.css";

class ParkScheduleCard extends Component {
  state = {
    tariffId: 0,
  };

  addTariff = () => {
    let newData = { ...this.props.data };
    const tariffId = newData.tariffs.length+1;
    newData.tariffs = [
      ...newData.tariffs,
      {
        tariffId: tariffId,
        from: 0,
        to: 0,
        timeType: "hourly",
        tariff: 0,
      },
    ];
    this.props.update(newData);
  };

  deleteTariff = (item) => {
    let newData = { ...this.props.data };
    newData.tariffs = newData.tariffs.filter((tariff) => {
      if (tariff.tariffId === item.tariffId) {
        return false;
      }
      return true;
    });
    this.props.update(newData);
  };

  handleWeek = (item, event) => {
    let newData = { ...this.props.data };
    if (item === "week") {
      newData.isWeek = event.target.checked;
      if (!newData.isWeek) {
        newData.weekDays = [];
      }
    } else {
      if (event.target.checked) {
        newData.weekDays = [...newData.weekDays, item];
      } else {
        newData.weekDays = newData.weekDays.filter((day) => {
          if (day === item) {
            return false;
          }
          return true;
        });
      }
    }
    this.props.update(newData);
  };

  handleTime = (type, event, item) => {
    let newData = { ...this.props.data };
    if (type === "time") {
      newData.isTime = event.target.checked;
    }
    if (type === "durationFromHrs") {
      if (this.validateHours(event.target.value)) {
        newData.duration.fromHrs = parseInt(event.target.value);
      }
    }
    if (type === "durationFromMin") {
      newData.duration.fromMin = parseInt(event.target.value);
    }
    if (type === "durationToHrs") {
      if (this.validateHours(event.target.value)) {
        newData.duration.toHrs = parseInt(event.target.value);
      }
    }
    if (type === "durationToMin") {
      newData.duration.toMin = parseInt(event.target.value);
    }
    if (type === "tariffFromHrs") {
      if (this.validateHours(event.target.value)) {
        newData.tariffs = this.setTariffFormValue(
          "fromHrs",
          newData,
          parseInt(event.target.value),
          item
        );
      }
    }
    if (type === "tariffFromMin") {
      newData.tariffs = this.setTariffFormValue(
        "fromMin",
        newData,
        parseInt(event.target.value),
        item
      );
    }
    if (type === "tariffToHrs") {
      if (this.validateHours(event.target.value)) {
        newData.tariffs = this.setTariffFormValue(
          "toHrs",
          newData,
          parseInt(event.target.value),
          item
        );
      }
    }
    if (type === "tariffToMin") {
      newData.tariffs = this.setTariffFormValue(
        "toMin",
        newData,
        parseInt(event.target.value),
        item
      );
    }
    if (type === "timeType") {
      newData.tariffs = this.setTariffFormValue(
        "timeType",
        newData,
        event.target.value,
        item
      );
    }
    if (type === "tariffValue") {
      newData.tariffs = this.setTariffFormValue(
        "tariff",
        newData,
        parseInt(event.target.value),
        item
      );
    }
    this.props.update(newData);
  };

  setTariffFormValue = (type, newData, value, item) => {
    return newData.tariffs.map((tariff) => {
      if (item.tariffId === tariff.tariffId) {
        tariff[type] = value;
      }
      return tariff;
    });
  };

  validateHours(value) {
    if (value > 24) {
      return false;
    }
    return true;
  }

  render() {
    const { data } = this.props;
    return (
      <Fragment>
        <Card className="mb-2 park-card" key={data.parkId}>
        {(data.tariffType === 'standard' || data.tariffType === undefined) &&
          <div className="mb-3 mcp-delete-btn d-flex justify-content-end">
            <Button
              color="danger"
              size="sm"
              onClick={() => this.props.deleteItem(data.parkId)}
              disabled={this.props.editRestricted}
            >
              <div className="glyph-icon simple-icon-trash"></div>
            </Button>
          </div>
         }
          <Form id={data.parkId} name={data.parkId}>
            <div className="mb-2 mcp-tarrif-check d-flex">
            {(data.tariffType === 'standard' || data.tariffType === undefined) && (
              <div className="w-10 p-3">
                <CustomInput
                  type="checkbox"
                  id={`week-${data.parkId}`}
                  label="Week"
                  defaultChecked={data.isWeek}
                  onClick={(event) => this.handleWeek("week", event)}
                  disabled={this.props.editRestricted}
                />
              </div>
              )}
              {data.isWeek && (
                <div className="p-3 flex-grow-1 week-days">
                  {(data.tariffType === 'standard' || data.tariffType === undefined) && (
                  <div className="d-flex justify-content-between">
                    <FormGroup>
                      <CustomInput
                        type="checkbox"
                        label="Monday"
                        id={`monday-${data.parkId}`}
                        defaultChecked={data.weekDays.includes("monday")}
                        onChange={(event) => this.handleWeek("monday", event)}
                        disabled={!data.isWeek || this.props.editRestricted}
                      />
                    </FormGroup>
                    <CustomInput
                      type="checkbox"
                      label="Tuesday"
                      id="tuesday"
                      defaultChecked={data.weekDays.includes("tuesday")}
                      onChange={(event) => this.handleWeek("tuesday", event)}
                      disabled={!data.isWeek || this.props.editRestricted}
                    />
                    <CustomInput
                      type="checkbox"
                      label="Wednesday"
                      id={`wednesday-${data.parkId}`}
                      defaultChecked={data.weekDays.includes("wednesday")}
                      onChange={(event) => this.handleWeek("wednesday", event)}
                      disabled={!data.isWeek || this.props.editRestricted}
                    />
                    <CustomInput
                      type="checkbox"
                      label="Thursday"
                      id={`thursday-${data.parkId}`}
                      defaultChecked={data.weekDays.includes("thursday")}
                      onChange={(event) => this.handleWeek("thursday", event)}
                      disabled={!data.isWeek || this.props.editRestricted}
                    />
                    <CustomInput
                      type="checkbox"
                      label="Friday"
                      id={`friday-${data.parkId}`}
                      defaultChecked={data.weekDays.includes("friday")}
                      onChange={(event) => this.handleWeek("friday", event)}
                      disabled={!data.isWeek || this.props.editRestricted}
                    />
                    <CustomInput
                      type="checkbox"
                      label="Saturday"
                      id={`saturday-${data.parkId}`}
                      defaultChecked={data.weekDays.includes("saturday")}
                      onChange={(event) => this.handleWeek("saturday", event)}
                      disabled={!data.isWeek || this.props.editRestricted}
                    />
                    <CustomInput
                      type="checkbox"
                      label="Sunday"
                      id={`sunday-${data.parkId}`}
                      defaultChecked={data.weekDays.includes("sunday")}
                      onChange={(event) => this.handleWeek("sunday", event)}
                      disabled={!data.isWeek || this.props.editRestricted}
                    />
                  </div>
                  )}
                </div>
              )}
            </div>
            <div className="mcp-tarrif-check d-flex">
              <div className="w-10 p-3">
                <CustomInput
                  id={`time-${data.parkId}`}
                  type="checkbox"
                  label="Time"
                  defaultChecked={data.isTime}
                  onChange={(event) => this.handleTime("time", event)}
                  disabled={this.props.editRestricted}
                />
              </div>
              <div className="p-3 flex-grow-1 week-days">
              {(data.tariffType === 'standard' || data.tariffType === undefined) && (

                <FormGroup row>
                  <Colxx sm={5}>
                    <FormGroup>
                      <Label>Duration From</Label>
                      <div className="row">
                        <Colxx sm={5} style={{ paddingLeft: "0", paddingRight: "0", marginLeft: "auto", marginRight: "auto"  }}>
                          <InputGroup>
                            <Input
                              id={`duration-from-${data.parkId}`}
                              className="form-control"
                              value={data.duration.fromHrs}
                              onChange={(event) =>
                                this.handleTime("durationFromHrs", event)
                              }
                              type="number"
                              min={0}
                              max={24}
                              disabled={!data.isTime || this.props.editRestricted}
                            />
                            <InputGroupText>
                              Hrs
                            </InputGroupText>
                          </InputGroup>
                        </Colxx>
                        <Colxx sm={5} style={{ paddingLeft: "0", paddingRight: "0", marginLeft: "auto", marginRight: "auto"   }}>
                          <InputGroup>
                            <Input
                              id={`duration-from-${data.parkId}`}
                              className="form-control"
                              value={data.duration.fromMin === null ? 0 : data.duration.fromMin}
                              onChange={(event) =>
                                this.handleTime("durationFromMin", event)
                              }
                              type="select"
                              min={0}
                              max={59}
                              disabled={!data.isTime || this.props.editRestricted}
                            >
                              <option value={0}>0</option>
                              <option value={15}>15</option>
                              <option value={30}>30</option>
                              <option value={45}>45</option>
                            </Input>
                            <InputGroupText>
                              Min
                            </InputGroupText>
                          </InputGroup>
                        </Colxx>
                      </div>
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={5}>
                    <FormGroup>
                      <Label>Duration To</Label>
                      <div className="row">
                        <Colxx sm={5} style={{ paddingLeft: "0", paddingRight: "0", marginLeft: "auto", marginRight: "auto"  }}>
                          <InputGroup>
                            <Input
                              id={`duration-to-${data.parkId}`}
                              className="form-control"
                              value={data.duration.toHrs}
                              onChange={(event) =>
                                this.handleTime("durationToHrs", event)
                              }
                              type="number"
                              min={0}
                              max={24}
                              disabled={!data.isTime || this.props.editRestricted}
                            />
                            <InputGroupText>
                              Hrs
                            </InputGroupText>
                          </InputGroup>
                        </Colxx>
                        <Colxx sm={5} style={{ paddingLeft: "0", paddingRight: "0", marginLeft: "auto", marginRight: "auto"  }}>
                          <InputGroup>
                            <Input
                              id={`duration-to-${data.parkId}`}
                              className="form-control"
                              value={data.duration.toMin === null ? 0 : data.duration.toMin}
                              onChange={(event) =>
                                this.handleTime("durationToMin", event)
                              }
                              type="select"
                              min={0}
                              max={59}
                              disabled={!data.isTime || this.props.editRestricted}
                            >
                              <option value={0}>0</option>
                              <option value={15}>15</option>
                              <option value={30}>30</option>
                              <option value={45}>45</option>
                            </Input>
                            <InputGroupText>
                              Min
                            </InputGroupText>
                          </InputGroup>
                        </Colxx>
                      </div>
                    </FormGroup>
                  </Colxx>
                </FormGroup>
              )}
                {data.tariffs.map((value, index) => {
                  const item = {
                    ...value
                  };
                  return (
                    <FormGroup
                      row
                      className="align-items-center custom-border"
                      key={item.tariffId}
                    >
             
                      <Colxx sm={4}>
                        <FormGroup>
                          <Label>From</Label>
                          <div className="row">
                            <Colxx sm={5} style={{ paddingLeft: "0", paddingRight: "0", marginLeft: "auto", marginRight: "auto"  }}>
                              <InputGroup>
                                <Input
                                  id={`tariff-from-${data.parkId}-${item.tariffId}`}
                                  className="form-control"
                                  type="number"
                                  value={item.fromHrs}
                                  onChange={(event) =>
                                    this.handleTime("tariffFromHrs", event, item)
                                  }
                                  disabled={!data.isTime || this.props.editRestricted}
                                />
                                <InputGroupText>
                                  Hrs
                                </InputGroupText>
                              </InputGroup>
                            </Colxx>
                            <Colxx sm={5} style={{ paddingLeft: "0", paddingRight: "0", marginLeft: "auto", marginRight: "auto"  }}>
                              <InputGroup>
                                <Input
                                  id={`tariff-from-${data.parkId}-${item.tariffId}`}
                                  className="form-control"
                                  type="select"
                                  value={item.fromMin === null ? 0 : item.fromMin}
                                  onChange={(event) =>
                                    this.handleTime("tariffFromMin", event, item)
                                  }
                                  disabled={!data.isTime || this.props.editRestricted}
                                >
                                  <option value={0}>0</option>
                                  <option value={15}>15</option>
                                  <option value={30}>30</option>
                                  <option value={45}>45</option>
                                </Input>
                                <InputGroupText>
                                  Min
                                </InputGroupText>
                              </InputGroup>
                            </Colxx>
                          </div>
                        </FormGroup>
                      </Colxx>
                      <Colxx sm={4}>
                        <FormGroup>
                          <Label>To</Label>
                          <div className="row">
                            <Colxx sm={5} style={{ paddingLeft: "0", paddingRight: "0", marginLeft: "auto", marginRight: "auto"  }}>
                              <InputGroup>
                                <Input
                                  id={`tariff-to-${data.parkId}-${item.tariffId}`}
                                  className="form-control"
                                  type="number"
                                  value={item.toHrs}
                                  onChange={(event) =>
                                    this.handleTime("tariffToHrs", event, item)
                                  }
                                  disabled={!data.isTime || this.props.editRestricted}
                                />
                                <InputGroupText>
                                  Hrs
                                </InputGroupText>
                              </InputGroup>
                            </Colxx>
                            <Colxx sm={5} style={{ paddingLeft: "0", paddingRight: "0", marginLeft: "auto", marginRight: "auto"  }}>
                              <InputGroup>
                                <Input
                                  id={`tariff-to-${data.parkId}-${item.tariffId}`}
                                  className="form-control"
                                  type="select"
                                  value={item.toMin === null ? 0 : item.toMin}
                                  onChange={(event) =>
                                    this.handleTime("tariffToMin", event, item)
                                  }
                                  disabled={!data.isTime || this.props.editRestricted}
                                >
                                  <option value={0}>0</option>
                                  <option value={15}>15</option>
                                  <option value={30}>30</option>
                                  <option value={45}>45</option>
                                </Input>
                                <InputGroupText>
                                  Min
                                </InputGroupText>
                              </InputGroup>
                            </Colxx>
                          </div>
                        </FormGroup>
                      </Colxx>
                      <Colxx sm={2}>
                        <FormGroup>
                          <Label>Time Type</Label>
                          <Input
                            id={`tariff-type-${data.parkId}-${item.tariffId}`}
                            className="form-control"
                            type="select"
                            value={item.timeType}
                            onChange={(event) =>
                              this.handleTime("timeType", event, item)
                            }
                            disabled={!data.isTime || this.props.editRestricted}
                          >
                            <option>Hrs</option>
                            <option>24Hr</option>
                            <option>Minutes</option>
                          </Input>
                        </FormGroup>
                      </Colxx>
                      <Colxx sm={2}>
                        <FormGroup>
                          <Label>Tariff</Label>
                          <Input
                            id={`tariff-value-${data.parkId}-${item.tariffId}`}
                            className="form-control"
                            type="number"
                            value={item.tariff}
                            onChange={(event) =>
                              this.handleTime("tariffValue", event, item)
                            }
                            disabled={!data.isTime || this.props.editRestricted}
                          />
                        </FormGroup>
                      </Colxx>
                      {(data.tariffType === 'standard' || data.tariffType === undefined) && (
                      <Colxx sm={2}>
                        {index === 0 ? (
                          <Button
                            className="mcp-add cus-position"
                            color="default"
                            onClick={this.addTariff}
                            disabled={!data.isTime || this.props.editRestricted}
                          >
                            Add
                          </Button>
                        ) : (
                          <Button
                            className="mcp-delete"
                            color="default"
                            onClick={() => this.deleteTariff(item)}
                            disabled={!data.isTime || this.props.editRestricted}
                          >
                            <div className="glyph-icon simple-icon-trash"></div>
                          </Button>
                        )}
                      </Colxx>
                      )}
                    </FormGroup>
                  );
                })}
              </div>
            </div>
          </Form>
        </Card>
      </Fragment>
    );
  }
}

export default ParkScheduleCard;
