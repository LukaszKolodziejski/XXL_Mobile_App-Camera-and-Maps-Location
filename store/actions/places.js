import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, imageUri, location) => async (dispatch) => {
  const fileName = imageUri.split("/").pop();
  const newPath = FileSystem.documentDirectory + fileName;
  try {
    await FileSystem.moveAsync({
      from: imageUri,
      to: newPath,
    });
    const dbResult = await insertPlace(
      title,
      newPath,
      "some address",
      location.lat,
      location.lng
    );
    dispatch({
      type: ADD_PLACE,
      placeDate: {
        id: dbResult.insertId,
        title,
        imageUri: newPath,
        address: "some address",
        location,
      },
    });
  } catch (err) {
    throw err;
  }
};

export const loadPlaces = () => async (dispatch) => {
  try {
    const dbResult = await fetchPlaces();
    dispatch({
      type: SET_PLACES,
      places: dbResult.rows._array,
    });
  } catch (err) {
    throw err;
  }
};
