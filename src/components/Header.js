import PropTypes from "prop-types";
import Button from "./Button";
import { useAuth } from "./ProvideAuth";

const Header = ({ title }) => {
  const { signOut } = useAuth();

  return (
    <header>
      <h1>{title}</h1>
      <Button color={"darkblue"} text={"Sign Out"} onClick={signOut} />
    </header>
  );
};

Header.defaultProps = {
  title: "TODO APP",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
