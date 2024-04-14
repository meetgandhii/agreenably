import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    
    console.log(reqObj);
    console.log(process.env.REACT_APP_SERVER_API)
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/users/login`,
      reqObj
    );

    const { name, _id } = response.data;
    localStorage.setItem("user", JSON.stringify({ name, _id }));
    
    const bookingURL = true ? "/get-recommendation" : "/"
    message.success("Login success");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = bookingURL;
    }, 500);
  } catch (error) {
    console.error("Error:", error);
    console.error("Error response:", error.response);
  
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};


export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/users/register`,
      reqObj
    );
    message.success("Registration successfull");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.error("Error:", error);
    console.error("Error response:", error.response); // Log the error response
  
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};
