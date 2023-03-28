import React from 'react';

import Photos from './Photos';
import CarDetails from './CarDetails';
import CarAvailability from './CarAvailability';
import Elegibility from './Elegibility';
import Publish from './Publish';

import {Icon} from 'antd';

import {Content, StepsContent, HeaderWrapper, ListCarPage, Title, Wrapper, ListCarTitle,
  StyledSteps, StyledStep, DeleteBtnWrapper, DeleteButton, DeleteIcon} from './styled-components';

import {NewListingSteps} from '../../constants/Enums';

import history from '../../history';
import { getVehicleDescription } from '../../utils';

import MobileTitleHeader from '../../components/MobileTitleHeader';

class ListCar extends React.Component {
  navigateBack = () => {
    const {match} = this.props;
    const {params = {}} = match;
    const {section = ''} = params;

    const stages = ['elegibility', 'availability', 'details', 'photos', 'publish'];

    const currentStageIndex = stages.indexOf(section);
    const prevStage = stages[currentStageIndex - 1]; 
    history.push(prevStage);
  }

  getStepStatus(stateOrder, currentStateOrder, routeStateOrder) {

    if (stateOrder === routeStateOrder) {
      return 'process';
    }
    else if (stateOrder < currentStateOrder) {
      return 'finish';
    }
    else {
      return 'wait';
    }
  }

  canNavigateToStep = (stateOrder, newStateId, registerListingStages) => {
    const newStepOrder = registerListingStages.find(x => x.id === newStateId).order;

    if (newStepOrder <= stateOrder) {
      return true;
    }
  }

  renderStep = (newListingStep, currentState, routeState, registerListingStages) => {
    const {newListingView: {isLoading}, listing: {published}} = this.props;

    const stepOrder = registerListingStages.find(x => x.id === newListingStep.stateId).order;
    const status = this.getStepStatus(stepOrder, currentState.order, routeState.order);
    const canNavigate = this.canNavigateToStep(currentState.order, newListingStep.stateId, registerListingStages);
    
    if (newListingStep.name === NewListingSteps.publish && published) {
      return;
    }

    return (
      <StyledStep
        authorized={canNavigate}
        active={status === 'process'}
        isloading={isLoading}
        onClick={() => canNavigate && history.push(`${newListingStep.name}`)}
        status={status}
        title={newListingStep.name}
        icon={(routeState.id === newListingStep.stateId && isLoading) && <Icon type='loading'/>}/>
    );
  }

  renderSteps(section) {
    const {history, newListingView: {isLoading}, listing: {published, id: listingId, registerListingStateId: currStateId = 1},
      metaData: {registerListingStages = []}} = this.props;
    console.log('isLoading', isLoading);
    let eStatus = 'process';
    let cStatus = 'wait';
    let dStatus = 'wait';
    let phStatus = 'wait';
    let puStatus = 'wait';
    if (!registerListingStages.length || (section !== NewListingSteps.elegibility.name && !listingId)) {

      return <div></div>;
    }



    let currentState = {};
    let routeState = {};
    const routeEnum = NewListingSteps[section];
    routeState = registerListingStages.find(x => x.id === routeEnum.stateId);
    if (listingId && Object.keys(registerListingStages).length) {
      currentState = registerListingStages.find(x => x.id === currStateId)
        || registerListingStages.find(x => x.id === NewListingSteps.elegibility.stateId);
      
      if (section === NewListingSteps.elegibility.name || section === 'new') {

      }

      const eOrder = registerListingStages.find(x => x.id === NewListingSteps.elegibility.stateId).order;
      const cOrder = registerListingStages.find(x => x.id === NewListingSteps.availability.stateId).order;
      const dOrder = registerListingStages.find(x => x.id === NewListingSteps.details.stateId).order;
      const phOrder = registerListingStages.find(x => x.id === NewListingSteps.photos.stateId).order;
      const puOrder = registerListingStages.find(x => x.id === NewListingSteps.publish.stateId).order;
      console.log(registerListingStages.find(x => x.id === NewListingSteps.elegibility.stateId), registerListingStages)
      eStatus = this.getStepStatus(eOrder, currentState.order, routeState.order);
      cStatus = this.getStepStatus(cOrder, currentState.order, routeState.order);
      dStatus = this.getStepStatus(dOrder, currentState.order, routeState.order);
      phStatus = this.getStepStatus(phOrder, currentState.order, routeState.order);
      puStatus = this.getStepStatus(puOrder, currentState.order, routeState.order); 
    }
    console.log(eStatus, cStatus, dStatus, phStatus, puStatus);

    return (
      <StyledSteps size={window.matchMedia('(max-width: 750px)').matches && 'small'}>
        {Object.keys(NewListingSteps).map(newListingStep => 
          this.renderStep(NewListingSteps[newListingStep], currentState, routeState, registerListingStages)
        )}
      </StyledSteps>
    );
  }

