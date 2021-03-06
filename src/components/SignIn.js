import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./ProvideAuth";

const SignIn = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/auth/signin", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      signIn();
    } catch (e) {
      alert(e.message);

      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      <h4>SignIn</h4>
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
        <input className="btn" type="submit" value="Sign In" />
      </form>

      <p>
        未登録の方は<Link to="signup">Sign Up </Link>
      </p>
    </div>
  );
};

export default SignIn;
