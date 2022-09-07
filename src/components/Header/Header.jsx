import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return <header className={s.header}>
    <NavLink to=''>
      <img src="https://zeplin.io/static/favicon-256x256.png" alt="Fon" />
    </NavLink>
    <div className={s.loginBlock}>
      {props.isAuth
        ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
        : <NavLink to={'/login'}>Login</NavLink>
      }
      {/* <span>{props.email}</span> */}
    </div>
  </header>;
}

export default Header;