// import DialogItem from "./DialogItem/DialogItem";
// import s from "./Dialogs.module.css"
// import Message from "./Massage/Message";
// import WriteNewMassage from "./WriteNewMassage/WriteNewMassage";
import Dialogs from "./Dialogs";
import { addMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/dialogs-reducer";
import { connect } from "react-redux/es/exports";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

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
    dialogPage: state.dialogsReducer
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessagesText) => {
      dispatch(addMessageActionCreator(newMessagesText));
    },
    // updateNewMessageTextAction: (action) => {
    //   dispatch(updateNewMessageTextActionCreator(action));
    // }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
) (Dialogs);