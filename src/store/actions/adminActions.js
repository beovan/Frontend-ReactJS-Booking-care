import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getAllSpecialty,
   getAllClinic
} from "../../services/userService";

import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      fetchGenderFailed();
      console.log("fetchGenderStart error: ", e);
    }
  };
};

export const fetchGenderSuccess = (genderdata) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderdata,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});

export const fetchPositionSuccess = (positiondata) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positiondata,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});

export const fetchRoleSuccess = (roledata) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roledata,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionFaild error: ", e);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error: ", e);
    }
  };
};

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Create new user succeed!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("createNewUser error: ", e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users));
      } else {
        toast.error("Fetch all users failed!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Fetch all users failed!");
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersStart error: ", e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(id);
      if (res && res.errCode === 0) {
        toast.success("Delete user succeed!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete user failed!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Delete user failed!");
      dispatch(deleteUserFailed());
      console.log("deleteUser error: ", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the user succeed!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Update the user error!");
        console.log(data);
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Update the user error!");
      dispatch(editUserFailed());
      console.log("editAUser error: ", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
          dataDoctors: res.data,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAILED: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_USER_FAILED,
      });
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
          dataDoctors: res.data,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAILED: ", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save Infor detail doctor succeed!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
        });
      } else {
        toast.error("Save Infor detail doctor error!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save Infor detail doctor failed pls check again!");
      console.log("SAVE_DETAIL_DOCTORS_FAILED: ", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
      });
    }
  };
};


export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) { 
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
        });
      }
    } catch (e) {
      console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
      });
    }
  };
};

export const fetchAllPayment = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("PRICE");
      if (res && res.errCode === 0) { 
        dispatch({
          type: actionTypes.FETCH_ALL_PAYMENT_SUCCESS,
          payment: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_PAYMENT_FAILDED
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_PAYMENT_FAILDED: ", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
      });
    }
  };
};

export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });

     let resPrice = await getAllCodeService("PRICE");
     let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      if (resPrice && resPrice.errCode === 0
      && resPayment && resPayment.errCode === 0
      && resProvince && resProvince.errCode === 0
      && resSpecialty && resSpecialty.errCode === 0
      && resClinic && resClinic.errCode === 0
    ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data
        }
        dispatch(fetchRequiredDoctorInforSucces(data))
      }
      else{
        dispatch(fetchRequiredDoctorInforFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInforFailed());
      console.log("getRequiredDoctorInfor error: ", e);
    }
  };
};

export const fetchRequiredDoctorInforSucces = (allRequiredDate)=> ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredDate,
})

export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED,
})