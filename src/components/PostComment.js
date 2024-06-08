import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "../assets/css/Discussion.module.css";
import { deletePostComment, editPostComment } from "../services/comment";
import { likeComment } from "../services/like";
import { sweetAlert } from "../services/sweetalert";
import CreatedSince from "./CreatedSince";

function PostComment({
  comment,
  user,
  onCommentDeleted,
  updateExistingComment,
  liked,
  setCommentLikes,
}) {
  const [editing, setEditing] = useState(() => false);
  const [editingValue, setEditingValue] = useState(() => "");
  const [commentLiked, setCommentLiked] = useState(() => false);

  useEffect(() => {
    setCommentLiked(() => liked?.indexOf(comment._id) >= 0);
  }, [liked, comment]);

  const onEditCommentButtonClick = () => {
    setEditing(() => true);
    setEditingValue(() => comment.content);
  };

  const onCancelEditButtonClick = () => {
    setEditing(() => false);
    setEditingValue(() => "");
  };

  const onTextAreaChange = (value) => {
    setEditingValue(() => value);
  };

  const onDeleteCommentButtonClick = async () => {
    const { isConfirmed, isDenied } = await sweetAlert({
      text: "Are you sure you want to delete this comment?",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    });
    if (isDenied || isConfirmed !== true) return;
    deletePostComment(comment._id)
      .then((response) => {
        if (response.success) {
          onCommentDeleted(response.post, comment);
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

  const onSaveEditButtonClick = () => {
    const value = editingValue;
    if (!value || value.trim() === comment.content) {
      onCancelEditButtonClick();
      return;
    }
    editPostComment(comment._id, value)
      .then((response) => {
        if (response.success) {
          updateExistingComment(response.comment);
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
    likeComment(comment._id)
      .then((response) => {
        if (response.success) {
          updateExistingComment(response.document);
          setCommentLikes((l) => {
            const likes = [...l];
            if (response.like) {
              likes.push(comment._id);
            } else {
              likes.splice(likes.indexOf(comment._id), 1);
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

  return (
    <div className={styles.comment} key={comment._id}>
      <div className={styles.userAvatar}>
        <img
          src={comment.addedBy?.profile_pic?.url}
          alt={`${comment.addedBy?.firstName} ${comment.addedBy?.lastName}`}
        />
      </div>
      <div className={styles.commentDetails}>
        <div className="flex justify-content-between align-items-center">
          <div>
            <h3>{`${comment.addedBy?.firstName} ${comment.addedBy?.lastName}`}</h3>
            <CreatedSince timestamp={comment.createdAt}></CreatedSince>
          </div>
          {comment.addedBy._id === user?.id && (
            <div>
              <button
                type="button"
                class="bg-color-transparent border0 outline0 cursor-pointer"
                onClick={() => onEditCommentButtonClick()}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                class="bg-color-transparent warn border0 outline0 cursor-pointer"
                onClick={() => onDeleteCommentButtonClick()}
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
        {!editing && <p className={styles.content}>{comment.content}</p>}
        <p className={styles.likes} onClick={() => onLikeButtonClick()}>
          {comment.numberOfLikes}&nbsp;
          {commentLiked
            ? "Unlike"
            : comment.numberOfLikes === 1
            ? "Like"
            : "Likes"}
        </p>
      </div>
    </div>
  );
}

export default PostComment;
