import axios from "axios";
import { useAuth } from "./ProvideAuth";
import Button from "./Button";

const DeleteAccount = () => {
  const { payload, signOut } = useAuth();

  const deleteAccount = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:5000/users/${payload.id}`);
      signOut();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Button color={"red"} text={"アカウントの削除"} onClick={deleteAccount} />
  );
};

export default DeleteAccount;
