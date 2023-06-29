import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import CardBody from 'reactstrap/lib/CardBody';
import CustomInput from 'reactstrap/lib/CustomInput';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Row from 'reactstrap/lib/Row';
import { Colxx } from '../../../../components/common/CustomBootstrap';

class Monthly extends Component {

  handleMonthlyCheck = (event) => {
    this.props.update({
      ...this.props.data,
      isMonthly: event.target.checked
    });
  }

  handleMonthTariff = (event) => {
    this.props.update({
      ...this.props.data,
      monthlyTariff: event.target.value
    })
  }

  handleSpaces = (event) => {
    this.props.update({
      ...this.props.data,
      spaces: event.target.value
    })
  }

  render() {
    const {data} = this.props;
    return (
      <Fragment>
        <Row className='mb-4'>
          <Colxx xxs='12'>
            <CardBody>
              <div className="d-flex justify-content-between mb-3">
                <CustomInput
                  type="checkbox"
                  label="Enable Monthly"
                  defaultChecked={data?.isMonthly}
                  onChange={this.handleMonthlyCheck}
                  disabled={this.props.editRestricted}
                />
              </div>
              {/* <Row> */}
                {/* <Colxx xxs='12' className="mt-3"> */}
                  <FormGroup row>
                    <Colxx sm={3}>
                      <FormGroup>
                        <Label>Monthly Tariff</Label>
                        <Input className="form-control" value={data?.monthlyTariff} onChange={this.handleMonthTariff} disabled={!data?.isMonthly || this.props.editRestricted}/>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={3}>
                      <FormGroup>
                        <Label>Number of Spaces</Label>
                        <Input className="form-control" value={data?.spaces} onChange={this.handleSpaces} type="number" disabled={!data?.isMonthly || this.props.editRestricted}/>
                      </FormGroup>
                    </Colxx>
                  </FormGroup>
                {/* </Colxx> */}
              {/* </Row> */}
              <div className={"wizard-buttons justify-content-between"}>
                <Button
                  color="primary outline"
                  className={
                    "mr-1 " +
                    (this.props.steps.indexOf(this.props.step) <= 0
                      ? "disabled"
                      : "")
                  }
                  onClick={() => {this.props.previous()}}
                >
                  Prev
                </Button>
                {(
                  <Button
                    color="primary outline"
                    className={
                      this.props.steps.indexOf(this.props.step) >=
                      this.props.steps.length - 1
                        ? "d-none"
                        : ""
                    }
                    onClick={() => {
                      // this.saveCarPark();
                      this.props.next();
                    }}
                  >
                    {"Next"}
                  </Button>
                )}
              </div>
              {!this.props.editRestricted && <div className="mt-4 mb-4 d-flex justify-content-end">
                <Button color="primary" className="w-15" onClick={this.props.save}>Save</Button>
              </div>}
            </CardBody>
          </Colxx>
        </Row>
      </Fragment>
    )
  }

}

export default Monthly;