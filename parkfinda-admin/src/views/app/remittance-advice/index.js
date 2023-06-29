import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const List = React.lazy(() =>
	import(/* webpackChunkName: "list" */ './advices')
);

const Advices = ({ match }) => (
	<Suspense fallback={<div className='loading' />}>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/advices`} />
			<Route
				path={`${match.url}/advices`}
				render={(props) => <List {...props} />}
			/>

			<Redirect to='/error' />
		</Switch>
	</Suspense>
);
export default Advices;
