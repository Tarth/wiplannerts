import { IsAccessTokenValid, GetAccessTokenFromRefresh } from "./datahandler";
import { SetIsLoggedInProp } from "../models/models";

let refreshToken = localStorage.getItem("refreshtoken");

export const logout = ({ setIsLoggedIn }: SetIsLoggedInProp) => {
  setIsLoggedIn(false);
  localStorage.clear();
};

export const CheckToken = async (): Promise<string | null | unknown> => {
  let localToken = localStorage.getItem("accesstoken");
  try {
    const isTokenValid = await IsAccessTokenValid(localToken);
    if (isTokenValid === false) {
      refreshToken = localStorage.getItem("refreshtoken");
      localToken = await GetAccessTokenFromRefresh(refreshToken as string);
      localStorage.setItem("accesstoken", localToken as string);
    }
    return localToken;
  } catch (error) {
    return error;
  }
};
