import { NavLink } from 'react-router-dom';
import styles from './User.module.css'
import DefoltUserPhoto from '../../assets/images/elle.jpg'

let User = ({ user, followingInProgress, follow, unfollow }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={'./../profile/' + user.id}>
            <img src={user.photos.small != null ? user.photos.small : DefoltUserPhoto} className={styles.userPhoto} alt='userPhoto' />
          </NavLink>
        </div>
        <div>
          {user.followed
            ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
              unfollow(user.id);
            }}>Unfollow</button>
            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
              follow(user.id);
            }}>Follow</button>}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{'user.location.country'}</div>
          <div>{'user.location.city'}</div>
        </span>
      </span>
    </div>)
}

export default User;