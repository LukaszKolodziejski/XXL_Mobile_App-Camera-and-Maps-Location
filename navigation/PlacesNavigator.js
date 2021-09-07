import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";

import Colors from "../constants/Colors";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "white",
};

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-cart" size={25} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions,
  }
);

export default createAppContainer(PlacesNavigator);
