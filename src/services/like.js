import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";

const like = async (id, onModel) => {
  const response = await fetch(`${BASE_URL}/Like/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: JSON.stringify({ onModel }),
  });

  return response.json();
};

const userLikes = async (ids, onModel) => {
  const response = await fetch(
    `${BASE_URL}/Like/userLikes?onModel=${onModel}&ids=${ids.join(",")}`,
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

export const likePost = function (postId) {
  return like(postId, "Post");
};

export const likeComment = function (commentId) {
  return like(commentId, "Comment");
};

export const doesUserLikePosts = (postIds) => {
  return userLikes(postIds, "Post");
};

export const doesUserLikeComments = (commentIds) => {
  return userLikes(commentIds, "Comment");
};
