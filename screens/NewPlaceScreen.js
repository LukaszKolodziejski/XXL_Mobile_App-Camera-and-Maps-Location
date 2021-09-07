import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as placesActions from "../store/actions/places";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const [imageUriValue, setImageUriValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const dispatch = useDispatch();

  const titleChangeHandler = (title) => setTitleValue(title);
  const imageTakeHandler = (imagePath) => setImageUriValue(imagePath);

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, imageUriValue, locationValue));
    props.navigation.navigate("Places");
  };

  const locationTakeHandler = useCallback((location) => {
    setLocationValue(location);
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.textInput}
          value={titleValue}
          onChangeText={titleChangeHandler}
        />
        <ImagePicker onImageTake={imageTakeHandler} />
        <LocationPicker
          onLocationTake={locationTakeHandler}
          navigation={props.navigation}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = (navData) => ({
  headerTitle: "Add place",
});

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: { fontSize: 18, marginBottom: 15 },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
