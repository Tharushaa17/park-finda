import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const List = React.lazy(() =>
	import(/* webpackChunkName: "parklist" */ './parklist')
);
const Edit = React.lazy(() =>
	import(/* webpackChunkName: "editcarpark" */ './editcarpark')
);

const AddCarPark = React.lazy(() =>
	import(/* webpackChunkName: "editcarpark" */ './addcarparklayout')
);
const View = React.lazy(() =>
	import(/* webpackChunkName: "editcarpark" */ './carParkModalView')
);

const CarParks = ({ match }) => (
	<Suspense fallback={<div className='loading' />}>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/parklist`} />
			<Route
				path={`${match.url}/parklist`}
				render={(props) => <List {...props} />}
			/>
			<Route
				path={`${match.url}/addcarpark`}
				render={(props) => <AddCarPark {...props} />}
			/>
			<Route
				path={`${match.url}/view`}
				render={(props) => <List {...props} />}
			/>
			<Route
				path={`${match.url}/editcarpark/:id`}
				render={(props) => <Edit {...props} />}
			/>
			<Redirect to='/error' />
		</Switch>
	</Suspense>
);
export default CarParks;
