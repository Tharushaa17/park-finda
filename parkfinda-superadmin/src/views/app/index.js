import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './dashboard')
);
const Franchises = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './franchises')
);
const Finance = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './finance')
);
const Invoice = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './invoice-advice')
);
const Profile = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './profile')
);
const TeamsUser = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './teams/user')
);
const TeamsUserCreate = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './teams/create')
);
const TeamsRole = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './teams/roles')
);
const FranchiseCreate = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './franchises/create')
);
const FranchiseEdit = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './franchises/edit')
);
const FinanceEdit = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './finance/edit')
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
              <Route
                path={`${match.url}/dashboard`}
                render={props => <Dashboard {...props} />}
              />
              <Route
                path={`${match.url}/finance/edit`}
                render={props => <FinanceEdit {...props} />}
              />
              <Route
                path={`${match.url}/franchises/edit`}
                render={props => <FranchiseEdit {...props} />}
              />
              <Route
                path={`${match.url}/franchises/create`}
                render={props => <FranchiseCreate {...props} />}
              />
              <Route
                path={`${match.url}/Franchises/`}
                render={props => <Franchises {...props} />}
              />
              <Route
                path={`${match.url}/finance`}
                render={props => <Finance {...props} />}
              />
              <Route
                path={`${match.url}/invoice-advice`}
                render={props => <Invoice {...props} />}
              />
              <Route
                path={`${match.url}/profile`}
                render={props => <Profile {...props} />}
              />
              <Route
                path={`${match.url}/teams/user`}
                render={props => <TeamsUser {...props} />}
              />
              <Route
                path={`${match.url}/teams/create`}
                render={props => <TeamsUserCreate {...props} />}
              />
              <Route
                path={`${match.url}/teams/roles`}
                render={props => <TeamsRole {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
