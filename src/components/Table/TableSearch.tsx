import React, { useMemo, useState } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import debounce from "lodash.debounce";

import { ReactComponent as SearchIcon } from "assets/icons/Search.svg";

type TableSearchProps = {
  search: string;
  setSearch: (search: string) => void;
};

export default function TableSearch({ search, setSearch }: TableSearchProps) {
  const handleSearch = useMemo(() => {
    const loadOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };
    return debounce(loadOptions, 1000);
  }, []);

  return (
    <InputGroup className="!w-[230px]">
      <Input
        defaultValue={search}
        placeholder="Search"
        className="!bg-white !rounded-xl !border-0"
        onChange={handleSearch}
      />
      <InputRightElement children={<SearchIcon />} />
    </InputGroup>
  );
}
