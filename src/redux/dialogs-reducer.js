const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_MESSAGE:

      let newMessages = {
        id: 4,
        message: state.newMessagesText
      };

      return {
        ...state,
        newMessagesText: '',
        messagesData: [...state.messagesData, newMessages]
      }

    case UPDATE_NEW_MESSAGE_TEXT:
      return {
        ...state,
        newMessagesText: action.newMess
      }
    default:
      return state;
  };
};

export const addMessageActionCreator = () => ({
  type: ADD_MESSAGE
});
export const updateNewMessageTextActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newMess: text
});

export default dialogsReducer;