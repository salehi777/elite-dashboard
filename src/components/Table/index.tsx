import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import BaseTable from "./BaseTable";
import { TableProps, SortObject } from "./types";
import Pagination from "./Pagination";

export default function Table({
  name,
  api,
  beforeSend,
  afterReceive,
  ...props
}: TableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [sort, setSort] = useState<SortObject>({
    type: searchParams.get("sort_type") || undefined,
    by: searchParams.get("sort_by") || undefined,
  });

  const { data, isLoading, isError, error, ...query } = useQuery(
    [name, page, sort.type, sort.by],
    () => api({ page, sort_type: sort.type, sort_by: sort.by })
  );

  return (
    <div>
      <BaseTable
        data={data}
        isLoading={isLoading}
        sort={sort}
        setSort={(newSort) => {
          setSearchParams({
            page: String(page),
            sort_type: newSort.type || "",
            sort_by: newSort.by || "",
          });
          setSort(newSort);
        }}
        {...props}
      />

      <div className="my-6 flex justify-center">
        <Pagination
          currentPage={page}
          totalCount={data?.total}
          pageSize={data?.per_page}
          onPageChange={(newPage) => {
            setSearchParams({
              page: String(newPage),
              sort_type: sort.type || "",
              sort_by: sort.by || "",
            });
            setPage(newPage);
          }}
        />
      </div>
    </div>
  );
}
