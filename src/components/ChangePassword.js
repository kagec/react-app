import { useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

const SECRET_KEY = "abcdefg";

const ChangePassword = () => {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  const decoded = jwt.verify(localStorage.getItem("token"), SECRET_KEY);

  const changePassword = async () => {
    if (!currentPwd.trim() || !newPwd.trim() || newPwd === currentPwd) {
      alert("Please enter the correct password");
    }

    try {
      axios.put("http://localhost:5000/change/password", {
        id: decoded.id,
        crntPassword: currentPwd,
        newPassword: newPwd,
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
          value={currentPwd}
          onChange={(e) => setCurrentPwd(e.target.value)}
        />
      </div>
      <div>
        <p>New Password</p>
        <input
          type="password"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
        />
        <input className="btn" type="submit" value="Enter" />
      </div>
    </form>
  );
};

export default ChangePassword;
