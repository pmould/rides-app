import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {googleApiKey} from '../../constants';

import styled from 'styled-components';

export const CurrentLocationInfoText = styled.div`
  color: #333;
`;

export class ShareLocationMap extends React.Component {
  constructor() {
    super();
    this.vehicleLocationMarker = React.createRef();
    this.driverLocationMarker = React.createRef();
  }

  state = {
    showingDriverInfoWindow: true,
    showingVehicleInfoWindow: true,
    activeMarker: {},
    selectedPlace: {},
    driverPosition: {}

  };

  componentDidMount() {
    const {isDriver} = this.props;

    if (isDriver) {
      this.shareLocation();
    }

    setTimeout(() => {
      this.setState({toggleRender: !this.state.toggleRender})
    }, 750)
  }



  shareLocation = () => {
    const {sharingLocation} = this.state;

    if (sharingLocation) {
      this.stopSharingLocation();
    }
    else {
      this.watchId = navigator.geolocation.watchPosition(this.geoSuccess, this.geoError);
    }
  }

  stopSharingLocation = () => {
    navigator.geolocation.clearWatch(this.watchId);
    this.setState({sharingLocation: false});
  }

  geoSuccess = (position) => {
    const {actions, center, google} = this.props;
    const {coords: {latitude: lat, longitude: lng}} = position;

    const southWestCoord = {
      lat: Math.min(center.lat, lat),
      lng: Math.min(center.lng, lng)
    }
    const northEastCoord = {
      lat: Math.max(center.lat, lat),
      lng: Math.max(center.lng, lng)
    }

    this.setState ({
      driverPosition: {lat, lng},
      sharingLocation: true,
      bounds: new google.maps.LatLngBounds(southWestCoord, northEastCoord)
    });
    
    //hideNudgeBanner();
    // We have the location, don't display banner
    //clearTimeout(nudgeTimeoutId);

    // Do magic with location
    //startPos = position;
    //document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    //document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };

  geoError = (error) => {
    this.setState({sharingLocation: false});
    switch(error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        //howNudgeBanner();
        break;
    }
  }

  showMarkerLabels = (props, marker, e) => {
    const {toggleRender} = this.state;
    this.setState({toggleRender: !toggleRender})
  }

  onMarkerClick = (props, marker, e, type) => {
    const {showingVehicleInfoWindow, showingDriverInfoWindow} = this.state;
    let infoWindowUpdates = {};
    if (type === 'vehicle') {
      infoWindowUpdates = {showingVehicleInfoWindow: !showingVehicleInfoWindow}
    }
    if (type === 'driver') {
      infoWindowUpdates = {showingDriverInfoWindow: !showingDriverInfoWindow}
    }
    console.log(infoWindowUpdates)
    this.setState({
      selectedPlace: props,
      ...infoWindowUpdates
    });
  }

  render() {
    const {hostFirstName, center, isDriver} = this.props;
    const {driverPosition, bounds, showingDriverInfoWindow, showingVehicleInfoWindow} = this.state;
    console.log('center', JSON.stringify(center, null, 2));
    console.log('driverPosition', JSON.stringify(driverPosition, null, 2));
    return (
      <Map {...{...this.props}}
        bounds={bounds}
        initialCenter={{lat: center.lat, lng: center.lng}}
        center={{lat: center.lat, lng: center.lng}}>
        <Marker
          onClick={(props, marker, e) => this.onMarkerClick(props, marker, e, 'driver')}
          title='Your Location'
          name={'Your current location'}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
          position={{lat: driverPosition.lat, lng: driverPosition.lng}}>
          {isDriver && <InfoWindow
            name={'driver'}
            visible={showingDriverInfoWindow}>
              <CurrentLocationInfoText>
                  Your current location
              </CurrentLocationInfoText>
          </InfoWindow>}
        </Marker>
        <Marker
          onClick={(props, marker, e) => this.onMarkerClick(props, marker, e, 'vehicle')}
          title='Vehicle Location'
          name={`${hostFirstName}'s vehicle`}
          position={{lat: center.lat, lng: center.lng}}>
          <InfoWindow name={'vehicle'}
            visible={showingVehicleInfoWindow}>
              <CurrentLocationInfoText>
                {`${hostFirstName}'s vehicle`}
              </CurrentLocationInfoText>
          </InfoWindow>
          </Marker>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: googleApiKey
})(ShareLocationMap)