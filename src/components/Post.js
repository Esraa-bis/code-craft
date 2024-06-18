import { faEdit } from "@fortawesome/free-regular-svg-icons";
import {
  faComment,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "../assets/css/Discussion.module.css";
import { addPostComment, getPostComments } from "../services/comment";
import { checkLogin } from "../services/generalFunctions";
import { doesUserLikeComments, likePost } from "../services/like";
import { deletePost, editPost } from "../services/post";
import { sweetAlert } from "../services/sweetalert";
import CreatedSince from "./CreatedSince";
import LoadMore from "./LoadMore";
import PostComment from "./PostComment";
// for the slider

// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";

function Post({
  user,
  post,
  updateExistingPost,
  onPostDeleted,
  setPostsLikes,
  liked,
  signedIn,
}) {
  const [postComments, setPostComments] = useState(() => ({
    comments: [],
    ids: {},
  }));
  const [replyToPost, setReplyToPost] = useState(() => "");
  const [editing, setEditing] = useState(() => false);
  const [editingValue, setEditingValue] = useState(() => "");
  const [postLiked, setPostLiked] = useState(
    () => liked?.indexOf(post?._id) >= 0
  );

  const [likedComments, setLikedComments] = useState(() => []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setPostLiked(() => liked?.indexOf(post._id) >= 0);
  }, [liked, post]);
  useEffect(() => {
    onLoadRepliesButtonClick(post?._id);
  });
  const onReplyInputChange = (value) => {
    setReplyToPost(() => value);
  };

  const updatePostComments = (comments) => {
    setPostComments((oldPostComments) => {
      const postComments = { ...oldPostComments };
      comments.forEach((c) => {
        if (postComments.ids[c?._id]) return;
        postComments.ids[c?._id] = true;
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

  const getLikes = (comments) => {
    if (!user?.id && !user?._id) return;
    const ids = comments.map((p) => p?._id);
    if (ids.length === 0) return;
    doesUserLikeComments(comments.map((c) => c?.id || c?._id)).then(
      (response) => {
        if (response.success) {
          setLikedComments((l) => {
            const likes = [...l, ...response.likes];
            return likes;
          });
        } else {
          sweetAlert({
            text: response.message,
            icon: "error",
          });
        }
      }
    );
  };

  const onLoadRepliesButtonClick = (postId) => {
    getPostComments(postId, postComments.comments.length || 0).then(
      (response) => {
        if (response.success) {
          const { comments } = response;
          updatePostComments(comments);
          getLikes(comments);
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
    deletePost(post?._id)
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
        if (c?._id === comment?._id) i = index;
        return c?._id === comment?._id;
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
    editPost(post?._id, value)
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
    likePost(post?._id)
      .then((response) => {
        if (response.success) {
          updateExistingPost(response.document);
          setPostsLikes((l) => {
            const likes = [...l];
            if (response.like) {
              likes.push(post?._id);
            } else {
              likes.splice(likes.indexOf(post?._id), 1);
            }
            return likes;
          });
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // to handle open images

  return (
    <div key={post?._id} className={`${styles.comment} ${styles.main}`}>
      <div className={styles.commentDetails}>
        <div className={styles.mainData}>
          <div className="flex align-items-center justify-content-between">
            <div className={styles.userinfo}>
              <div className={styles.userAvatar}>
                <img
                  src={post.addedBy?.profile_pic?.url}
                  alt={`${post.addedBy?.firstName} ${post.addedBy?.lastName}`}
                />
              </div>
              <div>
                <h3>{`${post.addedBy?.firstName} ${post.addedBy?.lastName}`}</h3>
                <CreatedSince timestamp={post.createdAt}></CreatedSince>
              </div>
            </div>
            {post.addedBy?._id === user?.id && (
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
                className="fw comment"
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
          {!editing && (
            <>
              <p className={styles.content}>{post.content} </p>
              <div className={styles.imageContainer}>
                {post.images.map((image) => (
                  <img key={image.id} src={image.url} alt="Post" />
                ))}
              </div>
            </>
          )}
        </div>

        <div className={styles.interActions}>
          <button
            className={styles.likes}
            onClick={() => {
              if (checkLogin(signedIn)) {
                onLikeButtonClick();
              }
            }}
          >
            {postLiked ? (
              <span className={styles.postLiked}>
                <FontAwesomeIcon icon={faThumbsUp} />
                Liked {post.numberOfLikes}
              </span>
            ) : (
              <>
                <FontAwesomeIcon icon={faThumbsUp} /> Like {post.numberOfLikes}
              </>
            )}
            &nbsp;
          </button>

          <button className={styles.showCommentsButton} onClick={showModal}>
            <FontAwesomeIcon icon={faComment} /> Comment
            {post?.numberOfComments}
          </button>
          {isModalOpen && (
            <div className={styles.modal} id="commentsModal">
              <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={closeModal}>
                  &times;
                </span>
                <div className={styles.replies}>
                  {postComments.comments.length === 0 ? (
                    <div className={styles.noComments}>
                      There are no comments yet.
                    </div>
                  ) : (
                    postComments.comments.map((comment) => (
                      <PostComment
                        key={comment?._id}
                        postId={post?._id}
                        comment={comment}
                        user={user}
                        onCommentDeleted={onCommentDeleted}
                        updateExistingComment={updateExistingComment}
                        liked={likedComments}
                        setCommentLikes={setLikedComments}
                        signedIn={signedIn}
                      />
                    ))
                  )}
                  {postComments.comments.length > 0 && (
                    <LoadMore
                      loaded={postComments.comments.length}
                      total={post.numberOfComments}
                      singular="Comment"
                      plural="Comments"
                      onLoadMoreClick={() =>
                        onLoadRepliesButtonClick(post?._id)
                      }
                    />
                  )}
                  <div className={styles.reply}>
                    <input
                      type="text"
                      name="reply"
                      placeholder="Add new comment....."
                      className={styles.discussionInput}
                      value={replyToPost || ""}
                      onChange={(e) => onReplyInputChange(e.target.value)}
                    />
                    <button
                      type="button"
                      className="commentBtn"
                      onClick={() => {
                        if (checkLogin(signedIn)) {
                          onReplyButtonClick(post?._id);
                        }
                      }}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Post;
