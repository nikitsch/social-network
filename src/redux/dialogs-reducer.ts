const ADD_MESSAGE = 'ADD-MESSAGE';
// const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

type DialogType = {
  id: number,
  name: string
}

type MessageType = {
  id: number,
  message: string
}

type InitialStateType = {
  dialogsData: DialogType[]
  messagesData: MessageType[]
}

let initialState: InitialStateType = {
  dialogsData: [
    { id: 1, name: "Mikita" },
    { id: 2, name: "Denis" },
    { id: 3, name: "Anastasia" },
  ], //as Array<DialogType>,
  messagesData: [
    { id: 1, message: "Yo!" },
    { id: 2, message: "Hi." },
    { id: 3, message: "Do you remember me?" },
  ] //as Array<MessageType>
};

// export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: ActionTypes) => {

  switch (action.type) {

    case ADD_MESSAGE:

      let newMessages = {
        id: 4,
        message: action.newMessagesText
      };

      return {
        ...state,
        // newMessagesText: '',
        messagesData: [...state.messagesData, newMessages]
      }

    // case UPDATE_NEW_MESSAGE_TEXT:
    //   return {
    //     ...state,
    //     newMessagesText: action.newMess
    //   }
    default:
      return state;
  };
};

type ActionTypes = addMessageActionCreatorType;

type addMessageActionCreatorType = {
  type: typeof ADD_MESSAGE
  newMessagesText: string
}

export const addMessageActionCreator = (newMessagesText: string): addMessageActionCreatorType => ({
  type: ADD_MESSAGE,
  newMessagesText
});
// export const updateNewMessageTextActionCreator = (text) => ({
//   type: UPDATE_NEW_MESSAGE_TEXT,
//   newMess: text
// });

export default dialogsReducer;