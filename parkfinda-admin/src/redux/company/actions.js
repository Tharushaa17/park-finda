import { GET_COMPANY_LIST, GET_COMPANY_LIST_SUCCESS } from "../actions"

export const getCompanyList = () => {
  return (
    {
      type: GET_COMPANY_LIST
    }
  )
}

export const getCompanyListSuccess = (payload) => {
  return (
    {
      type: GET_COMPANY_LIST_SUCCESS,
      payload: payload
    }
  )
}