import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";
// recently viewed
export async function recentlyViewed() {
  const response = await fetch(`${BASE_URL}/get-courses/recentlyViewed`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}
// inprogress
export async function inProgress() {
  const response = await fetch(`${BASE_URL}/Enroll/userCourses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}
// completed

// filters
export async function userCoursesFilters(filters) {
  // Constructing the query string from filters object
  const queryString = Object.entries(filters)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const response = await fetch(
    `${BASE_URL}/Enroll/userCourses?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
    }
  );

  return response.json();
}
// update progress
export async function updateProgress(courseId, videoId) {
  const response = await fetch(
    `${BASE_URL}/Enroll/${courseId}/${videoId}/updateProgress`,
    {
      method: "PUT",
      headers: {
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
    }
  );

  return response.json();
}

export async function courseProgress(courseId, videoId) {
  const response = await fetch(
    `${BASE_URL}/Enroll/${courseId}/courseProgress`,
    {
      method: "GET",
      headers: {
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
    }
  );

  return response.json();
}
