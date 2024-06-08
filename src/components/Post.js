import { useState } from "react";
import styles from "../assets/css/Discussion.module.css";

import { addPostComment, getPostComments } from "../services/comment";
import { sweetAlert } from "../services/sweetalert";
import Comment from "./Comment";
import CreatedSince from "./CreatedSince";

function Post({ post, updateExistingPost }) {
  const [postComments, setPostComments] = useState(() => ({
    comments: [],
    ids: {},
  }));
  const [replyToPost, setReplyToPost] = useState(() => "");

  const updatePostReplyInput = (value) => {
    setReplyToPost(() => value);
  };

  const updatePostComments = (comments) => {
    setPostComments((oldPostComments) => {
      const postComments = { ...oldPostComments };
      comments.forEach((c) => {
        if (postComments.ids[c._id]) return;
        postComments.ids[c._id] = true;
        postComments.comments.push(c);
      });

      return postComments;
    });
  };

  const savePostReply = (postId) => {
    const value = replyToPost;
    if (!value) return;
    if (value.trim().length === 0) return;
    addPostComment(postId, value).then((response) => {
      if (response.success) {
        updatePostReplyInput("");
        const { comment, post } = response;
        updateExistingPost(post);
        updatePostComments([comment]);
      } else {
        sweetAlert({
          text: response.message,
          type: "error",
        });
      }
    });
  };

  const getPostReplies = (postId) => {
    getPostComments(postId, postComments.comments.length || 0).then(
      (response) => {
        if (response.success) {
          const { comments } = response;
          updatePostComments(comments);
        } else {
          sweetAlert({
            text: response.message,
            icon: "error",
          });
        }
      }
    );
  };
  return (
    <div key={post._id} className={`${styles.comment} ${styles.main}`}>
      <div className={styles.userAvatar}>
        <img
          src={post.addedBy?.profile_pic?.url}
          alt={`${post.addedBy?.firstName} ${post.addedBy?.lastName}`}
        />
      </div>
      <div className={styles.commentDetails}>
        <div>
          <h3>{`${post.addedBy?.firstName} ${post.addedBy?.lastName}`}</h3>
          <CreatedSince timestamp={post.createdAt}></CreatedSince>
        </div>
        <p className={styles.content}>{post.content}</p>
        <p className={styles.likes}>
          {post.numberOfLikes}&nbsp;
          {post.numberOfLikes === 1 ? "Like" : "Likes"}
        </p>
        <div className={styles.replies}>
          {postComments.comments.map((comment) => {
            return <Comment postId={post._id} comment={comment} />;
          })}
          {post.numberOfComments > 0 &&
            (!postComments?.comments ||
              post.numberOfComments > postComments?.comments.length) && (
              <div className={styles.loadMore}>
                <button type="button" onClick={() => getPostReplies(post._id)}>
                  Load (
                  {post.numberOfComments - (postComments?.comments.length || 0)}
                  &nbsp;
                  {post.numberOfComments -
                    (postComments?.comments.length || 0) ===
                  1
                    ? "reply"
                    : "replies"}
                  )...
                </button>
              </div>
            )}

          <div className={styles.reply}>
            <input
              type="text"
              name="reply"
              placeholder="Reply..."
              className={styles.discussionInput}
              value={replyToPost || ""}
              onChange={(e) => updatePostReplyInput(e.target.value)}
            />
            <button type="button" onClick={() => savePostReply(post._id)}>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
