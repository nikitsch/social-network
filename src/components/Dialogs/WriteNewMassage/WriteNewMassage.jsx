import React from 'react'
import { addMessageActionCreator, updateNewMessageTextActionCreator } from "../../../redux/dialogs-reducer"

const WriteNewMessage = (props) => {
  let newMessageElement = React.createRef();

  let addMessage = () => {
    props.dispatch(addMessageActionCreator());
  }
  let onMessageChange = () => {
    let text = newMessageElement.current.value;
    let action = updateNewMessageTextActionCreator(text);
    props.dispatch(action);
  }
  return (
    <div>
      <div>
        <textarea placeholder="Noo! Don't f* write me!" onChange={onMessageChange} ref={newMessageElement} value={props.newMessagesText} />
      </div>
      <div>
        <button onClick={addMessage}>Add message</button>
      </div>
    </div>)
};

export default WriteNewMessage;