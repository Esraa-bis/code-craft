import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";

export const createPost = async (content) => {
  const formData = new FormData();
  formData.set("content", content);

  const response = await fetch(`${BASE_URL}/Post/addPost`, {
    method: "POST",
    headers: {
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: formData,
  });

  return response.json();
};

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/Post`, {
    method: "GET",
    headers: {
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });
  return response.json();
};
