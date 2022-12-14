import React, { FC, useState } from 'react';
import styles from './Pagination.module.css';
import cn from 'classnames';

type PaginationProps  = {
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  totalItemsCount: number
  portionSize?: number
}

let Pagination: FC<PaginationProps > = ({ currentPage, onPageChanged, totalItemsCount, portionSize = 15 }) => {

  let pagesCount = Math.ceil(totalItemsCount / portionSize);

  let pages: number[] = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return <div className={styles.selectedPageConteiner}>
    {portionNumber > 1 &&
      <button className={styles.btnPortionChange} onClick={() => { setPortionNumber(portionNumber - 1) }}></button>}

    {pages
      .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
      .map(p => {
        return <span className={cn({
          [styles.selectedPage]: currentPage === p
        }, styles.pageNumber)}
          key={p}
          onClick={(e) => {
            onPageChanged(p)
          }}>{p}</span>
      })}
    {portionCount > portionNumber &&
      <button className={styles.btnPortionChange + ' ' + styles.btnRight} onClick={() => { setPortionNumber(portionNumber + 1) }}></button>}
  </div>
}

export default Pagination;