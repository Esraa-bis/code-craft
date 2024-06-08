import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "../assets/css/Discussion.module.css";
import { addPostComment, getPostComments } from "../services/comment";
import { likePost } from "../services/like";
import { deletePost, editPost } from "../services/post";
import { sweetAlert } from "../services/sweetalert";
import CreatedSince from "./CreatedSince";
import LoadMore from "./LoadMore";
import PostComment from "./PostComment";

function Post({ user, post, updateExistingPost, onPostDeleted }) {
  const [postComments, setPostComments] = useState(() => ({
    comments: [],
    ids: {},
  }));
  const [replyToPost, setReplyToPost] = useState(() => "");
  const [editing, setEditing] = useState(() => false);
  const [editingValue, setEditingValue] = useState(() => "");

  const onReplyInputChange = (value) => {
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

  const onReplyButtonClick = (postId) => {
    const value = replyToPost;
    if (!value) return;
    if (value.trim().length === 0) return;
    addPostComment(postId, value).then((response) => {
      if (response.success) {
        onReplyInputChange("");
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

  const onLoadRepliesButtonClick = (postId) => {
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

  const onDeletePostButtonClick = async () => {
    const { isConfirmed, isDenied } = await sweetAlert({
      text: "Are you sure you want to delete this post?",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    });
    if (isDenied || isConfirmed !== true) return;
    deletePost(post._id)
      .then((response) => {
        if (response.success) {
          onPostDeleted(post);
        } else {
          sweetAlert({
            text: response.message,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        sweetAlert({
          text: error.message,
          icon: "error",
        });
      });
  };

  const onCommentDeleted = (post, comment) => {
    setPostComments((oldComments) => {
      const comments = [...oldComments.comments];
      comments.splice(comments.indexOf(comment), 1);
      const postComments = {
        ids: oldComments.ids,
        comments,
      };
      return postComments;
    });
    updateExistingPost(post);
  };

  const updateExistingComment = (comment) => {
    setPostComments(({ comments: oldComments, ids }) => {
      const comments = [...oldComments];
      let i;
      let c = comments.find((c, index) => {
        if (c._id === comment._id) i = index;
        return c._id === comment._id;
      });
      if (i >= 0) {
        c.content = comment.content;
        c.numberOfLikes = comment.numberOfLikes;
        comments[i] = { ...c };
      }
      return { comments, ids };
    });
  };

  const onEditPostButtonClick = () => {
    setEditing(() => true);
    setEditingValue(() => post.content);
  };

  const onCancelEditButtonClick = () => {
    setEditing(() => false);
    setEditingValue(() => "");
  };

  const onTextAreaChange = (value) => {
    setEditingValue(() => value);
  };

  const onSaveEditButtonClick = () => {
    const value = editingValue;
    if (!value || value.trim() === post.content) {
      onCancelEditButtonClick();
      return;
    }
    editPost(post._id, value)
      .then((response) => {
        if (response.success) {
          updateExistingPost(response.post);
          onCancelEditButtonClick();
        } else {
          sweetAlert({
            text: response.message,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        sweetAlert({
          text: error.message,
          icon: "error",
        });
      });
  };

  const onLikeButtonClick = () => {
    likePost(post._id)
      .then((response) => {
        if (response.success) {
          updateExistingPost(response.document);
        } else {
          sweetAlert({
            text: response.message,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        sweetAlert({
          text: error.message,
          icon: "error",
        });
      });
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
        <div className="flex align-items-center justify-content-between">
          <div>
            <h3>{`${post.addedBy?.firstName} ${post.addedBy?.lastName}`}</h3>
            <CreatedSince timestamp={post.createdAt}></CreatedSince>
          </div>
          {post.addedBy._id === user?.id && (
            <div>
              <button
                type="button"
                class="bg-color-transparent border0 outline0 cursor-pointer"
                onClick={() => onEditPostButtonClick()}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                class="bg-color-transparent warn border0 outline0 cursor-pointer"
                onClick={() => onDeletePostButtonClick()}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </div>
        {editing && (
          <>
            <textarea
              value={editingValue}
              onChange={(e) => onTextAreaChange(e.target.value)}
              className="fw"
            ></textarea>
            <div className="flex justify-content-end">
              <button
                type="button"
                className="warn semi-bold border0 outline0 bg-color-transparent mt10 mb10 inline-block"
                onClick={() => onCancelEditButtonClick()}
              >
                Cancel
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className="primary semi-bold border0 outline0 bg-color-transparent mt10 mb10 inline-block"
                onClick={() => onSaveEditButtonClick()}
              >
                Save
              </button>
            </div>
          </>
        )}
        {!editing && <p className={styles.content}>{post.content}</p>}
        <p className={styles.likes} onClick={() => onLikeButtonClick()}>
          {post.numberOfLikes}&nbsp;
          {post.numberOfLikes === 1 ? "Like" : "Likes"}
        </p>
        <div className={styles.replies}>
          {postComments.comments.map((comment) => {
            return (
              <PostComment
                postId={post._id}
                comment={comment}
                user={user}
                onCommentDeleted={onCommentDeleted}
                updateExistingComment={updateExistingComment}
              />
            );
          })}
          <LoadMore
            loaded={postComments?.comments.length}
            total={post.numberOfComments}
            singular="reply"
            plural="replies"
            onLoadMoreClick={() => onLoadRepliesButtonClick(post._id)}
          />
          <div className={styles.reply}>
            <input
              type="text"
              name="reply"
              placeholder="Reply..."
              className={styles.discussionInput}
              value={replyToPost || ""}
              onChange={(e) => onReplyInputChange(e.target.value)}
            />
            <button type="button" onClick={() => onReplyButtonClick(post._id)}>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
