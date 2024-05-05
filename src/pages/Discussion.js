// styles
import styles from "../assets/css/Discussion.module.css";
import Avatar from "../assets/images/pp.jpg";

function Discussion() {
  return (
    <div className={styles.discussion}>
      <h1>Discussion: (2)</h1>
      <div className={`${styles.comment} ${styles.main}`}>
        <div className={styles.userAvatar}>
          <img src={Avatar} alt="User Avatar" />
        </div>
        <div className="commentDetails">
          <h3>User Name</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            commodo massa, id suscipit enim. Donec consectetur auctor semper.
          </p>
          <div className={styles.replies}>
            <div className={styles.comment}>
              <div className={styles.userAvatar}>
                <img src={Avatar} alt="User Avatar" />
              </div>
              <div className={styles.commentDetails}>
                <h3>Reply User Name</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            {/* <!-- Add more replies here if needed --> */}
          </div>
          <div className={styles.reply}>
            <input
              type="text"
              name="reply"
              placeholder="Reply..."
              className={styles.discussionInput}
            />
            <button type="button">Reply</button>
          </div>
          <div className={styles.loadMore}>
            <button type="button">Load more (10 replies)</button>
          </div>
        </div>
      </div>
      <div className={`${styles.comment} ${styles.main}`}>
        <div className={styles.userAvatar}>
          <img src={Avatar} alt="User Avatar" />
        </div>
        <div className={styles.commentDetails}>
          <h3>User Name</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            commodo massa, id suscipit enim. Donec consectetur auctor semper.
          </p>
          <div className={styles.replies}>
            <div className={styles.comment}>
              <div className={styles.userAvatar}>
                <img src={Avatar} alt="User Avatar" />
              </div>
              <div className={styles.commentDetails}>
                <h3>Reply User Name</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            {/* <!-- Add more replies here if needed --> */}
          </div>
          <div className={styles.reply}>
            <input
              type="text"
              name="reply"
              placeholder="Reply..."
              className={styles.discussionInput}
            />
            <button type="button">Reply</button>
          </div>
          <div className={styles.loadMore}>
            <button type="button">Load more (2 replies)</button>
          </div>
        </div>
      </div>
      <form>
        <textarea
          placeholder="Share your thoughts or ask questions here..."
          className={styles.discussionInput}
        ></textarea>
        <button type="button">Add Comment</button>
      </form>
      {/* <!-- Add more comments here if needed --> */}
    </div>
  );
}
export default Discussion;
