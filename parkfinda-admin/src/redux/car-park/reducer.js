import { toast } from "react-toastify";

import {
  CAR_PARK_DELETE,
  CAR_PARK_DELETE_SUCCESS,
  CAR_PARK_EDIT,
  CAR_PARK_EDIT_SUCCESS,
  CREATE_CAR_PARK,
  CREATE_CAR_PARK_SUCCESS,
  GET_CAR_PARK,
  GET_CAR_PARK_LIST,
  GET_CAR_PARK_LIST_SUCCESS,
  GET_CAR_PARK_SUCCESS,
} from "../actions";

const initialState = {
  loading: false,
  carParkList: [],
  editCarPark: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CAR_PARK:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CAR_PARK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_CAR_PARK_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_CAR_PARK_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        carParkList: action.payload,
      };
    case CAR_PARK_DELETE:
      return {
        ...state,
        loading: true,
      };
    case CAR_PARK_DELETE_SUCCESS:
      toast.success("Deleted Successfully!");
      return {
        ...state,
        loading: false,
        carParkList: state.carParkList.filter((park) => {
          if (action.payload.id === park._id) {
            return false;
          }
          return true;
        }),
      };
    case CAR_PARK_EDIT:
      return {
        ...state,
        loading: true,
      };
    case CAR_PARK_EDIT_SUCCESS:
      toast.success("Edited Successfully!");
      return {
        ...state,
        loading: false,
      };
    case GET_CAR_PARK:
      return {
        ...state,
        loading: true,
      };
    case GET_CAR_PARK_SUCCESS:
      return {
        ...state,
        loading: false,
        editCarPark: action.payload,
      };
    default:
      return state;
  }
};
