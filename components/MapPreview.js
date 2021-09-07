import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapPreview = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <MapView
          initialRegion={{
            latitude: props.location.lat,
            longitude: props.location.lng,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0321,
          }}
          style={styles.mapImage}
        >
          <Marker
            coordinate={{
              latitude: props.location.lat,
              longitude: props.location.lng,
            }}
            title="A"
          />
        </MapView>
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
