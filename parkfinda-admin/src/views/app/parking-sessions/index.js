import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const List = React.lazy(() =>
	import(/* webpackChunkName: "list" */ './parking-sessions')
);

const Bookings = ({ match }) => (
	<Suspense fallback={<div className='loading' />}>
		<Switch>
			<Redirect
				exact
				from={`${match.url}/`}
				to={`${match.url}/parking-sessions`}
			/>
			<Route
				path={`${match.url}/parking-sessions`}
				render={(props) => <List {...props} />}
			/>

			<Redirect to='/error' />
		</Switch>
	</Suspense>
);
export default Bookings;
