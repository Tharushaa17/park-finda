import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const List = React.lazy(() =>
	import(/* webpackChunkName: "list" */ './customers')
);
const Add = React.lazy(() =>
	import(/* webpackChunkName: "addcompany" */ './addcustomer')
);
const Edit = React.lazy(() =>
	import(/* webpackChunkName: "addcompany" */ './editcustomer')
);
const Company = ({ match }) => (
	<Suspense fallback={<div className='loading' />}>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
			<Route
				path={`${match.url}/customers`}
				render={(props) => <List {...props} />}
			/>
			<Route
				path={`${match.url}/addcustomer`}
				render={(props) => <Add {...props} />}
			/>
			<Route
				path={`${match.url}/editcustomer/:id`}
				render={(props) => <Edit {...props} />}
			/>
			<Redirect to='/error' />
		</Switch>
	</Suspense>
);
export default Company;
