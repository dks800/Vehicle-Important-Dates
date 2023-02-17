import { ActionTypes } from "../constants/action-types";

const initialState = {
  vehicles: [],
};
export const vehileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_VEHICLE_LIST:
      return { ...state, vehicles: payload };
    case ActionTypes.ADD_VEHICLE:
      return { ...state, vehicle: payload };
    default:
      return state;
  }
};
