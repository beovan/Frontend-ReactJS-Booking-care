import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUserService } from "../../services/userService";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return  async (dispatch, getState)  => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
              dispatch (fetchGenderSuccess(res.data));
            } else {
              dispatch (fetchGenderFailed());
            }
          } catch (e) {
            fetchGenderFailed();
            console.log("fetchGenderStart error: ", e);
          }
    }
 
};

export const fetchGenderSuccess = (genderdata) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderdata
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});

export const fetchPositionSuccess = (positiondata) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positiondata
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED,
})

export const fetchRoleSuccess = (roledata) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roledata
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED,
})

export const fetchPositionStart = () => {
    return async (dispatch,getState) => {
        try{
            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data));
            }
            else{
                dispatch(fetchPositionFailed());
            }
        }
        catch (e){
            dispatch(fetchPositionFailed());
            console.log("fetchPositionFaild error: ", e);
        }
    }
}

export const fetchRoleStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess());
            }
            else{
                dispatch(fetchRoleFailed());
            }
        }
        catch(e){
            dispatch(fetchRoleFailed());
            console.log("fetchRoleStart error: ", e);
        }
    }
}

export const createNewUser = (data) => {
    return async(dispatch, getState) => {
        try{
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                dispatch(saveUserSuccess());
            }
            else{
                dispatch(saveUserFailed());
            }
        }
        catch(e){
            dispatch(saveUserFailed());
            console.log("createNewUser error: ", e);
        }
    }
}