"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface PageChangeEvent {
  selected: number;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageChange = ({ selected }: PageChangeEvent): void => {
    onPageChange(selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={handlePageChange}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.button}
      nextClassName={css.button}
      previousLabel="Prev"
      nextLabel="Next"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
    />
  );
}
