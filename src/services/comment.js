import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";

export const getPostComments = async (postId, skip) => {
  const response = await fetch(
    `${BASE_URL}/Comment/all?postId=${postId}&skip=${skip}&limit=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
    }
  );
  return response.json();
};

export const addPostComment = async (postId, content) => {
  const response = await fetch(`${BASE_URL}/Comment/${postId}/addComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: JSON.stringify({ content }),
  });
  return response.json();
};
