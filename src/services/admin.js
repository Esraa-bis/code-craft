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
export async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/Admin/getAllUsers`, {
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

// filters
