// styles
import { useEffect, useState } from "react";
import styles from "../assets/css/Discussion.module.css";
import { addPostComment, getPostComments } from "../services/comment";
import { getPosts } from "../services/post";
import { sweetAlert } from "../services/sweetalert";

function Discussion() {
  const [posts, setPosts] = useState(() => []);
  const [postComments, setPostComments] = useState(() => ({}));
  const [replyToPost, setReplyToPost] = useState(() => ({}));
  const [count, setCount] = useState(() => 0);

  const updatePostComments = (postId, comments) => {
    setPostComments((oldPostComments) => {
      const postComments = { ...oldPostComments };
      if (!postComments[postId]) {
        postComments[postId] = { comments: [], ids: {} };
      }
      comments.forEach((c) => {
        if (postComments[postId].ids[c._id]) return;
        postComments[postId].ids[c._id] = true;
        postComments[postId].comments.push(c);
      });

      return postComments;
    });
  };

  const getPostReplies = (postId) => {
    getPostComments(postId, postComments[postId]?.comments?.length || 0).then(
      (response) => {
        if (response.success) {
          const { comments } = response;
          updatePostComments(postId, comments);
        } else {
          sweetAlert({
            text: response.message,
            icon: "error",
          });
        }
      }
    );
  };

  const savePostReply = (postId) => {
    const value = replyToPost[postId];
    if (!value) return;
    if (value.trim().length === 0) return;
    addPostComment(postId, value).then((response) => {
      if (response.success) {
        updatePostReplyInput(postId, "");
        const { comment, post } = response;
        setPosts((posts) => {
          let i;
          let p = posts.find((p, index) => {
            if (p._id === post._id) i = index;
            return p._id === post._id;
          });
          if (i >= 0) {
            p.numberOfComments = post.numberOfComments;
            p.numberOfLikes = post.numberOfLikes;
            posts[i] = { ...p };
            return [...posts];
          }
          return posts;
        });
        updatePostComments(postId, [comment]);
      } else {
        sweetAlert({
          text: response.message,
          type: "error",
        });
      }
    });
  };
  const updatePostReplyInput = (postId, value) => {
    setReplyToPost((v) => {
      const replies = { ...v };
      replies[postId] = value;
      return replies;
    });
  };

  useEffect(() => {
    getPosts().then((response) => {
      if (response.success) {
        setPosts(() => response.posts);
        setCount(() => response.count);
      } else {
        sweetAlert({
          text: response.message,
          icon: "error",
        });
      }
    });
  }, []);

  return (
    <div className={styles.discussion}>
      <h1>Posts: ({count})</h1>
      {posts.map((post) => {
        return (
          <div key={post._id} className={`${styles.comment} ${styles.main}`}>
            <div></div>
            <div className={styles.userAvatar}>
              <img
                src={post.addedBy?.profile_pic?.url}
                alt={`${post.addedBy?.firstName} ${post.addedBy?.lastName}`}
              />
            </div>
            <div className="commentDetails">
              <h3>{`${post.addedBy?.firstName} ${post.addedBy?.lastName}`}</h3>
              <p>{post.content}</p>
              <p>
                {post.numberOfLikes}{" "}
                {post.numberOfLikes === 1 ? "Like" : "Likes"}
              </p>
              <div className={styles.replies}>
                {postComments[post._id]?.comments.map((comment) => {
                  return (
                    <div className={styles.comment} key={comment._id}>
                      <div className={styles.userAvatar}>
                        <img
                          src={comment.addedBy?.profile_pic?.url}
                          alt={`${comment.addedBy?.firstName} ${comment.addedBy?.lastName}`}
                        />
                      </div>
                      <div className={styles.commentDetails}>
                        <h3>{`${comment.addedBy?.firstName} ${comment.addedBy?.lastName}`}</h3>
                        <p>{comment.content}</p>
                        <p>
                          {comment.numberOfLikes}{" "}
                          {comment.numberOfLikes === 1 ? "Like" : "Likes"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.reply}>
                <input
                  type="text"
                  name="reply"
                  placeholder="Reply..."
                  className={styles.discussionInput}
                  value={replyToPost[post.id] || ""}
                  onChange={(e) =>
                    updatePostReplyInput(post._id, e.target.value)
                  }
                />
                <button type="button" onClick={() => savePostReply(post._id)}>
                  Reply
                </button>
              </div>
              {post.numberOfComments > 0 &&
                (!postComments[post._id]?.comments ||
                  post.numberOfComments >
                    postComments[post._id]?.comments.length) && (
                  <div className={styles.loadMore}>
                    <button
                      type="button"
                      onClick={() => getPostReplies(post._id)}
                    >
                      Load more (
                      {post.numberOfComments -
                        (postComments[post._id]?.comments.length || 0)}
                      &nbsp;
                      {post.numberOfComments -
                        (postComments[post._id]?.comments.length || 0) ===
                      1
                        ? "reply"
                        : "replies"}
                      )...
                    </button>
                  </div>
                )}
            </div>
          </div>
        );
      })}
      <form>
        <textarea
          placeholder="Share your thoughts or ask questions here..."
          className={styles.discussionInput}
        ></textarea>
        <button type="button">Add Post</button>
      </form>
      {/* <!-- Add more comments here if needed --> */}
    </div>
  );
}
export default Discussion;
