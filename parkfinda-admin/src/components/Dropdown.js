import React from 'react';
import {
	Dropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';

import { BrowserRouter, Link } from 'react-router-dom';

class DropdownActionMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownBasicOpen: false,
			modal: false,
		};
		this.toggle = this.toggle.bind(this);
	}
	onDelete = (e) => {
		this.props.handleDelete(e);
		this.toggle();
	};
	toggle() {
		this.setState({
			modal: !this.state.modal,
		});
	}

	toggleBasic = () => {
		this.setState((prevState) => ({
			dropdownBasicOpen: !prevState.dropdownBasicOpen,
		}));
	};

	render() {
		return (
			<Dropdown
				isOpen={this.state.dropdownBasicOpen}
				toggle={this.toggleBasic}
				className='action-wrap'
			>
				<div className='action-btn'>
					<DropdownToggle className='btn glyph-icon simple-icon-options-vertical'></DropdownToggle>
				</div>
				<DropdownMenu className='action-pop'>
					<div className='btn-block'>
						<Link to={`${this.props.link}/${this.props.value}`}>
							<DropdownItem>
								<span>
									<i className='simple-icon-note mr-2' />
									Edit
								</span>
							</DropdownItem>
						</Link>
					</div>
					<DropdownItem className='btn delete' onClick={this.toggle}>
						<span>
							{' '}
							<i className='iconsminds-delete-file mr-2' />
						</span>
						Delete
					</DropdownItem>
					<Modal
						isOpen={this.state.modal}
						toggle={this.toggle}
						backdrop={false}
					>
						<ModalHeader toggle={this.toggle}></ModalHeader>
						<ModalBody>
							<div className='delete-alert'>
								{this.props.modalMessage ? this.props.modalMessage : "Are you sure you want to delete this customer"}
							</div>
							<div className='delete-img mt-3'>
								<img src='https://img.icons8.com/dotty/80/000000/delete-forever.png' />
							</div>
						</ModalBody>
						<ModalFooter>
							<div className='btn-center d-flex mcp-min-width-10x'>
								<div className='mcp-cancel-btn mr-2'>
									<Button color='secondary' onClick={this.toggle}>
										No
									</Button>
								</div>{' '}
								<Button
									color='primary'
									onClick={(e) => this.onDelete(this.props.value)}
								>
									Yes
								</Button>
							</div>
						</ModalFooter>
					</Modal>
				</DropdownMenu>
			</Dropdown>
		);
	}
}

export default DropdownActionMenu;
