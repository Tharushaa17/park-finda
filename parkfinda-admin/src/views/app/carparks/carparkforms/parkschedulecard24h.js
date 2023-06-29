import { Form } from "formik";
import React, { Component, Fragment } from "react";
import Card from "reactstrap/lib/Card";
import CustomInput from "reactstrap/lib/CustomInput";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import "./carparkforms.css";

class ParkScheduleCard24h extends Component {
  state = {
    tariffId: 0,
  };

  componentDidMount() {
    let newData = { ...this.props.data };
    newData.tariffs = this.setTariffFormValue(
      "from",
      newData,
      "0",
      newData.tariffs[0]
    );
    newData.tariffs = this.setTariffFormValue(
      "to",
      newData,
      "24",
      newData.tariffs[0]
    );
  }

  handleTime = (type, event, item) => {
    let newData = { ...this.props.data };
    if (type === "time") {
      newData.is24h = event.target.checked;
      newData.tariffs.forEach((tariff) => {
        tariff.timeType = newData.is24h ? "24h" : "hourly";
      });
    }
    if (type === "tariffFromHrs") {
      if (this.validateTime(event.target.value)) {
        newData.tariffs = this.setTariffFormValue(
          "from",
          newData,
          parseInt(event.target.value),
          item
        );
      }
    }
    if (type === "tariffToHrs") {
      if (this.validateTime(event.target.value)) {
        newData.tariffs = this.setTariffFormValue(
          "to",
          newData,
          parseInt(event.target.value),
          item
        );
      }
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

  validateTime(value) {
    if (value > 24) {
      return false;
    }
    return true;
  }

  render() {
    const { data } = this.props;
    return (
      <Fragment>
        <Card className="park-card mb-2" key={data.parkId}>
          <Form id={data.parkId} name={data.parkId}>
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
              <div className="flex-grow-1 week-days p-3">
                {data.tariffs.map((value, index) => {
                  const item = {
                    ...value,
                  };
                  return (
                    <FormGroup
                      row
                      className="align-items-center"
                      key={item.tariffId}
                    >
                      <Colxx sm={3}>
                        <FormGroup>
                          <Label>From</Label>
                          <Input
                            id={`tariff-from-${data.parkId}-${item.tariffId}`}
                            className="form-control"
                            type="number"
                            value={item.fromHrs}
                            disabled
                          />
                        </FormGroup>
                      </Colxx>
                      <Colxx sm={3}>
                        <FormGroup>
                          <Label>To</Label>
                          <Input
                            id={`tariff-to-${data.parkId}-${item.tariffId}`}
                            className="form-control"
                            type="number"
                            value={item.toHrs}
                            disabled
                          />
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
                            disabled={!data.is24h || this.props.editRestricted}
                          />
                        </FormGroup>
                      </Colxx>
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

export default ParkScheduleCard24h;
