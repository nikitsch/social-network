import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state: {
    profilePage: {
      postsData: [
        { id: 1, message: "It's my first post", likeCount: 521 },
        { id: 2, message: "Ba-da-boom!", likeCount: 5 },
        { id: 3, message: "Hi, how are you?", likeCount: 55 },
      ],
      newPostText: "nikitsch",
    },

    dialogPage: {
      dialogsData: [
        { id: 1, name: "Mikita" },
        { id: 2, name: "Denis" },
        { id: 3, name: "Anastasia" },
      ],
      messagesData: [
        { id: 1, message: "Yo!" },
        { id: 2, message: "Hi." },
        { id: 3, message: "Do you remember me?" },
      ],
      newMessagesText: "",
    },

    sidebar: {}
  },
  _callSubscriber() {
    console.log('State changed');
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  }
};

export default store;
window.store = store;