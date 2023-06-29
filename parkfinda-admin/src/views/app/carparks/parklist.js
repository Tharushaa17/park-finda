import React, { Component, Fragment } from "react";
import {
  Card,
  CardBody,
  Row,
  Spinner,
} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import { carParkDelete, getCarParkList } from "../../../redux/actions";
import { connect } from "react-redux";
import ReactTable from "react-table";
import DataTablePagination from "../../../components/DatatablePagination";
import "../../../assets/customstyle.css";
import AuthorizedComponent from "../../../components/AuthorizedComponent";
import Dropdown from "../../../components/Dropdown";

class ParkList extends Component {
  state = {
    redirect: false,
    modal: false,
    modalView: false,
  };

  handleClik = () => {
    this.setState({ redirect: true });
  };

  componentDidMount() {
    this.props.getCarParks();
  }

  dataTableColumns = [
    {
      Header: "Company",
      accessor: "CompanyId.CompanyName",
      roles: ["admin"],
      Cell: (props) => <p className="list-item-heading">{props.value}</p>,
    },
    {
      Header: "Car Park Name",
      accessor: "CarParkName",
      roles: ["admin", "operator", "enforcer"],
      Cell: (props) => <p className="list-item-heading">{props.value}</p>,
    },
    // {
    //   Header: "Space Description",
    //   accessor: "SpaceDescription",
    //   roles: ["admin", "operator", "enforcer"],
    //   Cell: (props) => <p className="text-muted">{props.value}</p>,
    // },
    {
      Header: "Address",
      accessor: "AddressLine1",
      roles: ["admin", "operator", "enforcer"],
      Cell: (props) => (
        <p className="text-muted">
          {props.value}
          <br /> {props.original.AddressLine2}
        </p>
      ),
    },
    {
      Header: "City",
      accessor: "City",
      roles: ["admin", "operator", "enforcer"],
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: "Contact Number",
      accessor: "ContactNumber",
      roles: ["admin", "operator", "enforcer"],
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: "Commission Park Now",
      accessor: "Commissions.ParkNow.Commission",
      roles: ["admin", "operator", "enforcer"],
      Cell: (props) => {
        if (props.value != "" && props.value >= 0) {
          return <p className="text-muted">{props.value}%</p>;
        } else {
          return <p className="text-muted">-</p>;
        }
      },
    },
    {
      Header: "Commission Park Later",
      accessor: "Commissions.ParkLater.Commission",
      roles: ["admin", "operator", "enforcer"],
      Cell: (props) => {
        if (props.value != "" && props.value >= 0) {
          return <p className="text-muted">{props.value}%</p>;
        } else {
          return <p className="text-muted">-</p>;
        }
      },
    },
    {
      Header: "Park Now",
      accessor: "ParkNow.Parkings",
      roles: ["admin", "operator", "enforcer"],

      Cell: (props) => {
        if (props.value.length && props.value.length > 0) {
          return <p className="text-muted">Yes</p>;
        } else if (props.value.length === 0) {
          return <p className="text-muted">No</p>;
        } else {
          return <p className="text-muted">-</p>;
        }
      },
    },
    {
      Header: "Park Later",
      accessor: "ParkLater.Parkings",
      roles: ["admin", "operator", "enforcer"],
      Cell: (props) => {
        if (props.value.length && props.value.length > 0) {
          return <p className="text-muted">Yes</p>;
        } else if (props.value.length === 0) {
          return <p className="text-muted">No</p>;
        } else {
          return <p className="text-muted">-</p>;
        }
      },
    },
    {
      Header: "No of Spaces",
      accessor: "Spaces",
      roles: ["admin", "operator", "enforcer"],
      Cell: (props) => {
        if (props.value != null) {
          return <p className="text-muted">{props.value}</p>;
        } else {
          return <p className="text-muted">-</p>;
        }
      },
    },
    {
      Header: "Action",
      accessor: "_id",
      roles: ["admin", "operator", "enforcer"],
      Cell: (props) => (
        <div>
          <Dropdown
            value={props.value}
            link={"/app/carparks/editcarpark"}
            toggle={this.toggle}
            handleDelete={this.props.deleteCarPark}
            modalMessage={"Are you sure you want to delete this car park ?"}
          ></Dropdown>
        </div>
      ),
    },
  ];

  render() {
    if (this.state.redirect) {
      return <Redirect to="addcarpark" />;
    } else {
      return (
        <Fragment>
          {this.props.loading && (
            <Spinner
              style={{ width: "3rem", height: "3rem" }}
              color="primary"
            />
          )}
          {!this.props.loading && (
            <Fragment>
              <Row>
                <Colxx xxs="12">
                  <Breadcrumb
                    heading="menu.parklist"
                    match={this.props.match}
                  />
                  <Separator className="mb-5" />
                </Colxx>
              </Row>
              <Row>
                <AuthorizedComponent
                  roles={["admin"]}
                  authUser={this.props.authUser}
                  component={
                    <Colxx xxs="12" className="mb-4">
                      <p>
                        <IntlMessages id="menu.parklist" />
                        <Button
                          color="info"
                          className="default mb-2"
                          style={{ float: "right" }}
                          onClick={() => this.handleClik()}
                        >
                          <IntlMessages id="button.add-carpark" />
                        </Button>
                      </p>
                    </Colxx>
                  }
                />
                <Colxx xxs="12">
                  <Card className="mb-4">
                   
                      <ReactTable
                        data={this.props.carParks}
                        columns={this.dataTableColumns.filter(
                          (item) =>
                            item.roles &&
                            item.roles.includes(this.props.authUser.role)
                        )}
                        defaultPageSize={5}
                        showPageJump={false}
                        showPageSizeOptions={false}
                        PaginationComponent={DataTablePagination}
                        // className={'react-table-fixed-height'}
                      />
                  
                  </Card>
                </Colxx>
              </Row>
            </Fragment>
          )}
        </Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.carPark.loading,
    carParks: state.carPark.carParkList,
    authUser: state.authUser,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    getCarParks: () => dispatch(getCarParkList()),
    deleteCarPark: (payload) => dispatch(carParkDelete(payload)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ParkList);
