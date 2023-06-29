import React from "react";
import { Colxx } from "../../components/common/CustomBootstrap";
import { Input, FormGroup, Label, Button } from "reactstrap";

export default class GlobalSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      columnSearch: "",
      searchCode: "",
      searchLocation: "",
      dateTo: "",
      dateFrom: "",
      endDateTo: "",
      endDateFrom: "",
    };
  }
  resetValues = () => {
    this.setState(
      {
        searchCode: "",
        searchLocation: "",
        dateTo: "",
        dateFrom: "",
        endDateTo: "",
        endDateFrom: "",
      },
      () => this.globalSearch()
    );
  };
  locationChange = (event) => {
    const val = event.target.value;
    this.setState({ searchLocation: val }, () => this.globalSearch());
    this.props.handleSetSearchInput(val);
  };
  codeChange = (event) => {
    const val = event.target.value;
    this.setState({ searchCode: val }, () => this.globalSearch());
    this.props.handleSetSearchInput(val);
  };
  dateFromChange = (event) => {
    const val = event.target.value;
    this.setState({ dateFrom: val }, () => this.globalSearch());
    this.props.handleSetSearchInput(val);
  };
  dateToChange = (event) => {
    const val = event.target.value;
    this.setState({ dateTo: val }, () => this.globalSearch());
    this.props.handleSetSearchInput(val);
  };
  endDateFromChange = (event) => {
    const val = event.target.value;
    this.setState({ endDateFrom: val }, () => this.globalSearch());
    this.props.handleSetSearchInput(val);
  };
  endDateToChange = (event) => {
    const val = event.target.value;
    this.setState({ endDateTo: val }, () => this.globalSearch());
    this.props.handleSetSearchInput(val);
  };

  globalSearch = () => {
    const { searchCode } = this.state;
    const { searchLocation } = this.state;
    const { dateFrom } = this.state;
    const { dateTo } = this.state;
    const { endDateFrom } = this.state;
    const { endDateTo } = this.state;
    let filteredData = this.props.data.filter((value) => {
      let result =
        value.CarParkId.CarParkName.toLowerCase().includes(
          searchLocation.toLowerCase()
        ) || value.VRN.toLowerCase().includes(searchLocation.toLowerCase());

      if (dateFrom && dateFrom != "") {
        result = result && value.BookingStart >= dateFrom;
        if (dateTo && dateTo != "") {
          result = result && value.BookingStart <= dateTo;
        }
      }
      if (endDateFrom && endDateFrom != "") {
        result = result && value.BookingEnd >= endDateFrom;
        if (endDateTo && endDateTo != "") {
          result = result && value.BookingEnd <= endDateTo;
        }
      }
      return result;
    });

    this.props.handleSetFilteredData(filteredData);
  };

  setColumnSearch = (e) => {
    this.setState({ columnSearch: e.target.value }, () => this.globalSearch());
  };

  toggleSizingLg = () => {
    this.setState((prevState) => ({
      isOpenSizingLg: !prevState.isOpenSizingLg,
    }));
  };
  render() {
    const { columns } = this.props;
    const { columnSearch } = this.state;

    return (
      <FormGroup>
        <div className="mcp-search-container w-100">
          <FormGroup>
            <Input
              className="mcp-search"
              size="large"
              name="searchInput"
              value={this.state.searchLocation || ""}
              onChange={this.locationChange}
              placeholder="Search By Location or VRN"
            />
            <i className="simple-icon-magnifier"></i>
          </FormGroup>
        </div>

        {/* <Colxx sm={6}>
            <FormGroup>
              <Label>VRN</Label>
              <Input
                size="large"
                name="searchInput"
                value={this.state.searchCode || ""}
                onChange={this.codeChange}
                label="Search"
              />
            </FormGroup>
          </Colxx> */}

        <div className="row p-2x-left p-2x-right">
          <div className="col-lg-4">
            <Label className="bold mt-2">Start Date</Label>
            <div className="row">
              <div className="col-lg-6">
                <Label>From</Label>
                <Input
                  size="large"
                  name="searchInput"
                  type="date"
                  value={this.state.dateFrom || ""}
                  onChange={this.dateFromChange}
                  label="Search"
                />
              </div>
              <div className="col-lg-6">
                <Label>To</Label>
                <Input
                  size="large"
                  name="searchInput"
                  type="date"
                  value={this.state.dateTo || ""}
                  onChange={this.dateToChange}
                  label="Search"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <Label className="bold mt-2">End Date</Label>
            <div className="row">
              <div className="col-lg-6">
                <Label>From</Label>
                <Input
                  size="large"
                  name="searchInput"
                  type="date"
                  value={this.state.endDateFrom || ""}
                  onChange={this.endDateFromChange}
                  label="Search"
                />
              </div>
              <div className="col-lg-6">
                <Label>To</Label>
                <Input
                  size="large"
                  name="searchInput"
                  type="date"
                  value={this.state.endDateTo || ""}
                  onChange={this.endDateToChange}
                  label="Search"
                />
              </div>
            </div>
          </div>
          <div
            className="col-lg-4"
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Button
              color="light"
              onClick={() => this.resetValues()}
              style={{ display: "flex", flex: 0 }}
            >
              reset filter
            </Button>
          </div>
        </div>
      </FormGroup>
    );
  }
}
