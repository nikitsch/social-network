// import React from 'react';
// import ReactDOM from 'react-dom';
import profileReducer, { addPostActionCreator } from './profile-reducer';

let state = {
  postsData: [
    { id: 1, message: "It's my first post", likeCount: 521 },
    { id: 2, message: "Ba-da-boom!", likeCount: 5 },
    { id: 3, message: "Hi, how are you?", likeCount: 55 },
  ]
};

it('length of posts be incremented', () => {
  // 1) Данные для теста
  let action = addPostActionCreator('nikitsch MBGA');

  // 2) Действие(action)
  let newState = profileReducer(state, action);

  // 3) Ожидание
  expect(newState.postsData.length).toBe(4);
});

it('the added message will match the original', () => {
  // 1) Данные для теста
  let action = addPostActionCreator('nikitsch MBGA');

  // 2) Действие(action)
  let newState = profileReducer(state, action);

  // 3) Ожидание
  expect(newState.postsData[3].message).toBe('nikitsch MBGA');
});


// it('delete post', () => {
//   let action = deletePost(1);

//   let newState = profileReducer(state, action);

//   expect(newState.postsData.length).toBe(2);
// });