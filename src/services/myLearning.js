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
// in progress
// completed
