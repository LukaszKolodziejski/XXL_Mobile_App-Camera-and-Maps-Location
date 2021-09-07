import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = (props) => {
  const readyonly = props.navigation.getParam("readyonly");
  const initialLocation = props.navigation.getParam("initialLocation");
  const [selectedCoordinate, setSelectedCoordinate] = useState(initialLocation);

  const selectLocationHandler = (event) => {
    setSelectedCoordinate({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedCoordinate) return;
    props.navigation.navigate("NewPlace", {
      pickedLocation: selectedCoordinate,
    });
  }, [selectedCoordinate]);

  useEffect(() => {
    props.navigation.setParams({
      saveLocation: savePickedLocationHandler,
      readyonly,
    });
  }, [savePickedLocationHandler, readyonly]);

  let markerCoordinate;
  if (selectedCoordinate) {
    markerCoordinate = {
      latitude: selectedCoordinate.lat,
      longitude: selectedCoordinate.lng,
    };
  } else if (initialLocation) {
    markerCoordinate = {
      latitude: initialLocation.lat,
      longitude: initialLocation.lng,
    };
  }
  return (
    <MapView
      initialRegion={{
        latitude: initialLocation ? initialLocation.lat : 52.3842407,
        longitude: initialLocation ? initialLocation.lng : 16.9758263,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0321,
      }}
      style={styles.mapImage}
      onPress={selectLocationHandler}
    >
      {markerCoordinate && <Marker coordinate={markerCoordinate}></Marker>}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam("saveLocation");
  const readyonly = navData.navigation.getParam("readyonly");
  return {
    headerRight: () =>
      !readyonly ? (
        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      ) : null,
  };
};

export default MapScreen;

const styles = StyleSheet.create({
  mapImage: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: "white",
  },
});
