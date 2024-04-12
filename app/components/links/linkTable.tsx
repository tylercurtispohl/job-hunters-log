"use client";

import { LinkTableRow } from "@/app/types";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Link,
} from "@nextui-org/react";

const tableColumns = [
  {
    key: "actions",
    label: "",
  },
  {
    key: "url",
    label: "URL",
  },
];

export const LinkTable = ({ rows }: { rows: LinkTableRow[] }) => {
  return (
    <Table
      aria-label="Job application event table"
      isStriped
      //   classNames={{
      //     td: "text-nowrap max-w-36 text-ellipsis overflow-hidden",
      //   }}
    >
      <TableHeader columns={tableColumns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "actions" ? (
                  <div className=" w-0">
                    <Button as={Link} href={item.url} target="_blank" size="sm">
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-nowrap w-full text-ellipsis overflow-hidden">
                    {getKeyValue(item, columnKey)}
                  </div>
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
