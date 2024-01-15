import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row } from "antd";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://agreenably-website-server.onrender.com/api/users/profile/${user._id}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);



  return (
    <div style={{display: "flex"}}>
      <DefaultLayout />      
      <Row className="main-row" justify="center">
        {userData ? (
          <>
            {userData._id}
            {userData.company}
            {userData.name}
            {userData.interested_certifications}
            {userData.completed_certification}
            {userData.ongoing_certification}
            {userData.email}
            {userData.password}
          </>
        ) : (
          <Spinner />
        )}
      </Row>

      
    </div>
  );
}

export default Profile;
