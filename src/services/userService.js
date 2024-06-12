import axios from "../axios";

//user
const handleLoginApi = (data) => {
  return axios.post("/api/login",data);
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  console.log("check data from service : ", data);
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("api/delete-user", { data: { id: userId } });
  // return axios.delete(`/api/delete-user?userId=${stringify}`);
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
//all codes
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

//doctor
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-new-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get("/api/get-all-doctors");
};

const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};

const getDetailDoctorById = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
//patient
const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

// specialty
const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const getAllSpecialty = () => {
  return axios.get("/api/get-specialty");
}

//clinic
const getAllClinic = () => {
  return axios.get("/api/get-clinic");
}
const getAllDetailSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}
const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

let getAllPatientForDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

const postSendRemedy = (data) => {
  return axios.post('/api/send-remedy', data);
}

const createNewPatient = (data) => {
  return axios.post("/api/create-new-patient", data);
}
// forgot password
const handleForgotPassword = (data) => {
  return axios.post("/api/send-forgot-password", data);
}
// reset password
const handleResetPassword = (data) => {
  return axios.post("/api/reset-password", data);
}
const getBookingByUserId = (data) => {
  return axios.get(`/api/get-booking-by-user-id?userId=${data.userId}`);
}
// vnpay
const vnpayCreatePaymentUrl = (data) => {
    return axios.post("/api/create-payment-url", data);
}
const vnpayReturn = (data) => {
    return axios.get("/api/vnpay-return", data);
}
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailDoctorById,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getAllDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
  createNewPatient,
  handleForgotPassword,
  handleResetPassword,
  getBookingByUserId,
  vnpayCreatePaymentUrl,
  vnpayReturn
};
