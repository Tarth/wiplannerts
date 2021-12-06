import { IsAccessTokenValid, GetAccessTokenFromRefresh } from "../../utility/datahandler";
import { IsUserValidProp } from "../../models/models";

let refreshToken = localStorage.getItem("refreshtoken");

export const LogoutIfUserIsInvalid = async ({ setIsLoggedIn }: IsUserValidProp) => {
  const checkToken = await CheckToken();
  if (checkToken === false) {
    setIsLoggedIn(false);
    localStorage.clear();
    throw true;
  }
  return false;
};

const CheckToken = async () => {
  let localToken = localStorage.getItem("accesstoken");
  try {
    const isTokenValid = await IsAccessTokenValid(localToken);
    if (isTokenValid === false) {
      refreshToken = localStorage.getItem("refreshtoken");
      let newAccessToken: string = await GetAccessTokenFromRefresh(refreshToken as string);
      localStorage.setItem("accesstoken", newAccessToken);
    }
    return true;
  } catch {
    return false;
  }
};
