import { useMemo } from "react";
import Table from "components/Table";
import { IColumn } from "components/Table/types";
import { getTodos } from "services";
import { Avatar } from "components/Avatars";

export default function Invoice() {
  const columns = useMemo<IColumn[]>(
    () => [
      {
        key: "id",
        title: "ID",
        sortKey: "id",
        render: (record) => <div>{record.id}</div>,
      },
      {
        key: "avatar",
        title: "Avatar",
        render: (record) => (
          <div>
            <Avatar src={record.avatar} />
          </div>
        ),
      },
      {
        key: "email",
        title: "Email",
        sortKey: "email",
        render: (record) => <div>{record.email}</div>,
      },
      {
        key: "first_name",
        title: "First name",
        sortKey: "first_name",
        render: (record) => <div>{record.first_name}</div>,
      },
      {
        key: "last_name",
        title: "Last name",
        sortKey: "last_name",
        render: (record) => <div>{record.last_name}</div>,
      },
    ],
    []
  );

  const selectable = {
    onChange: (records: any) => {},
  };

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Invoice List</h1>

      <Table
        name="invoices"
        api={getTodos}
        beforeSend={(params) => {
          return {
            ...params,
            status: 1,
          };
        }}
        afterReceive={(res) => {}}
        columns={columns}
        gridTemplateColumns="50px 100px 1fr 1fr 1fr"
        selectable={selectable}
      />
    </div>
  );
}
