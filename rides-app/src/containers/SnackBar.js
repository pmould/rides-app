import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as CommonViewActions from '../actions/commonView';

import {notification} from 'antd';

import {SnackBars} from '../constants/Enums';

class SnackBar extends React.Component {

  onCloseSnackBar = (onClose) => {
    const {actions} = this.props;

    actions.closeSnackBar();
    (typeof onClose === 'function') && onClose();
  }

  componentWillReceiveProps = (nextProps) => {
    const {snackBarView} = nextProps;
    const {open, type = 'success', message, description, onClose} = snackBarView;

    const {snackBarView: nextSnackBarView} = this.props;

    if (nextSnackBarView.open !== open && open) {
      notification[type]({
        message,
        description,
        onClose: this.onCloseSnackBar(onClose)
      });
    }
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    snackBarView: state.commonView.snackBarView,
    metaData: state.metaData,
    newListingView: state.newListingView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...CommonViewActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);