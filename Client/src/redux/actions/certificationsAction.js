import axios from "axios";
import { message } from "antd";

export const getAllCertifications = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get(
      "http://localhost:4000/api/certifications/getallcertifications"
    );

    console.log("Certifications Response:", response.data);

    dispatch({ type: "GET_ALL_certifications", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log("Error fetching certifications:", error);
    dispatch({ type: "LOADING", payload: false });
  }
};

// export const addCertification = (reqObj) => async (dispatch) => {
//   dispatch({ type: "LOADING", payload: true });

//   try {
//     await axios.post(
//       "http://localhost:4000/api/cars/addcar",
//       reqObj
//     );

//     dispatch({ type: "LOADING", payload: false });
//     message.success("New car added successfully");
//     setTimeout(() => {
//       window.location.href = "/admin";
//     }, 500);
//   } catch (error) {
//     console.log(error);
//     dispatch({ type: "LOADING", payload: false });
//   }
// };

// export const editCertification = (reqObj) => async (dispatch) => {
//   dispatch({ type: "LOADING", payload: true });

//   try {
//     await axios.put(
//       "http://localhost:4000/api/cars/editcar",
//       reqObj
//     );

//     dispatch({ type: "LOADING", payload: false });
//     message.success("Certification details updated successfully");
//     setTimeout(() => {
//       window.location.href = "/admin";
//     }, 500);
//   } catch (error) {
//     console.log(error);
//     dispatch({ type: "LOADING", payload: false });
//   }
// };

// export const deleteCertification = (reqObj) => async (dispatch) => {
//   dispatch({ type: "LOADING", payload: true });

//   try {
//     await axios.post(
//       "http://localhost:4000/api/cars/deletecar",
//       reqObj
//     );

//     dispatch({ type: "LOADING", payload: false });
//     message.success("Certification deleted successfully");
//     setTimeout(() => {
//       window.location.reload();
//     }, 500);
//   } catch (error) {
//     console.log(error);
//     dispatch({ type: "LOADING", payload: false });
//   }
// };
