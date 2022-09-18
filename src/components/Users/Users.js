import Pagination from '../common/Pagination/Pagination';
import User from './User';
import styles from './Users.module.css'

let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
  return <div>
    <div className={styles.usersPagePagination}>
      <Pagination
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize} />
    </div>
    {
      users.map(u =>
        <User key={u.id}
          user={u}
          followingInProgress={props.followingInProgress}
          follow={props.follow}
          unfollow={props.unfollow} />)
    }
  </div>
}

export default Users;