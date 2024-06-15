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
const isNotNil = (v) => v !== null && v !== undefined;

// update course info
export async function updateCourseInfo(
  { name, desc, level, prerequisites, basePrice, oldPublicId, courseImage },
  editCourseId
) {
  const formData = new FormData();
  if (isNotNil(courseImage)) formData.append("courseImage", courseImage);
  if (isNotNil(oldPublicId)) formData.append("oldPublicId", oldPublicId);
  if (isNotNil(name)) formData.append("name", name);
  if (isNotNil(desc)) formData.append("desc", desc);
  if (isNotNil(level)) formData.append("level", level);
  if (isNotNil(prerequisites)) formData.append("prerequisites", prerequisites);
  if (isNotNil(basePrice)) formData.append("basePrice", basePrice);

  const response = await fetch(
    `${BASE_URL}/Course/updateCourseInfo/${editCourseId}`,
    {
      method: "PUT",
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
    `${BASE_URL}/get-courses/coursePreview/` + courseID,
    {
      method: "GET",
      headers: {
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
    }
  );

  return response.json();
}
// update recently viewed
export async function updateRecentlyViewed(courseId) {
  const response = await fetch(
    `${BASE_URL}/get-courses/updateRecentlyViewed/` + courseId,
    {
      method: "PATCH",
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
    body: JSON.stringify({ courseId }),
  });

  return response.json();
}
// Remove from cart
export async function removeFromCart(courseId) {
  const response = await fetch(`${BASE_URL}/Cart/removeFromCart/` + courseId, {
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
//CourseVideos
export async function courseVideos(courseId) {
  const response = await fetch(`${BASE_URL}/Course/${courseId}/Videos/`, {
    method: "GET",
    headers: {
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}

export async function updateCourseVideos(courseId, videoId, title) {
  const formData = new FormData();
  formData.append("title", title);
  const response = await fetch(
    `${BASE_URL}/Course-Content/updateCourseVideos/${courseId}/${videoId}`,
    {
      method: "PUT",
      headers: {
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
      body: formData,
    }
  );

  return response.json();
}

// delete specific video
export async function deleteSpceficVideo(courseId, videoId) {
  const response = await fetch(
    `${BASE_URL}/Course-Content/deleteSpceficVideo/${courseId}/${videoId}`,
    {
      method: "DELETE",
      headers: {
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
    }
  );

  return response.json();
}

// free enrollment
export async function freeEnroll(courseId) {
  const response = await fetch(`${BASE_URL}/Enroll/${courseId}/freeEnroll`, {
    method: "POST",
    headers: {
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}
// free enrollment
export async function EnrollUserInCourse(courseId, email) {
  const response = await fetch(`${BASE_URL}/Enroll/${courseId}/freeEnroll`, {
    method: "POST",
    headers: {
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: email,
  });

  return response.json();
}

export const getCourseEditsIfExists = (course) => {
  if (!course) {
    return {};
  }
  return {
    ...course,
    ...(course?.edits?.courseName ? course.edits : {}),
    image: course?.image,
  };
};
