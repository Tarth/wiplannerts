export const Logout = (
  setRememberMe: ((rememberMe: boolean) => void) | undefined,
  setIsLoggedIn: (isLoggedIn: boolean) => void
) => {
  if (setRememberMe !== undefined) {
    setRememberMe(false);
  }
  setIsLoggedIn(false);
  localStorage.removeItem("accesstoken");
  localStorage.removeItem("refreshtoken");
};
