import { useEffect, useMemo, useState } from "react";
import TableSearch from "./TableSearch";
import { TableHeaderProps } from "./types";

export default function TableHeader({
  search,
  setSearch,
  showSearch,
  buttons,
}: TableHeaderProps) {
  return (
    <div className="flex justify-end">
      {showSearch && <TableSearch search={search} setSearch={setSearch} />}

      <div className="w-4" />

      {buttons}
    </div>
  );
}
