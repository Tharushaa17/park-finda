import React, { Fragment } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import Sortable from 'react-sortablejs';

export function CarParkModalView(props) {
	const { data } = props;
	return (
		<Fragment>
			<Row>
				<Colxx xxs='12'>
					<Card className='mb-4'>
						<CardBody>
							<Sortable tag='ul' className='list-unstyled'>
								<li>
									<p>Company Name : {data.CompanyId.CompanyName}</p>
								</li>
								<li>
									<p>Car Park Name : {data.CarParkName}</p>
								</li>
								<li>
									<p>
										Address Line 1 : {data.AddressLine1}
										</p>
								</li>
								<li>
									<p>Address Line 2 : {data.AddressLine2}</p>
								</li>
								<li>
									<p>City : {data.City}</p>
								</li>
								<li>
									<p>Post Code : {data.PostCode}</p>
								</li>
								<li>
									<p>Latitude : {data.Latitude}</p>
								</li>
								<li>
									<p>Longitude : {data.Longitude}</p>
								</li>
								<li>
									<p>Person Name : {data.ContactPersonName}</p>
								</li>
								<li>
									<p>Contact Number : {data.ContactNumber}</p>
								</li>
								<li>
									<p>E-Mail : {data.Email}</p>
								</li>
								<li>
									<p>Max Height : {data.MaxHeight}</p>
								</li>
								<li>
									<p>Space Description: {data.SpaceDescription}</p>
								</li>
							</Sortable>
						</CardBody>
					</Card>
				</Colxx>
			</Row>
		</Fragment>
	);
}
