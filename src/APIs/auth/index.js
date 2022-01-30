import { API } from "../../backend";

export const signup = (user) => {
  return fetch(`${API}/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const signin = (user) => {
  return fetch(`${API}/api/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const googlesignin = (user) => {
  return fetch(`${API}/api/googlesignin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("finnect", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("finnect");
    // next();

    // return fetch(`${API}/signout`, {
    //   method: "GET"
    // })
    //   .then(response => console.log("signout", response))
    //   .catch(err => console.log(err));
  }
};

export const forgotpassword = async (email) => {
  return fetch(`${API}/api/forgot-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const resetpassword = async (password, email, token) => {
  return fetch(`${API}/api/resetpassword`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(password, email),
  })
    .then((response) => console.log("reset-password", response))
    .catch((err) => console.log(err));
};

export const isAutheticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("ClearITuser")) {
    // console.log(localStorage.getItem("ClearITuser"));
    // return true;
    return JSON.parse(localStorage.getItem("ClearITuser"));
  } else {
    return false;
  }
};
