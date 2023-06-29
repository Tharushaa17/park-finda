import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import ReactTable from "react-table";
import classnames from "classnames";
import { Link } from "react-router-dom";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";

import data from "../../data/carpark-list";
import "../../assets/customstyle.css";
import ViewCarpark from "./Tabs/ViewCarpark";

const CustomTbodyComponent = (props) => (
  <div {...props} className={classnames("rt-tbody", props.className || [])}>
    <PerfectScrollbar options={{ suppressScrollX: true }}>
      {props.children}
    </PerfectScrollbar>
  </div>
);

export const ReactTableWithPaginationCard = (props) => {
  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);
  const [modalView, setModalView] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleView = () => setModalView(!modalView);
  const dataTableColumns = [
    {
      Header: "Company",
      accessor: "company",
      Cell: (props) => <p className="list-item-heading">{props.value}</p>,
    },
    {
      Header: "Name",
      accessor: "name",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: "Address",
      accessor: "address",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: "Contact Person",
      accessor: "person",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },

    {
      Header: "Contact No",
      accessor: "contact",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },

    {
      Header: "Action",
      accessor: "action",
      Cell: (props) => (
        <div>
          <Button
            color="secondary"
            className="default mb-2 my-btn"
            onClick={toggleView}
          >
            <span>&#128065;</span>
          </Button>{" "}
          <Modal
            Modal
            isOpen={modalView}
            toggle={toggleView}
            wrapClassName="modal-right"
          >
            <ModalHeader toggle={toggleView}>View Company</ModalHeader>
            <ModalBody>
              <ViewCarpark />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleView}>
                Ok
              </Button>{" "}
            </ModalFooter>
          </Modal>
          <Button color="success" className="default mb-2 my-btn">
            <span>&#43;</span>
          </Button>{" "}
          <Link to="/app/carparks/editcarpark">
            <Button color="warning" className="default mb-2 my-btn">
              <span>
                <i className="simple-icon-note" />{" "}
              </span>
            </Button>{" "}
          </Link>
          <Button
            color="danger"
            className="default mb-2 my-btn"
            onClick={toggle}
          >
            <span>&#x1F5D1;</span>
          </Button>{" "}
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
              {" "}
              <div className="delete-alert">
                Are you Sure you want to delete this carpark
              </div>
              <div className="delete-img mt-3">
                <img src="https://img.icons8.com/dotty/80/000000/delete-forever.png" />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="btn-center d-flex mcp-min-width-10x">
                <div className="mcp-cancel-btn mr-2">
                  <Button color="secondary" onClick={toggle}>
                    No
                  </Button>
                </div>{" "}
                <Button color="primary" onClick={toggle}>
                  Yes
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      ),
    },
  ];
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle></CardTitle>
        <ReactTable
          data={data}
          columns={dataTableColumns}
          defaultPageSize={5}
          showPageJump={false}
          showPageSizeOptions={false}
          PaginationComponent={DataTablePagination}
          className={"react-table-fixed-height"}
        />
      </CardBody>
    </Card>
  );
};
// export const ReactTableWithScrollableCard = (props) => {
// 	return (
// 		<Card className='mb-4'>
// 			<CardBody>
// 				<CardTitle>
// 					<IntlMessages id='table.react-scrollable' />
// 				</CardTitle>
// 				<ReactTable
// 					data={data}
// 					TbodyComponent={CustomTbodyComponent}
// 					columns={dataTableColumns}
// 					defaultPageSize={20}
// 					showPageJump={false}
// 					showPageSizeOptions={false}
// 					showPagination={false}
// 					className={'react-table-fixed-height'}
// 				/>
// 			</CardBody>
// 		</Card>
// 	);
// };
// export const ReactTableAdvancedCard = (props) => {
// 	return (
// 		<Card className='mb-4'>
// 			<CardBody>
// 				<CardTitle>
// 					<IntlMessages id='table.react-advanced' />
// 				</CardTitle>
// 				<ReactTable
// 					data={data}
// 					columns={dataTableColumns}
// 					defaultPageSize={5}
// 					filterable={true}
// 					showPageJump={true}
// 					PaginationComponent={DataTablePagination}
// 					showPageSizeOptions={true}
// 				/>
// 			</CardBody>
// 		</Card>
// 	);
// };
