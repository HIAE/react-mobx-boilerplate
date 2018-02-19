import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Header from '../Header';

@inject('userStore', 'commonStore')
@observer
export default class PrivateRoute extends React.Component {
  render() {
    const { userStore, ...restProps } = this.props;
    if (true) { //userStore.currentUser){
        return (
            <div>
                <Header {...this.props} />
                <Route {...restProps} />
            </div>
        )
    } else
        return <Redirect to="/login" />;
  }
}
