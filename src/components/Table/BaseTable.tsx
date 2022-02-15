import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  Checkbox as CheckboxChakra,
  CheckboxProps,
  Skeleton,
} from "@chakra-ui/react";
import styles from "./table.module.css";
import { BaseTableProps, ISelectableItem } from "./types";

import { ReactComponent as SortIcon } from "assets/icons/Sort.svg";
import { ReactComponent as ArrowDownIcon } from "assets/icons/Arrow-Down-2.svg";
import { ReactComponent as ArrowUpIcon } from "assets/icons/Arrow-Up-2.svg";

const Checkbox = (props: CheckboxProps) => (
  <CheckboxChakra
    size="lg"
    colorScheme="primary"
    className={clsx("flex items-center justify-center", styles.checkbox)}
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
                "h-[50px] p-1 flex items-center justify-center text-sm font-normal",
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

      {(data || [1, 2, 3, 4].map((id) => ({ id }))).map((record) => {
        return (
          <Skeleton key={record.id} isLoaded={!isLoading}>
            <div
              className="grid my-2 transition bg-white hover:shadow-md rounded-xl"
              style={{ gridTemplateColumns: calcGridTemplateColumns }}
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
                const { title, render, ...rest } = column;
                return (
                  <div
                    key={title}
                    className="h-[70px] p-1 flex items-center justify-center overflow-hidden"
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
