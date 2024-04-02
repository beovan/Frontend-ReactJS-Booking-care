import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return  async (dispatch, getState)  => {
        try {
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
