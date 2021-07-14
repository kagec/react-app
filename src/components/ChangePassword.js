import { useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

const SECRET_KEY = "abcdefg";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const decoded = jwt.verify(localStorage.getItem("token"), SECRET_KEY);

  const changePassword = async () => {
    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      newPassword === currentPassword
    ) {
      alert("Please enter the correct password");
    }

    try {
      axios.put("http://localhost:5000/users/password", {
        id: decoded.id,
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