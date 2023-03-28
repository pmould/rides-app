import React, {ReactDOM} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as CommonViewActions from '../actions/commonView';
import {Button, Modal} from 'antd';

import styled from 'styled-components';

const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

export const StyledModalDialog = styled(Modal)`
  .ant-modal-title {
    color: #333;
  }
`;


class ModalDialog extends React.Component {
  state = {
    visible: true
  }
  handleCancel = () => this.setState({visible: false});
  
  render() {
    const {children, actions, okDisabled,  onOk, okText, onCancel, type, modalDialogView: {name}, title, footer} = this.props;
    
    if (type !== name) {
      return null;
    }

    const defaultFooter = [
      <Button key='back' onClick={onCancel || actions.closeModalDialog}>Cancel</Button>,
      <Button disabled={okDisabled} key='submit' type='primary' onClick={onOk}>
        {okText || 'Submit'}
      </Button>
    ]
    return (
      <StyledModalDialog
        getContainer={() => modalRoot}
        title={title}
        visible={true}
        onOk={onOk}
        onCancel={onCancel || actions.closeModalDialog}
        footer={footer === null ? null : defaultFooter}
        >
        {children}
      </StyledModalDialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalDialogView: state.commonView.modalDialogView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...CommonViewActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalDialog);