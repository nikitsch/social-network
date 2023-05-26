import { InferActionsTypes } from "./redux-store";

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

type ActionsType = InferActionsTypes<typeof actions>

// export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

  switch (action.type) {

    case 'SN/dialogs/ADD-MESSAGE':

      let newMessages = {
        id: 4,
        message: action.newMessagesText
      };

      return {
        ...state,
        messagesData: [...state.messagesData, newMessages]
      }

    default:
      return state;
  };
};

export const actions = {
  addMessageActionCreator: (newMessagesText: string) => ({
    type: 'SN/dialogs/ADD-MESSAGE',
    newMessagesText
  } as const)
}

export default dialogsReducer;