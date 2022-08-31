// import DialogItem from "./DialogItem/DialogItem";
// import s from "./Dialogs.module.css"
// import Message from "./Massage/Message";
// import WriteNewMassage from "./WriteNewMassage/WriteNewMassage";
import Dialogs from "./Dialogs";
import { addMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/dialogs-reducer";
import { connect } from "react-redux/es/exports";

// const DialogsContainer = (props) => {
//   let state = props.store.getState().dialogsReducer;

//   let addMassage = () => {
//     props.store.dispatch(addMessageActionCreator());
//   }

//   let onMassageChange = (action) => {
//     props.store.dispatch(updateNewMessageTextActionCreator(action));
//   }

//   return (<Dialogs updateNewMessageTextAction={onMassageChange}
//     sendMessage={addMassage}
//     dialogPage={state} />);
// };

let mapStateToProps = (state) => {
  return {
    dialogPage: state.dialogsReducer,
    isAuth: state.auth.isAuth
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(addMessageActionCreator());
    },
    updateNewMessageTextAction: (action) => {
      dispatch(updateNewMessageTextActionCreator(action));
    }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);

export default DialogsContainer;