import { Link } from "react-router-dom";
import { useAuth } from "./ProvideAuth";

const SignIn = () => {
  const { signIn } = useAuth();

  return (
    <div>
      <h4>SignIn</h4>
      <form>
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <input className="btn" type="submit" value="Sign In" />
      </form>

      <p>
        未登録の方は<Link to="signup">Sign Up </Link>
      </p>
    </div>
  );
};

export default SignIn;
