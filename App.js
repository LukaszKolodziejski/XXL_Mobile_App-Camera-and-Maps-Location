import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import PlacesNavigator from "./navigation/PlacesNavigator";
import placesReducer from "./store/reducers/places";
import { init } from "./helpers/db";

init()
  .then(() => console.log("Init db"))
  .catch((err) => console.log(err));

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <PlacesNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
};

export default App;
