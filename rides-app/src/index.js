import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import './index.css';
import App from './containers/App';

import 'antd-mobile/dist/antd-mobile.less';
//import './antd-mobile.css';

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  (Map.prototype).toJSON = function () {
    return JSON.parse(JSON.stringify([...this]));
  };
}
