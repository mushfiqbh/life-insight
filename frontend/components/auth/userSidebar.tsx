"use client";

import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { AppDispatch } from "@/redux/store";
import { setToken, getUserInfo } from "@/redux/usersSlice";
import { Button } from "@/components/ui/button";

const UserSidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    Cookies.remove("token");
    dispatch(setToken(""));
    setTimeout(() => dispatch(getUserInfo()), 200);
  };

  return (
    <div className="w-full md:w-1/3 min-h-full p-8 bg-ash">
      <ul>
        <li>Profile</li>
        <li>Account</li>
        <li>Preference</li>
        <li className="w-fit mt-4 p-2 flex rounded-lg">
          <Button onClick={logout}>Log Out</Button>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
