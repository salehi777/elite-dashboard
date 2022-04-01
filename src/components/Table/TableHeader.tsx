import TableSearch from "./TableSearch";
import { TableHeaderProps } from "./types";

export default function TableHeader({
  search,
  setSearch,
  showSearch,
  buttons,
}: TableHeaderProps) {
  return (
    <div className="flex flex-col justify-end md:flex-row">
      <div className="mb-4 md:mb-0 md:mr-4">
        {showSearch && <TableSearch search={search} setSearch={setSearch} />}
      </div>

      {buttons}
    </div>
  );
}
