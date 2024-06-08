import styles from "../assets/css/Discussion.module.css";
import CreatedSince from "./CreatedSince";

function Comment({ postId, comment }) {
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
        <CreatedSince timestamp={comment.createdAt}></CreatedSince>
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
