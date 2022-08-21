import React from 'react'
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => { 
  let postsElement = props.postsData.map(p => <Post message={p.message} likeCount={p.likeCount} />)

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text)
  }

  return (
    <div className={s.post_block}>
      <h3>My posts</h3>
      <div>
        <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />
      </div>
      <div>
        <button onClick={onAddPost}>Add post</button>
      </div>
      <div className={s.newPost}>
        {postsElement}
      </div>
    </div>
  );
};
export default MyPosts;
