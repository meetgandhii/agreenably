import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import ManageCertifications from "../components/ManageCertifications";
function Home() {
  
  const { loading } = useSelector((state) => state.alertsReducer);
  
  return (
    <div style={{display: "flex"}}>
      {loading == true && <Spinner />}

      <DefaultLayout />
      <ManageCertifications/>

    </div>




  );
}

export default Home;
