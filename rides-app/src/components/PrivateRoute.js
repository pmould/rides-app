import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {isAuthenticated} from '../utils/api';

class PrivateRoute extends React.Component {
  render() {
    const {location, component: Component, ...rest} = this.props;
    console.log('PrivateRoute isAuthenticated():', isAuthenticated());
    return <Route render={props => (
      isAuthenticated()
        ? <Component {...props}/>
        : (<Redirect to={{pathname: '/login', state: {from: location}}} />)
    )} {...rest}/>
  }
}

export default PrivateRoute;