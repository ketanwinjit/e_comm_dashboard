export const isAuthenticated = () => {
  if (typeof window === undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const authenticate = (token, userDetails, next) => {
  //If Window item is Accessable
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(token));
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    next();
  }
};

export const getUserDetails = async () => {
  if (typeof window !== undefined) {
    const token = await JSON.parse(localStorage.getItem("jwt"));
    const user = await JSON.parse(localStorage.getItem("userDetails"));
    const userDetails = {
      ...user,
      token: token,
    };
    return userDetails;
  }
};
