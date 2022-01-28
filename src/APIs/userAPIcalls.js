import { API } from "../backend";

export const getUserById = async (userId, token) => {
  return await fetch(`${API}/api/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateUser = async (userId, token, user) => {
  return await fetch(`${API}/api/user/updateinfo/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const validateUserEmail = async (email) => {
  return await fetch(`${API}/api/validateUserEmail`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const validateUserPhone = async (phone) => {
  return await fetch(`${API}/api/validateUserPhone`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const isRegistered = async (userId, courseId) => {
  return await fetch(`${API}/api/isRegistered/${userId}/${courseId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateUserCourses = async (courseId, token, userId, courses) => {
  return await fetch(`${API}/api/updateUserCourses/${userId}/${courseId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courses),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getAllUsers = async (token) => {
  return await fetch(`${API}/api/allUsers`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getUserCourses = async (userId) => {
  return await fetch(`${API}/api/userCourses/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
