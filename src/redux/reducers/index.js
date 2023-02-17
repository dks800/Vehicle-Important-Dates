import { combineReducers } from "redux";
import { vehileReducer } from "./vehicleReducer";

const reducers = combineReducers({
  allVehicles: vehileReducer,
});

export default reducers;
