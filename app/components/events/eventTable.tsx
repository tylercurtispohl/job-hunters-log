"use client";

import { EventTableRow } from "@/app/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { DeleteEventButton } from "./deleteEventButton";

const tableColumns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "deleteAction",
    label: "",
  },
];

export const EventTable = ({
  jobId,
  rows,
}: {
  jobId: string;
  rows: EventTableRow[];
}) => {
  return (
    <Table aria-label="Job application event table" isStriped>
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
                {columnKey === "deleteAction" ? (
                  <DeleteEventButton eventId={item.id} jobId={jobId} />
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
