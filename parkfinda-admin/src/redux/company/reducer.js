import { GET_COMPANY_LIST, GET_COMPANY_LIST_SUCCESS } from "../actions"

const initialState = {
  loading: false,
  companyList: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_COMPANY_LIST:
      return {
        ...state,
        loading: true
      }
    case GET_COMPANY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        companyList: action.payload
      }
    default:
      return state;
  }
}