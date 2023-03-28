import React from 'react';
import {Link} from 'react-router-dom';

import {Content} from './styled-components';

class NotFoundPage extends React.Component {
  render() {
    return (
			<Content style={{padding: '0 0.5em'}}>
        <h1>Page Not Found</h1>
        <p>Sorry, there is nothing to see here.</p>
        <p><Link to="home">Back to Home</Link></p>
    </Content>
    );
  }
}

export default NotFoundPage;