import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import DefoltUserPhoto from '../../../assets/images/elle.jpg';
import ProfileDataForm from './ProfileDataForm';
// import { saveProfile } from '../../../redux/profile-reducer';

const ProfileInfo = (props) => {

  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    props.saveProfile(formData).then(
      () => {
        setEditMode(false);
      }
    )
  }

  return (
    <div>
      <div className={s.description_block}>
        <img src={props.profile.photos.large || DefoltUserPhoto} className={s.mainPhoto} alt='AVA' />
        {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        {editMode
          ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
          : <ProfileData profile={props.profile}
            isOwner={props.isOwner}
            goToEditMode={() => { setEditMode(true) }} />
        }

        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return <div>
    {isOwner &&
      <div>
        <button onClick={goToEditMode}>Edit Profile</button>
      </div>
    }
    <div>
      <b>Full Name:</b> {profile.fullName}
    </div>
    <div>
      <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
    </div>
    {profile.lookingForAJob &&
      <div>
        <b>My professional skill:</b> {profile.lookingForAJobDescription}
      </div>
    }
    <div>
      <b>About me:</b> {profile.aboutMe}
    </div>
    <div>
      <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })}
    </div>
  </div>
}

const Contact = ({ contactTitle, contactValue }) => {
  return <div><i>{contactTitle}</i>: {contactValue}</div>
}

export default ProfileInfo;
