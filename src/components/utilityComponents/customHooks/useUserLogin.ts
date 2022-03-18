import { useState, useEffect } from "react";
import { IsAccessTokenValid } from "../../../utility/datahandler";
export const useUserLogin = () => {
  const [login, setLogin] = useState({ isSuccess: false, data: { name: "", message: "" } });
  const Login = async () => {
    try {
      const accessToken = localStorage.getItem("accesstoken");
      const { data } = await IsAccessTokenValid(accessToken);
      setLogin(data);
    } catch (error) {
      return console.log("useUserLogin", error);
    }
  };
  useEffect(() => {
    Login();
  }, []);
  return login;
};
