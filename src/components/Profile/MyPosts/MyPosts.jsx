import React from 'react'
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form"

const MyPosts = (props) => {
  let postsElement = props.postsData.map(p => <Post message={p.message} likeCount={p.likeCount} />)

  let newPostElement = React.createRef();

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  }

  // let onPostChange = () => {
  //   let text = newPostElement.current.value;
  //   props.updateNewPostText(text)
  // }

  return (
    <div className={s.post_block}>
      <h3>My posts</h3>

      <AddNewPostFormRedux onSubmit={onAddPost} />

      <div className={s.newPost}>
        {postsElement}
      </div>
    </div>
  );
};

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
    <div>
      <Field component="textarea" name="newPostText" />
    </div>
    <div>
      <button>Add post</button>
    </div>
  </form>
  )
}

const AddNewPostFormRedux = reduxForm({
  form: 'profileAddNewPostForm'
})(AddNewPostForm)
 
export default MyPosts;
