import React from "react";
import { Colxx } from "../../components/common/CustomBootstrap";
import { Input, FormGroup, Label } from "reactstrap";

export default class GlobalSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      columnSearch: "",
      searchInput: "",
      isOpenSizingLg: false,
    };
  }

  handleChange = (event) => {
    const val = event.target.value;
    this.setState({ searchInput: val }, () => this.globalSearch());
    this.props.handleSetSearchInput(val);
  };

  globalSearch = () => {
    const { searchInput, columnSearch } = this.state;
    let filteredData = this.props.data.filter((value) => {
      if (columnSearch) {
        return value[columnSearch]
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      }
      return (
        value.CustomerName.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.Email.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.MobileNum.toLowerCase().includes(searchInput.toLowerCase())
        // value.Vehicles.toLowerCase().includes(searchInput.toLowerCase())
      );
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
      <Colxx xxs="12">
        <div row>
          <Colxx sm={12}>
            <FormGroup row>
              <Colxx sm={6}>
                <Label className="mt-2">Filter By</Label>
                <select
                  onChange={(e) => {
                    e.persist();
                    this.setColumnSearch(e);
                  }}
                  value={columnSearch}
                  className="form-control"
                >
                  <option value="">All columns</option>
                  {columns.map((col) => {
                    return <option value={col.accessor}>{col.Header}</option>;
                  })}
                </select>
              </Colxx>
              <Colxx sm={6}>
                <div className="search-right-container">
                  <Input
                    className="search-right"
                    size="large"
                    name="searchInput"
                    value={this.state.searchInput || ""}
                    onChange={this.handleChange}
                    placeholder="Search"
                  />
				  <i className="simple-icon-magnifier"></i>
                </div>
              </Colxx>
            </FormGroup>
          </Colxx>
        </div>
      </Colxx>
    );
  }
}
