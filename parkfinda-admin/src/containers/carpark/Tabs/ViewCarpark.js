import React, { Component, Fragment } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../navs/Breadcrumb';
import Sortable from 'react-sortablejs';

export default class ViewCarpark extends Component {
	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Card className='mb-4'>
							<CardBody>
								<Sortable tag='ul' className='list-unstyled'>
									<li>
										<p>Company Name : My Car Park Limited</p>
									</li>
									<li>
										<p>Car Park Name : Sherwood Court Car Park</p>
									</li>
									<li>
										<p>Short Name : Sherw</p>
									</li>
									<li>
										<p>
											Address Line 1 : Sherwood Court Bryanston Place London
										</p>
									</li>
									<li>
										<p>Address Line 2 : </p>
									</li>
									<li>
										<p>City : London, UK</p>
									</li>
									<li>
										<p>Post Code : W1FT3</p>
									</li>
									<li>
										<p>Latitude : 51.524</p>
									</li>
									<li>
										<p>Longitude : -0.61983</p>
									</li>
									<li>
										<p>Person Name : Nishtaq Ahamed</p>
									</li>
									<li>
										<p>Contact Number : 0205588555</p>
									</li>
									<li>
										<p>E-Mail : ex@gmail.com</p>
									</li>
									<li>
										<p>Parking Type : type 2</p>
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
										<p>Max Height : 2.00m</p>
									</li>
									<li>
										<p>Space : 20</p>
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
