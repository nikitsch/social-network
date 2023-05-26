// import React from 'react'
import { actions } from "../../../redux/profile-reducer"
import MyPosts from './MyPosts';
import { connect } from "react-redux/es/exports";

// const MyPostsConteiner = (props) => {
//   let state = props.store.getState();

//   let addPost = () => {
//     props.store.dispatch(addPostActionCreator());
//   }

//   let onPostChange = (text) => {
//     let action = updateNewPostTextActionCreator(text);
//     props.store.dispatch(action);
//   }

//   return (<MyPosts updateNewPostText={onPostChange} 
//     addPost={addPost} 
//     postsData={state.profileReducer.postsData} 
//     newPostText={state.profileReducer.newPostText}  />);
// };

let mapStateToProps = (state) => {
  return {
    postsData: state.profileReducer.postsData,
    newPostText: state.profileReducer.newPostText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(actions.addPostActionCreator(newPostText));
    },
    // updateNewPostText: (text) => {
    //   let action = updateNewPostTextActionCreator(text);
    //   dispatch(action);
    // }
  }
}

const MyPostsConteiner = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsConteiner;
