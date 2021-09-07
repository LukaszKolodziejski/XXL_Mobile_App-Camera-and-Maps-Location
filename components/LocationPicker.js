import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import * as Location from "expo-location";
import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = props.navigation.getParam("pickedLocation");
  const { onLocationTake } = props;
  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationTake(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationTake]);

  const getLocationHandler = async () => {
    try {
      setIsFetching(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({
        timeout: 3000,
      });
      const { latitude, longitude } = location.coords;
      setPickedLocation({
        lat: latitude,
        lng: longitude,
      });
      if (location)
        props.onLocationTake({
          lat: latitude,
          lng: longitude,
        });
    } catch (err) {
      Alert.alert(
        "Couldn't fetch location",
        "Please try again later or pick a location on the map. ",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => props.navigation.navigate("Map");

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        location={pickedLocation}
        onPress={pickOnMapHandler}
        style={styles.mapPreview}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get user location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};
{
  /* <Text>No location chosen yet !</Text> */
}

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
