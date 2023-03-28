import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AccountActions from '../../actions/account';
import * as NewAccountViewActions from '../../actions/newAccountView';

import '../../index.css';

import {Button} from 'antd';

import {NewAccountSteps} from '../../constants/Enums';

import AccountModalWrapper from './AccountModalWrapper';
import AccountTypeContent from './AccountType';
import AccountDetailsContent from './AccountDetails';
import AccountActivateContent from './AccountActivate';

class AccountModal extends React.Component {
  renderNewAccountContent(currentStep) {
    const {actions, account} = this.props;

    switch(currentStep){
      case NewAccountSteps.type: {
        return <AccountTypeContent {...{actions}}/>
      }
      case NewAccountSteps.details: {
        return <AccountDetailsContent {...{actions, account}}/>
      }
      case NewAccountSteps.activate: {
        return <AccountActivateContent {...{actions, account}}/>
      }
      default: return;
    }
  }
  skipHandler = () => {
    const {actions} = this.props;
    actions.skipNewAccountStep();
  }

  transitionNextStep = (currentStep) => {
    const {actions, account} = this.props;
    switch(currentStep){
      case 2: {
        return actions.saveNewAccountDetails(account);
      }
      default: return;
    }
  }

  render() {
    const {actions, newAccountView} = this.props;
    const {currentStep, isLoading} = newAccountView;

    const backButton = (currentStep !== 1) && <Button key="back" onClick={actions.transitionPrevStep}>Back</Button>;
    const skipButton = (currentStep === 2) && <Button key="skip" onClick={actions.skipNewAccountStep}>Skip</Button>;
    const nextButton = (currentStep === 2) && <Button key="next" onClick={() => this.transitionNextStep(currentStep)} type='primary' >Save &amp; Continue</Button>;

    return (
      <AccountModalWrapper
        currentStep={currentStep}
        showFooter={currentStep !== 1}
        footer={[
          backButton,
          skipButton,
          nextButton
        ]}
        {...{isLoading}}
      >
        {this.renderNewAccountContent(currentStep)}
    </AccountModalWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    newAccountView: state.newAccountView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...AccountActions,
      ...NewAccountViewActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountModal);