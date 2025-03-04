"use client";

import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUserInfo, setToken } from "@/redux/usersSlice";
import Cookies from "js-cookie";
import axios from "axios";

interface LoginPopupProps {
  setShowHide: (show: boolean) => void;
}

const Page: React.FC<LoginPopupProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, userInfo, userInfoList } = useSelector(
    (state: RootState) => state.users
  );
  const popupRef = useRef<HTMLDivElement>(null);
  const [onLogin, setOnLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [targetId, setTargetId] = useState(userInfo?._id || "");
  const [permissions, setPermissions] = useState<string[]>([]);
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  

  useEffect(() => {
    const fetched = userInfoList?.find((user) => user._id === targetId);
    setPermissions(fetched?.permission || []);
  }, [targetId, userInfoList]);

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPermissions((prevPermissions) =>
      checked
        ? [...prevPermissions, name]
        : prevPermissions.filter((perm) => perm !== name)
    );
  };

  // const submitPermission = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setMessage("");

  // };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    const endpoint = onLogin ? "/api/users/login" : "/api/users/register";

    try {
      const response = await axios.post(url + endpoint, data, {
        headers: { "Content-Type": "application/json" },
      });

      const resp = response.data;
      if (resp.success) {
        // Store token securely
        Cookies.set("token", resp.token, {
          expires: 30,
          secure: true,
          sameSite: "Strict",
        });

        // Dispatch to Redux
        dispatch(setToken(resp.token));
        dispatch(getUserInfo(resp.token));

        // Redirect using React Router
        setMessage("");
        setOnLogin(true);
        window.location.href = "/admin";
      } else {
        setMessage(resp.message || "Login failed");
      }
    } catch (error) {
      setMessage("Login failed");
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96" ref={popupRef}>
        {token && (
          <div>
            <h2 className="text-xl font-bold">{userInfo?.name}</h2>
            <h3 className="text-gray-600">{userInfo?.email}</h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  Cookies.remove("token");
                  dispatch(setToken(""));
                  dispatch(getUserInfo(""));
                }}
              >
                Log Out
              </button>
            </div>
            {userInfo?.permission?.includes("admin") && (
              <form className="mt-4 space-y-2">
                <label className="block font-semibold">Permissions</label>
                <select
                  className="border p-2 w-full rounded"
                  defaultValue={userInfo?._id}
                  onChange={(e) => setTargetId(e.target.value)}
                >
                  {userInfoList?.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                {["admin", "adminChoice", "deletePost", "deleteOverview"].map(
                  (perm) => (
                    <div key={perm} className="flex items-center">
                      <input
                        type="checkbox"
                        name={perm}
                        checked={permissions.includes(perm)}
                        onChange={handlePermissionChange}
                        disabled={
                          perm === "ownership" &&
                          targetId === "66a36962ac666599785e7f7e"
                        }
                        className="mr-2"
                      />
                      <label>{perm}</label>
                    </div>
                  )
                )}
                <button type="submit" className="mt-2">
                  Assign
                </button>
              </form>
            )}
          </div>
        )}
        {!token && (
          <div>
            <div className="flex justify-around mb-4">
              <button onClick={() => setOnLogin(true)}>Login</button>
              <button onClick={() => setOnLogin(false)}>Register</button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              {!onLogin && (
                <input
                  type="text"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              {message && <p className="text-red-500">{message}</p>}
              <button type="submit">{onLogin ? "Login" : "Register"}</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
