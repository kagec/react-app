import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "./ProvideAuth";

const Header = ({ title }) => {
  const { signOut } = useAuth();

  return (
    <header>
      <h1>{title}</h1>
      <Link to="/change/password">パスワードの変更</Link>
      <Link to="/delete/account">アカウントの削除</Link>
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
