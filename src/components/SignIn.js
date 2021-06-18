import { Link } from "react-router-dom";
import Button from "./Button";

const SignIn = ({ setSignIn }) => {
  return (
    <div>
      <h4>SignIn</h4>
      <Button color="green" text="Sign In" onClick={setSignIn} />

      <p>
        未登録の方は<Link to="signup">Sign Up </Link>
      </p>
    </div>
  );
};

export default SignIn;
