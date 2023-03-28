import React from 'react';
import {StyledAccountModalWrapper, AccountSteps, Title} from './styled-components';
import {Steps, Icon} from 'antd';

class AccountModalWrapper extends React.Component {
  state = {visible: true}

  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  };

  render() {
    const {children, footer, currentStep, showFooter, isLoading} = this.props;
    const {visible} = this.state;
    const Step = Steps.Step;

    return (
        <StyledAccountModalWrapper
        title={<Title>Create an Account</Title>}
        visible={visible}
        showFooter={showFooter}
        onOk={() => {}}
        onCancel={this.handleCancel}
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '12em'
        }}
        footer={footer}
      >
      <div>
      <AccountSteps size="small" current={currentStep - 1}>
        <Step title="Type" icon={(currentStep === 1 && isLoading) && <Icon type="loading"/>}/>
        <Step title="Details" icon={(currentStep === 2 && isLoading) && <Icon type="loading"/>}/>
        <Step title="Complete" icon={(currentStep === 3 && isLoading) && <Icon type="loading"/>}/>
      </AccountSteps>
      </div>
      {children}
    </StyledAccountModalWrapper>
    );
  }
}

export default AccountModalWrapper;