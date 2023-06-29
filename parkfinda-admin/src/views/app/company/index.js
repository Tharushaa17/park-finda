import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const List = React.lazy(() => import(/* webpackChunkName: "list" */ './list'));
const Add = React.lazy(() =>
	import(/* webpackChunkName: "addcompany" */ './addcompany')
);
const Edit = React.lazy(() =>
	import(/* webpackChunkName: "addcompany" */ './editcompany')
);
const View = React.lazy(() =>
	import(/* webpackChunkName: "addcompany" */ './company-view')
);
const Company = ({ match }) => (
	<Suspense fallback={<div className='loading' />}>
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route
				path={`${match.url}/list`}
				render={(props) => <List {...props} />}
			/>
			<Route
				path={`${match.url}/addcompany`}
				render={(props) => <Add {...props} />}
			/>
			<Route
				path={`${match.url}/editcompany/:id`}
				render={(props) => <Edit {...props} />}
			/>
			<Route
				path={`${match.url}/viewcompany`}
				render={(props) => <View {...props} />}
			/>
			<Redirect to='/error' />
		</Switch>
	</Suspense>
);
export default Company;
