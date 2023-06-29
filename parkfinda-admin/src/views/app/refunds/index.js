import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const List = React.lazy(() =>
	import(/* webpackChunkName: "list" */ './refunds')
);

const Bookings = ({ match }) => (
	<Suspense fallback={<div className='loading' />}>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/refunds`} />
			<Route
				path={`${match.url}/refunds`}
				render={(props) => <List {...props} />}
			/>

			<Redirect to='/error' />
		</Switch>
	</Suspense>
);
export default Bookings;
