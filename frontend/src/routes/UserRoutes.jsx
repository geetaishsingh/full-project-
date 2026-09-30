import { useOutletContext } from "react-router-dom";
import UserLayout from "../layouts/UserLayout/UserLayout";

function UserRoutesWrapper() {
  const { user } = useOutletContext();
  return <UserLayout user={user} />;
}

export { UserRoutesWrapper };
