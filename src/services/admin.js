import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";

// Add category
export async function addCategory({ name }) {
  const response = await fetch(`${BASE_URL}/Category/addCategory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: JSON.stringify({ name }),
  });

  return response.json();
}
// Get All Categories
export async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/Category/getAllCategories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}

// get All users
export async function getAllUsers(filters) {
  const queryString = Object.entries(filters)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const response = await fetch(`${BASE_URL}/Admin/getAllUsers?${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}

// get users stats
export async function getUsersStats() {
  const response = await fetch(`${BASE_URL}/Admin/getUsersStats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}

// banAccount
export async function banAccount(userID) {
  const response = await fetch(`${BASE_URL}/Admin/banUser/${userID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}
// enableAccount
export async function enableAccount(userID) {
  const response = await fetch(`${BASE_URL}/Admin/unBanUser/${userID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}

// Add coupon
export async function addCoupon({
  couponCode,
  couponAmount,
  fromDate,
  toDate,
  maxUsage,
}) {
  const response = await fetch(`${BASE_URL}/Coupon/addCoupon`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: JSON.stringify({
      couponCode,
      couponAmount,
      fromDate,
      toDate,
      maxUsage,
    }),
  });

  return response.json();
}

// Get all coupons
export async function getAllCoupons() {
  const response = await fetch(`${BASE_URL}/Coupon/getAllCoupons`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}

// Delete Coupon
export async function deleteCoupon(couponId) {
  const response = await fetch(`${BASE_URL}/Coupon/deleteCoupon/${couponId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}

// get All courses
export async function getAllCourses() {
  const response = await fetch(`${BASE_URL}/get-courses/getAllCourses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}

// Approve Course
export async function approvement(courseID) {
  const response = await fetch(`${BASE_URL}/Admin/approvement/${courseID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}
// Disapprove Course
export async function disApprove(courseID) {
  const response = await fetch(`${BASE_URL}/Admin/disApprove/${courseID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}
