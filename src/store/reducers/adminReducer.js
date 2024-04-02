import actionTypes from "../actions/actionTypes";

const initialState = {
    genders: [],
    roles: [],
    position: []

};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
        console.log('beovan fire fetch gender start: ',action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
        let copyState = {...state};
        copyState.genders = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAILDED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
