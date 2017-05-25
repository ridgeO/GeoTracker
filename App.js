'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

class GeoTracker extends Component {
  constructor(props) {
    super(props)

    this.state = { routeCoordinates: [] }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {},
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { routeCoordinates } = this.state
      const positionLatLngs = {'latitude': position.coords.latitude, 'longitude': position.coords.longitude}
      console.log(positionLatLngs);
      this.setState({ routeCoordinates: routeCoordinates.concat(positionLatLngs) })
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType='satellite'
          showsUserLocation={true}
          followUserLocation={true}
        >
          <MapView.Polyline
            coordinates={this.state.routeCoordinates}
            strokeWidth={5}
            strokeColor='red'
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GeoTracker', () => GeoTracker);
