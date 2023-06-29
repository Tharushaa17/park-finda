import React, { Component, Fragment } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../navs/Breadcrumb';
import Sortable from 'react-sortablejs';

export default class ViewCompany extends Component {
	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Card className='mb-4'>
							<CardBody>
								<Sortable tag='ul' className='list-unstyled'>
									<li>
										<p>Company Name : Company Name One</p>
									</li>
									<li>
										<p>Short Name : CNO</p>
									</li>
									<li>
										<p>Address Line 1 : address-1</p>
									</li>
									<li>
										<p>Address Line 2 : address-2</p>
									</li>
									<li>
										<p>City : Colombo</p>
									</li>
									<li>
										<p>Country : Sri Lanka</p>
									</li>
									<li>
										<p>E-Mail : ex@gmail.com</p>
									</li>
									<li>
										<p>Contact Number : 0112224448</p>
									</li>
									<li>
										<p>Vat Registration : vat1</p>
									</li>
									<li>
										<p>Vat Number : 8</p>
									</li>
									<li>
										<p>Sms Alert Enable : Disable</p>
									</li>
									<li>
										<p>Email Alert Enable : Enable</p>
									</li>
									<li>
										<p>Payment Gateway : payment 3</p>
									</li>
									<li>
										<p>Commission : 20%</p>
									</li>
								</Sortable>
							</CardBody>
						</Card>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}
