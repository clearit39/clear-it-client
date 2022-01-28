import { API } from "../backend";

//create a course 
export const createCourse = async (userId, course, token) => {
  console.log("course", course);
  return await fetch(`${API}/api/createCourse/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(course),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//get all courses
export const getCourses = async () => {
  try {
    const response = await fetch(`${API}/api/courses`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//delete a course

export const deleteCourse = async (courseId, token, userId) => {
  return await fetch(`${API}/api/deleteCourse/${courseId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//get a course

export const getCourse = async (courseId) => {
  try {
    const response = await fetch(`${API}/api/course/${courseId}`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//update a course

export const updateCourse = async (courseId, token, course) => {
  return await fetch(`${API}/api/updateCourse/${courseId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(course),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateCoursesParticipants = async (
  courseId,
  token,
  userMail,
  participants
) => {
  return await fetch(
    `${API}/api/updateCourseParticipants/${courseId}/${userMail}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(participants),
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
