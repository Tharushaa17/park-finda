import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const List = React.lazy(() =>
	import(/* webpackChunkName: "addoperator" */ './operators')
);
const Add = React.lazy(() =>
	import(/* webpackChunkName: "addoperator" */ './addoperator')
);
const Edit = React.lazy(() =>
	import(/* webpackChunkName: "addcompany" */ './editOperator')
);
const CarParks = ({ match }) => (
	<Suspense fallback={<div className='loading' />}>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/operators`} />
			<Route
				path={`${match.url}/operators`}
				render={(props) => <List {...props} />}
			/>
			<Route
				path={`${match.url}/addoperator`}
				render={(props) => <Add {...props} />}
			/>
			<Route
				path={`${match.url}/editoperator/:id`}
				render={(props) => <Edit {...props} />}
			/>
			<Redirect to='/error' />
		</Switch>
	</Suspense>
);
export default CarParks;
