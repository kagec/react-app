import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authSignUp = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/auth/signup", {
        email,
      });

      return data.token;
    } catch (e) {
      alert(e.message);
      return null;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await authSignUp();

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
      }

      await axios.post("http://localhost:5000/users", {
        email,
        password,
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <h4>SignUp</h4>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="btn" type="submit" value="Sign Up" />
      </form>
      <p>
        登録済みの方は<Link to="signin">Sign In </Link>
      </p>
    </div>
  );
};

export default SignUp;
