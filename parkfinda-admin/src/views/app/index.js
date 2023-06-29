import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import AuthorizedRoute from '../../components/AuthorizedRoute';

const AdminDashboard = React.lazy(() =>
	import(/* webpackChunkName: "viwes-gogo" */ './dashboard/admin-dashboard')
);
const OperatorDashboard = React.lazy(() =>
	import(/* webpackChunkName: "viwes-gogo" */ './dashboard/operator-dashboard')
);
const CarParks = React.lazy(() =>
	import(/* webpackChunkName: "viwes-carparks" */ './carparks')
);
const Operators = React.lazy(() =>
	import(/* webpackChunkName: "viwes-operators" */ './operator')
);
const Company = React.lazy(() =>
	import(/* webpackChunkName: "viwes-company" */ './company')
);
const Customer = React.lazy(() =>
	import(/* webpackChunkName: "viwes-company" */ './customer')
);
const Booking = React.lazy(() =>
	import(/* webpackChunkName: "viwes-company" */ './parking-sessions')
);
const Refund = React.lazy(() =>
	import(/* webpackChunkName: "viwes-company" */ './refunds')
);
const Reports = React.lazy(() =>
	import(/* webpackChunkName: "viwes-company" */ './reports')
);
const Advice = React.lazy(() =>
	import(/* webpackChunkName: "viwes-company" */ './remittance-advice')
);
const SeasonCustomer = React.lazy(() =>
	import(/* webpackChunkName: "viwes-company" */ './season-customer')
);
const Enforcements = React.lazy(() =>
	import(/* webpackChunkName: "viwes-company" */ './enforcement/enforcements')
);
const SecondMenu = React.lazy(() =>
	import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
	);
	const BlankPage = React.lazy(() =>
	import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
	);
	const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
	
	class App extends Component {
		render() {
			const { match, authUser } = this.props;
			
			return (
				<AppLayout>
				<div className='dashboard-wrapper'>
					<Suspense fallback={<div className='loading' />}>
						<Switch>
							{authUser.role === "admin" &&
								<Redirect exact from={`${match.url}`} to={`${match.url}/admin-dashboard`} />}
							{authUser.role === "operator" &&
								<Redirect exact from={`${match.url}`} to={`${match.url}/operator-dashboard`} />}
							{authUser.role === "enforcer" &&
								<Redirect exact from={`${match.url}`} to={`${match.url}/parking-sessions`} />}
							<AuthorizedRoute
								path={`${match.url}/operator-dashboard`}
								roles={["operator"]}
								authUser={authUser}
								component={OperatorDashboard}
								/>
							<AuthorizedRoute
								path={`${match.url}/admin-dashboard`}
								roles={["admin"]}
								authUser={authUser}
								component={AdminDashboard}
								/>
							<AuthorizedRoute
								path={`${match.url}/company`}
								roles={["admin", "operator"]}
								authUser={authUser}
								component={Company}
							/>
							<AuthorizedRoute
								path={`${match.url}/carparks`}
								roles={["admin", "operator", "enforcer"]}
								authUser={authUser}
								component={CarParks}
							/>
							<AuthorizedRoute
								path={`${match.url}/operator`}
								roles={["admin", "operator"]}
								authUser={authUser}
								component={Operators}
								/>
							<AuthorizedRoute
								path={`${match.url}/customer`}
								roles={["admin"]}
								authUser={authUser}
								component={Customer}
							/>
							<AuthorizedRoute
								path={`${match.url}/parking-sessions`}
								roles={["admin", "operator", "enforcer"]}
								authUser={authUser}
								component={Booking}
								/>
							<AuthorizedRoute
								path={`${match.url}/refund`}
								roles={["admin", "operator"]}
								authUser={authUser}
								component={Refund}
								/>
							<AuthorizedRoute
								path={`${match.url}/reports`}
								roles={["admin", "operator"]}
								authUser={authUser}
								component={Reports}
								/>
							<AuthorizedRoute
								path={`${match.url}/remittanceadvice`}
								roles={["admin", "operator"]}
								authUser={authUser}
								component={Advice}
								/>
							<Route
								path={`${match.url}/season-customer`}
								render={(props) => <SeasonCustomer {...props} />}
								/>
							<Route
								path={`${match.url}/enforcements`}
								render={(props) => <Enforcements {...props} />}
								/>
							<Route
								path={`${match.url}/second-menu`}
								component={(props) => <SecondMenu {...props} />}
							/>
							<Route
								path={`${match.url}/blank-page`}
								component={(props) => <BlankPage {...props} />}
								/>
							<Route
								path={`${match.url}/ui`}
								component={(props) => <Ui {...props} />}
								/>
							<Redirect to='/error' />
						</Switch>
					</Suspense>
				</div>
			</AppLayout>
		);
		console.log('yes');
	}
}
const mapStateToProps = ({ menu, authUser }) => {
	const { containerClassnames } = menu;
	return { containerClassnames, authUser };
};

export default withRouter(connect(mapStateToProps, {})(App));
