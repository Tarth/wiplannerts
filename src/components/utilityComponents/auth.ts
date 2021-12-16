import { IsAccessTokenValid, GetAccessTokenFromRefresh } from "../../utility/datahandler";
import { IsUserValidProp } from "../../models/models";

let refreshToken = localStorage.getItem("refreshtoken");

export const logout = ({ setIsLoggedIn }: IsUserValidProp) => {
  setIsLoggedIn(false);
  localStorage.clear();
};

export const CheckToken = async () => {
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
