import Cookies from 'js-cookie';

const getUserFromCookie = () => {
  const userCookie = Cookies.get("user");
  return userCookie ? JSON.parse(userCookie) : null;
};

const user = getUserFromCookie();

export const config = {
  headers: {
    Authorization: `Bearer ${user ? user.token : ""}`,
    Accept: "application/json",
  },
};


