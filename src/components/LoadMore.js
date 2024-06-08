import styles from "../assets/css/Discussion.module.css";

function LoadMore({ loaded, total, onLoadMoreClick, singular, plural }) {
  return (
    <>
      {total > 0 && (loaded || 0) < total && (
        <div className={styles.loadMore}>
          <button type="button" onClick={() => onLoadMoreClick()}>
            Load ({total - (loaded || 0)}
            &nbsp;
            {total - (loaded || 0) === 1 ? singular : plural}
            )...
          </button>
        </div>
      )}
    </>
  );
}

export default LoadMore;
