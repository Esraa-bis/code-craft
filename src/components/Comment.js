import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../assets/css/Discussion.module.css";
import CreatedSince from "./CreatedSince";

function Comment({ postId, comment, user }) {
  return (
    <div className={styles.comment} key={comment._id}>
      <div className={styles.userAvatar}>
        <img
          src={comment.addedBy?.profile_pic?.url}
          alt={`${comment.addedBy?.firstName} ${comment.addedBy?.lastName}`}
        />
      </div>
      <div className={styles.commentDetails}>
        <div>
          <div>
            <h3>{`${comment.addedBy?.firstName} ${comment.addedBy?.lastName}`}</h3>
            <CreatedSince timestamp={comment.createdAt}></CreatedSince>
          </div>
          {comment.addedBy._id === user?.id && (
            <button
              type="button"
              class="bg-color-transparent warn border0 outline0 cursor-pointer"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
        <p className={styles.content}>{comment.content}</p>
        <p className={styles.likes}>
          {comment.numberOfLikes}&nbsp;
          {comment.numberOfLikes === 1 ? "Like" : "Likes"}
        </p>
      </div>
    </div>
  );
}

export default Comment;
