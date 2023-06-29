import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Transactions = React.lazy(() =>
	import(/* webpackChunkName: "list" */ './transactions')
);
const Revenue = React.lazy(() =>
	import(/* webpackChunkName: "list" */ './revenue')
);

const Reports = ({ match }) => (
	<Suspense fallback={<div className='loading' />}>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/transactions`} />
			<Route
				path={`${match.url}/transactions`}
				render={(props) => <Transactions {...props} />}
			/>
			<Route
				path={`${match.url}/revenue`}
				render={(props) => <Revenue {...props} />}
			/>

			<Redirect to='/error' />
		</Switch>
	</Suspense>
);
export default Reports;
