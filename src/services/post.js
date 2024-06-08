import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/Post`, {
    method: "GET",
    headers: {
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });
  return response.json();
};
