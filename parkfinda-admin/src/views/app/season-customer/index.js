import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const List = React.lazy(() =>
	import(/* webpackChunkName: "list" */ './season-customers')
);
const Add = React.lazy(() =>
	import(/* webpackChunkName: "addcompany" */ './add-seasoncustomer')
);
const Edit = React.lazy(() =>
	import(/* webpackChunkName: "addcompany" */ './edit-seasoncustomer')
);
const Company = ({ match }) => (
	<Suspense fallback={<div className='loading' />}>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
			<Route
				path={`${match.url}/season-customers`}
				render={(props) => <List {...props} />}
			/>
			<Route
				path={`${match.url}/add-season-customer`}
				render={(props) => <Add {...props} />}
			/>
			<Route
				path={`${match.url}/edit-season-customer/:id`}
				render={(props) => <Edit {...props} />}
			/>
			<Redirect to='/error' />
		</Switch>
	</Suspense>
);
export default Company;
