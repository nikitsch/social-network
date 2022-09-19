import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import DefoltUserPhoto from '../../../assets/images/elle.jpg';

const ProfileInfo = (props) => {

  if (!props.profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  return (
    <div>
      {/* <div>
        <img className={s.fon} src="https://buyoncdn.ru/preset/3477835112/pages_original/a6/37/b5/a637b5d9b0cb6f2b9f3675c38b3d32a5728956b1.jpg" alt="Fon" />
      </div> */}
      <div className={s.description_block}>
        <img src={props.profile.photos.large || DefoltUserPhoto} className={s.mainPhoto} alt='AVA' />
        {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        <div>{`About me: ${props.profile.aboutMe}`}</div>
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
        {/* https://yt3.ggpht.com/ytc/AKedOLTlGVLrXzgZDwItF-m8Tux0NF5II9C-TIa6HgIalg=s900-c-k-c0x00ffffff-no-rj */}
      </div>
    </div>
  );
};
export default ProfileInfo;
