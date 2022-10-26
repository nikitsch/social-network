import Pagination from '../common/Pagination/Pagination';
import User from './User';
import styles from './Users.module.css';
import { UserType } from '../../types/types';
import React, { FC } from 'react';

type UsersPropsType = {
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  totalUsersCount: number
  pageSize: number
  users: Array<UserType>
  followingInProgress: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

let Users: FC<UsersPropsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
  return <div>
    <div className={styles.usersPagePagination}>
      <Pagination
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        portionSize={pageSize} />
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