"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getUserInfo } from "@/redux/usersSlice";
import { Button } from "@/components/ui/button";

const PermissionForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, userInfo, userInfoList } = useSelector(
    (state: RootState) => state.user
  );

  const [targetId, setTargetId] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    if (userInfo?._id) setTargetId(userInfo._id);
  }, [userInfo]);

  useEffect(() => {
    const user = userInfoList?.find((u) => u._id === targetId);
    if (user) setPermissions(user.permissions || []);
  }, [targetId, userInfoList]);

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPermissions((prev) =>
      checked ? [...prev, name] : prev.filter((perm) => perm !== name)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await axios.put(
        `${url}/api/users/${targetId}`,
        { permissions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setMessage("Permissions updated.");
        dispatch(getUserInfo());
      } else {
        setMessage("Failed to update permissions.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error.");
    }
  };

  if (!userInfo?.permissions?.includes("admin")) return null;

  return (
    <form className="mt-4 space-y-2" onSubmit={handleSubmit}>
      <label className="block font-semibold">Permissions</label>
      <select
        className="border p-2 w-full rounded"
        value={targetId}
        onChange={(e) => setTargetId(e.target.value)}
      >
        {userInfoList?.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      {["admin", "adminChoice", "deletePost", "deleteOverview"].map((perm) => (
        <div key={perm} className="flex items-center">
          <input
            type="checkbox"
            name={perm}
            checked={permissions.includes(perm)}
            onChange={handlePermissionChange}
            className="mr-2"
          />
          <label>{perm}</label>
        </div>
      ))}
      {message && <p className="text-red-500">{message}</p>}
      <Button type="submit" className="mt-2">
        Assign
      </Button>
    </form>
  );
};

export default PermissionForm;
