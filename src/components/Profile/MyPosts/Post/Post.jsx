import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div>
      <div className={s.item}>
        <img className={s.aaa} src="https://i.etsystatic.com/6919397/r/il/8f152c/1345370580/il_fullxfull.1345370580_qsld.jpg" alt="Ava Post" />
        {props.message}
        <div>
          <span>like</span> {props.likeCount}
        </div>
      </div>

    </div>
  );
};

export default Post;
