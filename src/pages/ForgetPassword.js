import React, { useState } from "react";
import smartphone from "../assets/smartphone.png";
import { forgetUserPassword } from "../backend/auth";

function ForgetPassword() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const forgetPasswordApi = (e) => {
    e.preventDefault();
    if (!mobileNumber || !password || !conformPassword) {
      return alert("All Fields are Required.");
    }
    if (password !== conformPassword) {
      return alert("Password and Conform Password not matched.");
    }
    let info = {
      mobileNumber: mobileNumber,
    };
    forgetUserPassword(info)
      .then((res) => {
        console.log("Check ForgetPassword Res", res);
      })
      .catch((error) => {
        console.log("Check Error", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <input
          type="text"
          className="form-control w-72 mt-2"
          placeholder="Please enter mobile number"
          onChange={(event) => setMobileNumber(event.target.value)}
        />
        <input
          type="text"
          className="form-control w-72 mt-2"
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="text"
          className="form-control w-72 mt-2"
          placeholder="Conform Password"
          onChange={(event) => setConformPassword(event.target.value)}
        />
        <button
          // disabled={}
          className="btn btn-success mt-2 w-72"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ForgetPassword;
