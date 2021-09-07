import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/actions/places";

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  const navigateHandler = (item) =>
    props.navigation.navigate("PlaceDetail", {
      placeLocation: item.location,
      placeTitle: item.title,
      placeId: item.id,
    });

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          onSelect={() => navigateHandler(item)}
          title={item.title}
          //   address={item.address}
          imageUri={item.imageUri}
          location={item.location}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (navData) => ({
  headerTitle: "All places",
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Add Place"
        iconName="md-add"
        onPress={() => navData.navigation.navigate("NewPlace")}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({});

export default PlacesListScreen;
