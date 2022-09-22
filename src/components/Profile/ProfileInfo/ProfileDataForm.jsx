import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea, Input } from '../../common/FormsControls/FormsControls';
import s from './ProfileInfo.module.css';

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return <form onSubmit={handleSubmit}>
    <div>
      <button>Save Changes</button>
    </div>
    {error && <div className={s.formSummaryError}>
      {error}
    </div>}
    <div>
      <b>Full Name: </b>
      <Field placeholder={"Full Name"} name={"fullName"} validate={[]} component={Input} />
    </div>

    <div>
      <b>Looking for a job: </b>
      <Field placeholder={""} name={"lookingForAJob"} validate={[]} component={Input} type={"checkbox"} />
    </div>

    <div>
      <b>My professional skill: </b>
      <Field placeholder={"My professional skill"} name={"lookingForAJobDescription"} validate={[]} component={Textarea} />
    </div>

    <div>
      <b>About me: </b>
      <Field placeholder={"About me"} name={"aboutMe"} validate={[]} component={Textarea} />
    </div>
    <div>
      <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
        return <div key={key} className={s.contacts}>
          <i>{key}:
            <Field placeholder={key} name={"contacts." + key} validate={[]} component={Input} />
          </i>
        </div>
      })}
    </div>
  </form>
}

const ProfileDataFormReduxForm = reduxForm({
  form: 'edit-profile',
  enableReinitialize: true,
  destroyOnUnmount: false
})(ProfileDataForm)

export default ProfileDataFormReduxForm;