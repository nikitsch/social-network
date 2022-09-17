import Pagination from '../common/Pagination/Pagination';
import User from './User';

let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
  return <div>
    <Pagination currentPage={currentPage}
      onPageChanged={onPageChanged}
      totalUsersCount={totalUsersCount}
      pageSize={pageSize} />
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