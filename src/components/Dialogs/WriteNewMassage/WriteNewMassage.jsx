import React from 'react'
// import s from "../Dialogs.module.css"
// моё
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../../redux/dialogs-reducer"
// моё

const WriteNewMassage = (props) => {
  let newMassageElement = React.createRef();

  let addMassage = () => {
    // let massage = newMassageElement.current.value;
    // alert(massage);
    // моё
    props.dispatch(addMessageActionCreator());
    // моё
  }
    // моё
  let onMassageChange = () => {
    let text = newMassageElement.current.value;
    let action = updateNewMessageTextActionCreator(text);
    props.dispatch(action);
  }
    // моё
  return (
    <div>
      <div>
        <textarea placeholder="Noo! Don't f* write me!" onChange={onMassageChange} ref={newMassageElement} value={props.newMessagesText} />
      </div>
      <div>
        <button onClick={addMassage}>Add massage</button>
      </div>
    </div>)
};

export default WriteNewMassage;