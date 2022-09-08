import Dialogs from "./Dialogs";
import { addMessageActionCreator } from "../../redux/dialogs-reducer";
import { connect } from "react-redux/es/exports";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return {
    dialogPage: state.dialogsReducer
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessagesText) => {
      dispatch(addMessageActionCreator(newMessagesText));
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);