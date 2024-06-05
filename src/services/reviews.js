import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";
// Add Review
export async function addReview(courseId, reviewRate, reviewComment) {
  const response = await fetch(`${BASE_URL}/Review/addReview/${courseId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: JSON.stringify({ reviewRate, reviewComment }),
  });
}
// get reviews
export async function courseReview(courseId) {
  const response = await fetch(`${BASE_URL}/Review/courseReview/${courseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });
}
