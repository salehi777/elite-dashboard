import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  Checkbox as CheckboxChakra,
  CheckboxProps,
  Skeleton,
} from "@chakra-ui/react";
import { BaseTableProps, ISelectableItem } from "./types";

import { ReactComponent as SortIcon } from "assets/icons/Sort.svg";
import { ReactComponent as ArrowDownIcon } from "assets/icons/Arrow-Down-2.svg";
import { ReactComponent as ArrowUpIcon } from "assets/icons/Arrow-Up-2.svg";

const Checkbox = (props: CheckboxProps) => (
  <CheckboxChakra
    size="lg"
    colorScheme="primary"
    className="flex items-center justify-center"
    {...props}
  />
);

export default function BaseTable({
  data,
  isLoading,
  columns,
  gridTemplateColumns,
  sort,
  setSort,
  selectable,
  rowKey = "_id",
  onRowClick,
}: BaseTableProps) {
  const [selectableItem, setSelectableItem] = useState<ISelectableItem>({
    all: false,
    empty: true,
    records: [],
  });

  const calcGridTemplateColumns = useMemo(() => {
    if (selectable) return "50px " + gridTemplateColumns;
    else return gridTemplateColumns;
  }, []);

  const handleSelect = (records: any[]) => {
    const i = { all: false, empty: false };
    if (records.length === data?.length) i.all = true;
    else if (records.length === 0) i.empty = true;
    setSelectableItem({ ...i, records });
    selectable.onChange({ ...i, records });
  };

  const handleSort = (sortKey: string | undefined) => {
    if (sort.by === sortKey) {
      if (sort.type === "asc") {
        setSort({ type: "desc", by: sortKey });
      } else {
        setSort({ type: undefined, by: undefined });
      }
    } else if (sortKey) {
      setSort({ type: "asc", by: sortKey });
    }
  };

  return (
    <div>
      <div
        className="grid"
        style={{ gridTemplateColumns: calcGridTemplateColumns }}
      >
        {selectable && (
          <Checkbox
            isChecked={!selectableItem.empty}
            isIndeterminate={!selectableItem.all && !selectableItem.empty}
            onChange={(e) => {
              if (selectableItem.all) handleSelect([]);
              else handleSelect(data || []);
            }}
          />
        )}
        {columns.map((column) => {
          const { key, title, sortKey, ...rest } = column;
          return (
            <div
              key={key}
              className={clsx(
                "h-[50px] p-1 flex items-center text-sm font-normal",
                sortKey && "cursor-pointer"
              )}
              onClick={() => handleSort(sortKey)}
            >
              {title}
              {sortKey &&
                (sort.by !== sortKey ? (
                  <i>
                    &nbsp;
                    <SortIcon className="w-3" />
                  </i>
                ) : sort.type === "asc" ? (
                  <i>
                    &nbsp;
                    <ArrowUpIcon className="w-3" />
                  </i>
                ) : (
                  <i>
                    &nbsp;
                    <ArrowDownIcon className="w-3" />
                  </i>
                ))}
            </div>
          );
        })}
      </div>

      {(
        data || (isLoading ? [1, 2, 3, 4] : []).map((i) => ({ [rowKey]: i }))
      ).map((record) => {
        return (
          <Skeleton key={record[rowKey]} isLoaded={!isLoading}>
            <div
              className={clsx(
                "grid my-2 transition bg-white hover:shadow-md rounded-xl",
                onRowClick && "cursor-pointer"
              )}
              style={{ gridTemplateColumns: calcGridTemplateColumns }}
              onClick={() => onRowClick?.(record)}
            >
              {selectable && (
                <Checkbox
                  isChecked={selectableItem.records.includes(record)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleSelect([...selectableItem.records, record]);
                    } else {
                      handleSelect(
                        selectableItem.records.filter((item) => item !== record)
                      );
                    }
                  }}
                />
              )}
              {columns.map((column) => {
                const { key, title, render, className, ...rest } = column;
                return (
                  <div
                    key={key}
                    className={clsx(
                      "h-[70px] p-1 flex items-center overflow-hidden",
                      className
                    )}
                  >
                    {render(record)}
                  </div>
                );
              })}
            </div>
          </Skeleton>
        );
      })}
    </div>
  );
}
