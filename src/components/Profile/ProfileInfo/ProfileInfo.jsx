import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {

  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div>
      <div>
        <img className={s.fon} src="https://buyoncdn.ru/preset/3477835112/pages_original/a6/37/b5/a637b5d9b0cb6f2b9f3675c38b3d32a5728956b1.jpg" alt="Fon" />
      </div>
      <div className={s.description_block}>
        <img src={props.profile.photos.large} alt='AVA' />
        <div>{`Status: ${props.profile.aboutMe}`}</div>
        ava+descriptions
        {/* https://yt3.ggpht.com/ytc/AKedOLTlGVLrXzgZDwItF-m8Tux0NF5II9C-TIa6HgIalg=s900-c-k-c0x00ffffff-no-rj */}
      </div>
    </div>
  );
};
export default ProfileInfo;
