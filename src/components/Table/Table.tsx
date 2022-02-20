import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import BaseTable from "./BaseTable";
import { TableProps, SortObject } from "./types";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";

export default function Table({
  name,
  api,
  beforeSend,
  afterReceive,
  reload,
  onRowClick,
  ...props
}: TableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState<SortObject>({
    type: searchParams.get("sort_type") || undefined,
    by: searchParams.get("sort_by") || undefined,
  });

  const { data, isLoading, refetch } = useQuery(
    [name, page, search, sort.type, sort.by],
    () => api({ page, search, sort_type: sort.type, sort_by: sort.by }),
    {
      onSuccess: (data) => {
        onRowClick?.(data?.items?.[0]);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [reload]);

  return (
    <div>
      <TableHeader
        search={search}
        setSearch={(newSearch) => {
          setSearchParams({
            page: String(page),
            search: newSearch,
            sort_type: sort.type || "",
            sort_by: sort.by || "",
          });
          setSearch(newSearch);
        }}
        {...props}
      />

      <BaseTable
        data={data?.items}
        isLoading={isLoading}
        sort={sort}
        setSort={(newSort) => {
          setSearchParams({
            page: String(page),
            search,
            sort_type: newSort.type || "",
            sort_by: newSort.by || "",
          });
          setSort(newSort);
        }}
        onRowClick={onRowClick}
        {...props}
      />

      <div className="flex justify-center my-6">
        <Pagination
          currentPage={page}
          totalCount={data?.total}
          pageSize={data?.per_page}
          onPageChange={(newPage) => {
            setSearchParams({
              page: String(newPage),
              search,
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
