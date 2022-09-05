import { Navigate } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css"
import Message from "./Massage/Message";
import { Field, reduxForm } from "redux-form"

const Dialogs = (props) => {
  let state = props.dialogPage;

  let dialogsElements = state.dialogsData.map(d => <DialogItem name={d.name} id={d.id} />);
  let messagesElements = state.messagesData.map(m => <Message message={m.message} />);
  // let newMessagesText = state.newMessagesText;

  // let addMassage = () => {
  //   props.sendMessage();
  // }

  // let onMassageChange = (e) => {
  //   let action = e.target.value;
  //   props.updateNewMessageTextAction(action);
  // }

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessagesText)
  }

  if (!props.isAuth) return <Navigate to={'/login'} />

  return (
    <div className={s.dialogs}>
      <div className={s.dialog__items}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>

      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component="textarea" name="newMessagesText" placeholder="Noo! Don't f* write me!" />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({
  form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs;