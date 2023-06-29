import React, { Component } from 'react';
import { Button, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import FranchiseTable from '../../../../containers/franchises/franchiseTable';
import FranchiseSearch from '../franchiseSearch';
import FieldsInput from '../../fields/input';
import '../../finance/list/index.css';

class FranchiseList extends Component {
  render() {    
        return (
          <div>
            <div>
              <h1>Franchise List</h1>
                <Link to='/app/franchises/create' >
                  <Button type="link"  color="primary" className="float-right">Create Franchise</Button>
                </Link>
            </div>
            <hr></hr>
            <Card body className='filtercard'>
              <FranchiseSearch/>
            </Card>
            <br></br>
            <Card body>
              <FieldsInput type="text" style="search" placeholder="Search.."/><br></br>
              <FranchiseTable/>
            </Card>
          </div>
        );
    }
}

export default FranchiseList;