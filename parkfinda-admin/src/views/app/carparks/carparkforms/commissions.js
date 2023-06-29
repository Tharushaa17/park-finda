import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap/lib';
import CardBody from 'reactstrap/lib/CardBody';
import CustomInput from 'reactstrap/lib/CustomInput';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Row from 'reactstrap/lib/Row';
import { Colxx } from '../../../../components/common/CustomBootstrap';

class Commissions extends Component {

  handleParkCheckBox = (type, event) => {
    let newData = {...this.props.data}
    if (type === 'parkNow') {
      newData.isComParkNow = event.target.checked;
    }
    if (type === 'parkLater') {
      newData.isComParkLater = event.target.checked;
    }
    this.props.update(newData);
  }

  handleCommissionForm = (parkType, form, event) => {
    let newData = {...this.props.data}
    newData[parkType][form] = event.target.value;
    this.props.update(newData);
  }

  render() {
    const { data } = this.props;
    return (
      <Fragment>
        <Row className='mb-4'>
          <Colxx xxs='12'>
            <CardBody>
              <div className="d-flex justify-content-between mb-3">
                <CustomInput
                  type="checkbox"
                  label="Enable Commission Park Now"
                  defaultChecked={data?.isComParkNow}
                  onChange={(event) => this.handleParkCheckBox('parkNow', event)}
                  disabled={this.props.editRestricted}
                />
              </div>
              <FormGroup row>
                <Colxx sm={12}>
                  <p><b>Park Now</b></p>
                </Colxx>
                <Colxx sm={3}>
                  <FormGroup>
                    <Label>Commission</Label>
                    <Input 
                      className="form-control" 
                      value={data?.parkNow.commission} 
                      onChange={(event) => this.handleCommissionForm('parkNow', 'commission', event)} 
                      disabled={!data?.isComParkNow || this.props.editRestricted}/>
                  </FormGroup>
                </Colxx>
                <Colxx sm={3}>
                  <FormGroup>
                    <Label>Service Fee</Label>
                    <Input className="form-control" value={data?.parkNow.serviceFee} onChange={(event) => this.handleCommissionForm('parkNow', 'serviceFee', event)} disabled={!data?.isComParkNow || this.props.editRestricted}/>
                  </FormGroup>
                </Colxx>
                <Colxx sm={3}>
                  <FormGroup>
                    <Label>Monthly Fee</Label>
                    <Input className="form-control" value={data?.parkNow.monthlyFee} onChange={(event) => this.handleCommissionForm('parkNow', 'monthlyFee', event)} disabled={!data?.isComParkNow || this.props.editRestricted}/>
                  </FormGroup>
                </Colxx>
              </FormGroup>
              <div className="d-flex justify-content-between mb-3">
                <CustomInput
                  type="checkbox"
                  label="Enable Commission Park Later"
                  defaultChecked={data?.isComParkLater}
                  onChange={(event) => this.handleParkCheckBox('parkLater', event)}
                  disabled={this.props.editRestricted}
                />
              </div>
              <FormGroup row>
                <Colxx sm={12}>
                  <p><b>Park Later</b></p>
                </Colxx>
                <Colxx sm={3}>
                  <FormGroup>
                    <Label>Commission</Label>
                    <Input className="form-control" value={data?.parkLater.commission} onChange={(event) => this.handleCommissionForm('parkLater', 'commission', event)} disabled={!data?.isComParkLater || this.props.editRestricted}/>
                  </FormGroup>
                </Colxx>
                <Colxx sm={3}>
                  <FormGroup>
                    <Label>Service Fee</Label>
                    <Input className="form-control" value={data?.parkLater.serviceFee} onChange={(event) => this.handleCommissionForm('parkLater', 'serviceFee', event)} disabled={!data?.isComParkLater || this.props.editRestricted}/>
                  </FormGroup>
                </Colxx>
              </FormGroup>
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
                        ? "disabled"
                        : ""
                    }
                    onClick={() => {
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

export default Commissions;