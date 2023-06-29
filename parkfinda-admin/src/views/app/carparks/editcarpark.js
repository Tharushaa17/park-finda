import React, { Component } from "react";
import { createCarPark, getCarPark, getCompanyList } from "../../../redux/actions";
import { connect } from "react-redux";
import { Spinner } from "reactstrap/lib";
import EditCarParkLayout from './editcarparklayout';

class EditCarPark extends Component {

  componentDidMount() {
		this.props.getCompanyList();
		const parkId = this.props.match.params.id;
		this.props.getCarPark(parkId);
  }

  render() {
    if (this.props.loading) {
      return (<Spinner color="primary" style={{ width: '3rem', height: '3rem' }}/>)
    }
    return (
      <EditCarParkLayout {...this.props} data={this.props.carPark}/>
    )
  }
  
}

const mapStateToProps = (state) => {
  return {
    loading: state.carPark.loading,
		companyList: state.company.companyList,
		carPark: state.carPark.editCarPark
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    createCarPark: (payload) => dispatch(createCarPark(payload)),
		getCompanyList: () => dispatch(getCompanyList()),
		getCarPark: (payload) => dispatch(getCarPark(payload))
  }
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EditCarPark);