        // <Step onClick={() => history.push(`${NewListingSteps.availability.name}`)} status={cStatus} title='Custom' icon={(routeState.id === NewListingSteps.availability.stateId && isLoading) && <Icon type='loading'/>}/>
        // <Step onClick={() => history.push(`${NewListingSteps.details.name}`)} status={dStatus} title='Details' icon={(routeState.id === NewListingSteps.details.stateId && isLoading) && <Icon type='loading'/>}/>
        // <Step onClick={() => history.push(`${NewListingSteps.photos.name}`)} status={phStatus} title='Photos' icon={(routeState.id === NewListingSteps.photos.stateId && isLoading) && <Icon type='loading'/>}/>
        // {!published && <Step  onClick={() => history.push(`${NewListingSteps.publish.name}`)} status={puStatus} title='Publish' icon={(routeState.id === NewListingSteps.publish.stateId && isLoading) && <Icon type='loading'/>}/>
  renderContent(section, routeListingId) {
    const {newListingView: {isLoading}, match, history, listing: {published, id: listingId, registerListingState},
      metaData: {registerListingStages = []}} = this.props;

      const {id: currStateId = 1} = registerListingState || {};

    if (!registerListingStages.length || (section !== NewListingSteps.elegibility.name && !listingId)) {
      return <div></div>;
    }

    const currentState = registerListingStages.find(x => x.id === currStateId);

    if (section === NewListingSteps.elegibility.name || section === 'new') {
      const path = NewListingSteps.elegibility.name;
      if (section !== path) {
        history.replace(path);
      }
      return <Elegibility {...{...this.props, navigateBack: this.navigateBack, currentState, routeState: registerListingStages[0]}}/>
    }

    const currStateRouteEnum = Object.values(NewListingSteps).find(x => x.stateId === currStateId);
    const routeEnum = NewListingSteps[section];
    const routeState = registerListingStages.find(x => x.id === routeEnum.stateId);
    
    if (routeEnum.name !== section) {
      history.replace(routeState);
    }

    if (!isLoading && routeState.order > currentState.order) {
      history.replace(currStateRouteEnum.name);
    }
    let nextStateId = '';
    if (currentState.id === routeState.id) {
      nextStateId = currentState.nextStateId;
    }

    if (routeState.id === NewListingSteps.photos.stateId) {
      
      return <Photos {...{...this.props, navigateBack: this.navigateBack, nextStateId}}/>     
    }
    else if (routeState.id === NewListingSteps.details.stateId) {

      return <CarDetails {...{...this.props, navigateBack: this.navigateBack, nextStateId}}/>
    }
    else if (routeState.id === NewListingSteps.availability.stateId) {

      return  <CarAvailability {...{...this.props, navigateBack: this.navigateBack, nextStateId}}/>
    }
    else if (routeState.id === NewListingSteps.publish.stateId) {
      return <Publish {...{...this.props, navigateBack: this.navigateBack, nextStateId}}/>
    }
  }

  render() {
    const {metaData = {}, listing, match, actions} = this.props;
    const {params = {}} = match;
    const {section = '', listingId: routeListingId} = params;
    
    const {years} = metaData;

    const isLoading = (years.length === 0) || (routeListingId !== 'new' && !listing.id);
   
    const {published, vehicle} = listing;

    const loader = (
      <Wrapper>
        <Content>
          {routeListingId ? 'Getting your listing. Hold on tight...' : 'Loading...'}
        </Content>
      </Wrapper>
    );

    const mainContent = [
      <Wrapper>
        <StepsContent>
          {this.renderSteps(section)}
        </StepsContent>
      </Wrapper>,
      <Wrapper>
        <Content>
          {this.renderContent(section, routeListingId)}
        </Content>
      </Wrapper>
    ];

    const titleText = published
      ? getVehicleDescription(vehicle)
      : 'List A Car'
    return (
      <ListCarPage>
      <MobileTitleHeader
        headerImg={'https://dl.dropboxusercontent.com/s/amba1dxk4607up4/efeito-rodape.png?dl=0'}
        title={<ListCarTitle>
        {titleText}
        {listing.id && <DeleteBtnWrapper placement="bottomRight" title={'Are you sure you want to permanently delete this listing?'}
          onConfirm={() => actions.deleteListing(listing.id)} okText="Yes" cancelText="No">
          <DeleteButton>Delete</DeleteButton>
          <DeleteIcon/>
        </DeleteBtnWrapper>}
        </ListCarTitle>
        }
      />
        {isLoading ? loader : mainContent}
      </ListCarPage>
    )
  }
}

export default ListCar;