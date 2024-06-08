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

export const editPostComment = async (commentId, content) => {
  const formData = new FormData();
  formData.set("content", content);

  const response = await fetch(
    `${BASE_URL}/Comment/updateComment/${commentId}`,
    {
      method: "PUT",
      headers: {
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
      body: formData,
    }
  );
  return response.json();
};

export const deletePostComment = async (commentId) => {
  const response = await fetch(
    `${BASE_URL}/Comment/deleteComment/${commentId}`,
    {
      method: "DELETE",
      headers: {
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
    }
  );
  return response.json();
};
