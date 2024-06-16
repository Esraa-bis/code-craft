// styles
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "../assets/css/Discussion.module.css";
import LoadMore from "../components/LoadMore";
import Post from "../components/Post";
import { doesUserLikePosts } from "../services/like";
import { createPost, getPosts } from "../services/post";
import { sweetAlert } from "../services/sweetalert";
let loadingPosts = false;
const setLoadingPosts = (v) => {
  loadingPosts = v;
};
function MyPosts({ user, signedIn }) {
  const [newPost, setNewPost] = useState(() => "");
  const [posts, setPosts] = useState(() => []);
  const [count, setCount] = useState(() => 0);
  const [liked, setLiked] = useState(() => []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // for images
  const [images, setImages] = useState([]);

  const updateExistingPost = (post) => {
    setPosts((posts) => {
      let i;
      let p = posts.find((p, index) => {
        if (p._id === post._id) i = index;
        return p._id === post._id;
      });
      if (i >= 0) {
        p.numberOfComments = post.numberOfComments;
        p.numberOfLikes = post.numberOfLikes;
        p.content = post.content;
        posts[i] = { ...p };
        return [...posts];
      }
      return posts;
    });
  };

  const addNewPost = (post, order = 1) => {
    setPosts((oldPosts) => {
      const posts = [...oldPosts];
      if (order === 1) {
        posts.push(post);
      } else {
        posts.unshift(post);
      }
      return posts;
    });
  };

  const savePost = () => {
    const value = newPost;
    if (!value) return;
    if (value.trim().length === 0) return;

    createPost(value, images).then((response) => {
      if (response.success) {
        addNewPost(response.post);
        updateNewPostInput("");
        setImages([]);
      } else {
        sweetAlert({
          text: response.message,
          icon: "error",
        });
      }
    });
    closeForm();
  };

  const updateNewPostInput = (value) => {
    setNewPost(() => value);
  };

  const getLikes = (posts) => {
    if (!user?.id && !user?._id) return;
    const ids = posts.map((p) => p._id);
    if (ids.length === 0) return;
    doesUserLikePosts(posts.map((p) => p.id || p._id)).then((response) => {
      if (response.success) {
        setLiked((l) => {
          const likes = [...l, ...response.likes];
          return likes;
        });
      } else {
        sweetAlert({
          text: response.message,
          icon: "error",
        });
      }
    });
  };

  const loadPosts = () => {
    if (loadingPosts) return;
    setLoadingPosts(true);
    getPosts(posts.length)
      .then((response) => {
        if (response.success) {
          setPosts((oldPosts) => {
            const posts = [...oldPosts];
            posts.push(...response.posts);
            return posts;
          });
          setCount(() => response.count);
          getLikes(response.posts);
        } else {
          sweetAlert({
            text: response.message,
            icon: "error",
          });
        }
      })
      .finally(() => {
        setLoadingPosts(false);
      });
  };

  const onPostDeleted = (post) => {
    setPosts((oldPosts) => {
      const posts = [...oldPosts];
      posts.splice(posts.indexOf(post), 1);
      return posts;
    });
    setCount((count) => Math.max(count - 1, 0));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const showForm = () => {
    setIsModalOpen(true);
  };

  const closeForm = () => {
    setIsModalOpen(false);
    setNewPost("");
  };
  //for uploading images
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files)); // Update images state with selected files
  };
  return (
    <div className={styles.discussion}>
      s{/* <h1>Community</h1> */}
      <div>
        {signedIn && (
          <div className={styles.newPost}>
            <img src={user?.profile_pic?.url} />
            <button className={styles.showFormButton} onClick={showForm}>
              <FontAwesomeIcon icon={faPenToSquare} /> Add New Post
            </button>
          </div>
        )}
        {isModalOpen && (
          <div className={styles.modal} id="postModal">
            <div className={styles.modalContent}>
              <span className={styles.closeButton} onClick={closeForm}>
                &times;
              </span>
              <form
                className={styles.postForm}
                onSubmit={(e) => e.preventDefault()}
              >
                <textarea
                  placeholder="Share your thoughts or ask questions here..."
                  className={styles.discussionInput}
                  value={newPost}
                  onChange={(e) => updateNewPostInput(e.target.value)}
                ></textarea>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
                <button
                  type="button"
                  onClick={savePost}
                  className={styles.addPostButton}
                >
                  Add Post
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {/*  */}
      {posts.map((post) => {
        return (
          <Post
            post={post}
            updateExistingPost={updateExistingPost}
            user={user}
            onPostDeleted={onPostDeleted}
            liked={liked}
            setPostsLikes={setLiked}
          />
        );
      })}
      <LoadMore
        loaded={posts.length}
        total={count}
        singular="post"
        plural="posts"
        onLoadMoreClick={() => loadPosts()}
      />
      {/* <!-- Add more comments here if needed --> */}
    </div>
  );
}
export default MyPosts;
