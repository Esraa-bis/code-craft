// styles
import { useEffect, useState } from "react";
import styles from "../assets/css/Discussion.module.css";
import Post from "../components/Post";
import { createPost, getPosts } from "../services/post";
import { sweetAlert } from "../services/sweetalert";

function Discussion() {
  const [newPost, setNewPost] = useState(() => "");
  const [posts, setPosts] = useState(() => []);
  const [count, setCount] = useState(() => 0);

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

    createPost(value).then((response) => {
      if (response.success) {
        addNewPost(response.post);
        updateNewPostInput("");
      } else {
        sweetAlert({
          text: response.message,
          icon: "error",
        });
      }
    });
  };

  const updateNewPostInput = (value) => {
    setNewPost(() => value);
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
        return <Post post={post} updateExistingPost={updateExistingPost} />;
      })}
      <form>
        <textarea
          placeholder="Share your thoughts or ask questions here..."
          className={styles.discussionInput}
          value={newPost}
          onChange={(e) => updateNewPostInput(e.target.value)}
        ></textarea>
        <button type="button" onClick={() => savePost()}>
          Add Post
        </button>
      </form>
      {/* <!-- Add more comments here if needed --> */}
    </div>
  );
}
export default Discussion;
