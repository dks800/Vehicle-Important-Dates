import { ActionTypes } from "../constants/action-types";

export const setVehicleList = (vehicles) => {
  return {
    type: ActionTypes.SET_VEHICLE_LIST,
    payload: vehicles,
  };
};

export const addVehicle = (vehicleData) => {
  return {
    type: ActionTypes.ADD_VEHICLE,
    payload: vehicleData,
  };
};
