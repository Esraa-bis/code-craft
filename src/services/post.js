import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";

export const createPost = async (content, images) => {
  const formData = new FormData();
  formData.set("content", content);
  // Append each image individually to the FormData object

  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  const response = await fetch(`${BASE_URL}/Post/addPost`, {
    method: "POST",
    headers: {
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: formData,
  });

  return response.json();
};

export const getPosts = async (skip) => {
  const response = await fetch(`${BASE_URL}/Post?skip=${skip}`, {
    method: "GET",
    headers: {
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });
  return response.json();
};

export const editPost = async (postId, content) => {
  const formData = new FormData();
  formData.set("content", content);

  const response = await fetch(`${BASE_URL}/Post/updatePost/${postId}`, {
    method: "PUT",
    headers: {
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: formData,
  });
  return response.json();
};

export const deletePost = async (postId) => {
  const response = await fetch(`${BASE_URL}/Post/deletePost/${postId}`, {
    method: "DELETE",
    headers: {
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });
  return response.json();
};
