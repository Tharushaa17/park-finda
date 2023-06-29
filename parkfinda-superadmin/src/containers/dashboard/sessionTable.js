import React from 'react';
import ReactTable from 'react-table';
import data from "../../data/sessionData.json";

function SessionTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        columns:[
          {
            Header: '',
            accessor: 'country',
          }
        ]
      },
      {
        Header: 'Operators',
        columns:[
          {
            Header: '',
            accessor: 'operators',
          }
        ]
      },
      {
        Header: 'Location',
        columns:[
          {
            Header: '',
            accessor: 'location',
          }
        ]
      },
      {
        Header: 'Customers',
        columns:[
          {
            Header: '',
            accessor: 'customers',
          }
        ]
      },
      {
        Header: 'Session',
        columns: [
          {
            Header: 'Today',
            accessor: 'today',
          },
          {
            Header: 'Month',
            accessor: 'month',
          },
          {
            Header: 'Year to Date',
            accessor: 'year_to_date',
          },
        ],
      },
    ],
    []
  )

  return (
      <ReactTable columns={columns} data={data}/>
  )
}

export default SessionTable
