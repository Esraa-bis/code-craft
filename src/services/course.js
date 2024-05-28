import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";

export async function uploadCourseInfo({
  categoryId,
  name,
  desc,
  level,
  prerequisites,
  basePrice,
  courseImage,
}) {
  const formData = new FormData();
  formData.append("courseImage", courseImage);
  formData.append("name", name);
  formData.append("desc", desc);
  formData.append("level", level);
  formData.append("prerequisites", prerequisites);
  formData.append("basePrice", basePrice);

  const response = await fetch(
    `${BASE_URL}/Course/uploadCourseInfo/${categoryId}`,
    {
      method: "POST",
      headers: {
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
      body: formData,
    }
  );

  return response.json();
}
// upload course video
export async function uploadCourseVideo({ courseID, title, video }) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("video", video);

  const response = await fetch(
    `${BASE_URL}/Course-content/uploadCourseVideos/` + courseID,
    {
      method: "POST",
      headers: {
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
      body: formData,
    }
  );

  return response.json();
}

// get Course
export async function coursePreview(courseID) {
  const response = await fetch(
    `${BASE_URL}/get-courses/coursePreview/`+courseID,
    {
      method: "GET",
      headers: {
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
    }
  );

  return response.json();
}

// Add to cart
export async function addToCart(courseId) {
  const response = await fetch(`${BASE_URL}/Cart/addToCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`, 
    },
    body: JSON.stringify( {courseId} ),
  });

  return response.json();
}
// Remove from cart 
export async function removeFromCart(courseId) {
  const response = await fetch(`${BASE_URL}/Cart/removeFromCart/`+courseId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}
// get user cart
export async function userCart() {
  const response = await fetch(`${BASE_URL}/Cart/userCart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}
// filters
export async function getCoursesFilters(filters) {
  // Constructing the query string from filters object
  const queryString = Object.entries(filters)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const response = await fetch(
    `${BASE_URL}/get-courses/getAllCourses?${queryString}`,
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