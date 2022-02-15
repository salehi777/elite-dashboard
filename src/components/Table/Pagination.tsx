import clsx from "clsx";
import { usePagination } from "./usePagination";
import { PaginationProps } from "./types";

import { ReactComponent as ArrowLeftIcon } from "assets/icons/Arrow-Left.svg";
import { ReactComponent as ArrowRightIcon } from "assets/icons/Arrow-Right.svg";

export default function Pagination({
  currentPage,
  totalCount,
  pageSize,
  siblingCount,
  onPageChange,
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
    siblingCount,
  });

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="flex space-x-1">
      <li
        className={clsx(
          "px-4 py-2 rounded-md bg-gray-200 flex items-center",
          currentPage === 1
            ? "pointer-events-none"
            : "hover:bg-primary-100 cursor-pointer"
        )}
        onClick={() => onPageChange?.(currentPage - 1)}
      >
        <ArrowLeftIcon className="w-2 h-3" />
      </li>
      {paginationRange.map((pageNumber) =>
        pageNumber === -1 ? (
          <span
            key={pageNumber}
            className="px-4 py-2 rounded-md bg-gray-200 font-bold"
          >
            ...
          </span>
        ) : (
          <li
            key={pageNumber}
            className={clsx(
              "px-4 py-2 rounded-md bg-gray-200 cursor-pointer hover:bg-primary-100",
              currentPage === pageNumber &&
                "bg-primary-500 hover:bg-primary-500 text-white"
            )}
            onClick={() => onPageChange?.(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      )}
      <li
        className={clsx(
          "px-4 py-2 rounded-md bg-gray-200 flex items-center",
          currentPage === lastPage
            ? "pointer-events-none"
            : "hover:bg-primary-100 cursor-pointer"
        )}
        onClick={() => onPageChange?.(currentPage + 1)}
      >
        <ArrowRightIcon className="w-2 h-3" />
      </li>
    </ul>
  );
}
