import { Navigate } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css"
import Message from "./Massage/Message";

const Dialogs = (props) => {
  let state = props.dialogPage;

  let dialogsElements = state.dialogsData.map(d => <DialogItem name={d.name} id={d.id} />);
  let messagesElements = state.messagesData.map(m => <Message message={m.message} />);
  let newMessagesText = state.newMessagesText;

  let addMassage = () => {
    props.sendMessage();
  }
  
  let onMassageChange = (e) => {
    let action = e.target.value;
    props.updateNewMessageTextAction(action);
  }

  if (!props.isAuth) return <Navigate to={'/login'} />

  return (
    <div className={s.dialogs}>
      <div className={s.dialog__items}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <div>
          <div>
            <textarea placeholder="Noo! Don't f* write me!"
              onChange={onMassageChange}
              value={newMessagesText} />
          </div>
          <div>
            <button onClick={addMassage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;