import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <h4>SignUp</h4>
      <p>
        登録済みの方は<Link to="signin">Sign In </Link>
      </p>
    </div>
  );
};

export default SignUp;
