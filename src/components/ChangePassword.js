import { useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

const SECRET_KEY = "abcdefg";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const changePassword = async () => {
    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      newPassword === currentPassword
    ) {
      alert("Please enter the correct password");
    }

    try {
      await axios.put("http://localhost:5000/users/password", {
        payload: jwt.verify(token, SECRET_KEY),
        currentPassword,
        newPassword,
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <form onSubmit={changePassword}>
      <div>
        <p>Current Password</p>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <p>New Password</p>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input className="btn" type="submit" value="Enter" />
      </div>
    </form>
  );
};

export default ChangePassword;
