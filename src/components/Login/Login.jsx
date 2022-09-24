import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from "react-router-dom";
import s from '../common/FormsControls/FormsControls.module.css';

const LoginForm = ({ handleSubmit, error, captchaUrl, props = {} }) => {
  // что бы не писать props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field placeholder={"Email"} validate={[required]} name={"email"} component={Input} />
      </div>
      <div>
        <Field type={"password"} placeholder={"Password"} validate={[required]} name={"password"} component={Input} />
      </div>
      <div>
        <Field type={"checkbox"} name={"rememberMe"} component={Input} /> remember me
      </div>

      {captchaUrl && <img src={captchaUrl} alt="Captcha" />}
      {captchaUrl &&
        <div>
          <Field placeholder={"Symbols from image"} validate={[required]} name={"captcha"} component={Input} {...props}/>
        </div>
      }

      {error && <div className={s.formSummaryError}>
        {error}
      </div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  }

  if (props.isAuth) {
    return <Navigate to={"/profile"} />
  }

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
  </div>
}

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);