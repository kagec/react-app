import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
      <Link to="/change/password">パスワードの変更</Link>
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
