import React from 'react';

import {AccountTypes} from '../../constants/Enums';
import {shortMonths} from '../../constants/dateOfBirth';
import {DATE_FORMAT} from '../../constants';

import range from 'lodash/range';

import moment from 'moment';

import {AccountContent, StyledInput, StyledInputMask, InputFields, DOBTitle, DateOfBirth, Day, Month, Year} from './styled-components';

import {Select} from 'antd';

class AccountDetails extends React.PureComponent {
  state = {
    day: 0,
    month: 0,
    year: 0
  };

  setDateOfBirth = (field, value) => {
    this.setState((prevState, props) => {
      const {actions} = props;

      let {day, month, year} = prevState;
      
      if (field === 'day') {
        day = value;
      }
      else if (field === 'month') {
        month = value;
      }
      else if (field === 'year') {
        year = value;
      }

      if (day && month && year) {
        const dob = moment(new Date(year, month, day)).format(DATE_FORMAT);
        actions.updateNewAccountDetailsProp('dob', dob);
      }

      return {[field]: value};
    });
  }

  renderBusinessAccount = () => {
    const {account = {}, actions} = this.props;
    const {email, telephone, address, website, businessRegistrationNumber,
      taxIndentificationNumber, inuranceProvider, inusrancePolicyNumber} = account;
    return (
      <div>
        <h4>Add business account details</h4>
        <h3> You can skip this step for now if you need more time to get details</h3>
        <AccountContent>
          <InputFields>
            <StyledInput
              placeholder='Email'
              type='email'
              value={email} onChange={(e) => actions.updateNewAccountDetailsProp('email', e.target.value)}/>
            <StyledInputMask
              placeholder='Telephone'
              type='tel'
              mask='999-999-9999'
              className='ant-input'
              value={telephone}
              onChange={(e) => actions.updateNewAccountDetailsProp('telephone', e.target.value)}/>
            <StyledInput
              placeholder='Address'
              value={address}
              onChange={(e) => actions.updateNewAccountDetailsProp('address', e.target.value)}/>
            <StyledInput
              placeholder='Website'
              type='url'
              value={website}
              onChange={(e) => actions.updateNewAccountDetailsProp('website', e.target.value)}/>
            <StyledInput
              placeholder='Business Registration Number'
              value={businessRegistrationNumber}
              onChange={(e) => actions.updateNewAccountDetailsProp('businessRegistrationNumber', e.target.value)}/>
            <StyledInput
              placeholder='Tax Identificatoin Number'
              value={taxIndentificationNumber}
              onChange={(e) => actions.updateNewAccountDetailsProp('taxIndentificationNumber', e.target.value)}/>
            <StyledInput
              placeholder='Insurance Provider'
              value={inuranceProvider}
              onChange={(e) => actions.updateNewAccountDetailsProp('inuranceProvider', e.target.value)}/>
            <StyledInput
              placeholder='Insurance Policy Number'
              value={inusrancePolicyNumber}
              onChange={(e) => actions.updateNewAccountDetailsProp('inusrancePolicyNumber', e.target.value)}/>
          </InputFields>
        </AccountContent>
      </div>

    );
  }

  renderPersonalAccount = () =>  {
    const {account = {}, actions} = this.props;
    const {email, telephone, address} = account;

    const {day, month, year} = this.state;

    const Option = Select.Option;
    
    return (
      <div>
        <h4>Add personal account details</h4>
        <h3> You can skip this step for now if you need more time to get details</h3>
        <AccountContent>
          <InputFields>
            <StyledInput
              placeholder='Email'
              type='email'
              value={email}
              onChange={(e) => actions.updateNewAccountDetailsProp('email', e.target.value)}/>
            <StyledInputMask
              placeholder='Telephone'
              type='tel'
              mask='999-999-9999'
              maskChar=" "
              className='ant-input'
              value={telephone} onChange={(e) => actions.updateNewAccountDetailsProp('telephone', e.target.value)}/>
            <StyledInput placeholder='Address' value={address}  onChange={(e) => actions.updateNewAccountDetailsProp('address', e.target.value)}/>
            <DOBTitle>Date of Birth</DOBTitle>
            <DateOfBirth>
              <Day
                onChange={day => this.setDateOfBirth('day', day)}
                defaultValue={0}
                value={day}>
                <Option value={0}>Day</Option>
                {range(1, 32).map(day => <Option value={day}>{day}</Option>)}
              </Day>
              <Month
                onChange={month => this.setDateOfBirth('month', month)}
                defaultValue={0}
                value={month}>
                <Option value={0}>Month</Option>
                {shortMonths.map((month, index) => <Option value={index}>{month}</Option>)}
              </Month>
              <Year
                onChange={year => this.setDateOfBirth('year', year)}
                defaultValue={0}
                value={year}>
                <Option value={0}>Year</Option>
                {range(1905, new Date().getFullYear() + 1).reverse().map(year => <Option value={year}>{year}</Option>)}
              </Year>
            </DateOfBirth>
          </InputFields>
        </AccountContent>
      </div>

    );
  }

  renderAccountDetails = () => {
    const {account} = this.props;
    const {accountTypeId} = account;

    if (AccountTypes.casualEarner === accountTypeId) {
      return this.renderPersonalAccount();
    }
    else {
      return this.renderBusinessAccount();
    }
  }

  render() {
    return this.renderAccountDetails();
  }
}
export default AccountDetails;
