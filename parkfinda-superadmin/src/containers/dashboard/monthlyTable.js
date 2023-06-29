import React from 'react';
import ReactTable from 'react-table';
import data from "../../data/dailyData.json";

function MonthlyTable() {
  const columns = React.useMemo(
    () => [
    {
        Header: 'Country',
        columns: [
            {
            Header: '',
             accessor: 'country',
            }
        ],
    },
    {
        Header: 'Total Revenue - Commission',
        columns: [
            {
            Header: 'Today',
             accessor: 'todayone_tab1',
            },
            {
            Header: 'Month',
             accessor: 'today_tab1',
            },
            {
            Header: 'Year',
             accessor: 'year_to_date_tab1',
            },
        ],
    },
    {
        Header: 'Total Revenue – Service Fee',
        columns: [
            {
                Header: 'Today',
                 accessor: 'monthone_tab2',
            },
            {
                Header: 'Month',
                 accessor: 'year_to_date_tab2',
            },
            {
            Header: 'Year',
             accessor: 'month_tab2',
            },
        ],
    },
      {
        Header: 'Total Revenue',
        columns: [
          {
            Header: 'Today',
             accessor: 'year_to_date_tab3',
          },
          {
            Header: 'Month',
             accessor: 'month_tab3',
          },
          {
            Header: 'Year',
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

export default MonthlyTable
