import type { RootState } from "@/app/store";
import { useGetMeQuery } from "@/services/currentUserApi";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state: RootState) => state?.user.user);

  const me = user?.user._id;
  const { data } = useGetMeQuery(me);

  console.log(data);
  return <div>{me}</div>;
};

export default Profile;
