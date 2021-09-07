import { ADD_PLACE, SET_PLACES } from "../actions/places";
import Place from "../../models/place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeDate.id.toString(),
        action.placeDate.title,
        action.placeDate.imageUri,
        action.placeDate.address,
        action.placeDate.location.lat,
        action.placeDate.location.lng
      );
      return { places: state.places.concat(newPlace) };
    case SET_PLACES:
      return {
        places: action.places.map(
          (pl) =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
        ),
      };
    default:
      return state;
  }
};
