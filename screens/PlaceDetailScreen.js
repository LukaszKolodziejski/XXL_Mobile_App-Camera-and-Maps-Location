import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import MapPreview from "../components/MapPreview";
import { useSelector } from "react-redux";

const PlaceDetailScreen = (props) => {
  const placeId = props.navigation.getParam("placeId");
  const selectedPlaced = useSelector((state) =>
    state.places.places.find((pl) => pl.id === placeId)
  );
  const selectedLocation = {
    lat: selectedPlaced.lat,
    lng: selectedPlaced.lng,
  };

  const showMapHandler = () => {
    props.navigation.navigate("Map", {
      readyonly: true,
      initialLocation: selectedLocation,
    });
  };
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image style={styles.image} source={{ uri: selectedPlaced.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{`Lat: ${selectedPlaced.lat.toFixed(
            3
          )},           Lng: ${selectedPlaced.lng.toFixed(3)}`}</Text>
        </View>
        <MapPreview
          location={selectedLocation}
          style={styles.mapPreview}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => ({
  headerTitle: navData.navigation.getParam("placeTitle"),
});

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    marginHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailScreen;
