import React, { Component, Fragment } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../navs/Breadcrumb';
import Sortable from 'react-sortablejs';

export default class ViewOperator extends Component {
	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Card className='mb-4'>
							<CardBody>
								<Sortable tag='ul' className='list-unstyled'>
									<li>
										<p>First Name : Gihan</p>
									</li>
									<li>
										<p>Last Name : Wijemuni</p>
									</li>
									<li>
										<p>Email : wmgs@gmail.com</p>
									</li>
									<li>
										<p>Role : role</p>
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
