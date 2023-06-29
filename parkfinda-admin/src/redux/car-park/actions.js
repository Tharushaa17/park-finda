import {CAR_PARK_DELETE, CAR_PARK_DELETE_SUCCESS, CAR_PARK_EDIT, CAR_PARK_EDIT_SUCCESS, CREATE_CAR_PARK, CREATE_CAR_PARK_SUCCESS, GET_CAR_PARK, GET_CAR_PARK_LIST, GET_CAR_PARK_LIST_SUCCESS, GET_CAR_PARK_SUCCESS} from "../actions";

export const createCarPark = (payload) => {
  return (
    {
      type: CREATE_CAR_PARK,
      payload: payload
    }
  )
}

export const createCarParkSuccess = () => {
  return (
    {
      type: CREATE_CAR_PARK_SUCCESS
    }
  )
}

export const getCarParkList = () => {
  return (
    {
      type: GET_CAR_PARK_LIST
    }
  )
}

export const getCarParkListSuccess = (payload) => {
  return (
    {
      type: GET_CAR_PARK_LIST_SUCCESS,
      payload: payload
    }
  )
}

export const carParkDelete = (payload) => {
  return (
    {
      type: CAR_PARK_DELETE,
      payload: payload
    }
  )
}

export const carParkDeleteSuccess = (payload) => {
  return (
    {
      type: CAR_PARK_DELETE_SUCCESS,
      payload: payload
    }
  )
}

export const carParkEdit = (payload) => {
  return (
    {
      type: CAR_PARK_EDIT,
      payload: payload
    }
  )
}

export const carParkEditSuccess = (payload) => {
  return (
    {
      type: CAR_PARK_EDIT_SUCCESS,
      payload: payload
    }
  )
}

export const getCarPark = (payload) => {
  return (
    {
      type: GET_CAR_PARK,
      payload: payload
    }
  )
}

export const getCarParkSuccess = (payload) => {
  return (
    {
      type: GET_CAR_PARK_SUCCESS,
      payload: payload
    }
  )
}