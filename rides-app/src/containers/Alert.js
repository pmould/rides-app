import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as CommonViewActions from '../actions/commonView';

import {Alert} from 'antd';
import styled from 'styled-components';

const StyledAlert = styled(Alert)`
  position: fixed !important;
  width: 100%;
  z-index: 99;
`;

class AppAlert extends React.Component {

  render() {
    const {alertView, actions} = this.props;
    const {message, type, description, onClose, closable, open} = alertView;
    return open
      ? <StyledAlert
          description={description}
          message={message}
          type={type}
          closable
          banner
          onClose={() => actions.closeAlert()}
      />
      : <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    alertView: state.commonView.alertView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...CommonViewActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppAlert);