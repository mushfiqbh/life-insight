"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { AppDispatch, RootState } from "@/redux/store";
import { getUserInfo, setToken } from "@/redux/usersSlice";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, userInfo } = useSelector((state: RootState) => state.user);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [onLogin, setOnLogin] = useState(true);
  const [message, setMessage] = useState("");

  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken && !token) dispatch(setToken(cookieToken));
  }, [token, dispatch]);

  useEffect(() => {
    if (token) dispatch(getUserInfo());
  }, [token, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint = onLogin ? "/api/users/login" : "/api/users/register";
      const { data } = await axios.post(`${url}${endpoint}`, formState, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.success) {
        Cookies.set("token", data.token, {
          expires: 30,
          secure: true,
          sameSite: "Strict",
        });

        dispatch(setToken(data.token));
        setTimeout(() => dispatch(getUserInfo()), 300);

        setOnLogin(true);
        window.location.href = "/admin";
      } else {
        setMessage(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Authentication failed");
    }
  };

  return {
    token,
    userInfo,
    onLogin,
    setOnLogin,
    formState,
    setFormState,
    handleSubmit,
    message,
  };
};

export default useAuth;
