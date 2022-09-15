import styles from './Pagination.module.css'

let Pagination = (currentPage, onPageChanged, totalUsersCount, pageSize) => {

  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return <div className={styles.selectedPageConteiner}>
    {pages.map(p => {
      return <span className={currentPage === p && styles.selectedPage}
        onClick={(e) => {
          onPageChanged(p)
        }}>{p}</span>
    })}
  </div>
}

export default Pagination;