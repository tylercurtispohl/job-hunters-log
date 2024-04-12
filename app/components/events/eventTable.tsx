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
import { useAsyncList } from "@react-stately/data";
import type { SortDescriptor } from "@nextui-org/react";
import { sortBy } from "lodash";

const tableColumns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "date",
    label: "Date",
  },
];

const sortItems = ({
  items,
  sortDescriptor,
}: {
  items: EventTableRow[];
  sortDescriptor: SortDescriptor;
}) => {
  let sortedItems = sortDescriptor.column
    ? sortBy(items, (i) => i[sortDescriptor.column! as keyof EventTableRow])
    : items;

  if (sortDescriptor.direction === "descending") {
    sortedItems = sortedItems.reverse();
  }

  return sortedItems;
};

export const EventTable = ({ rows }: { rows: EventTableRow[] }) => {
  const list = useAsyncList<EventTableRow>({
    initialSortDescriptor: {
      column: "date",
      direction: "ascending",
    },
    async load({ sortDescriptor }) {
      return { items: sortItems({ items: rows, sortDescriptor }) };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: sortItems({ items, sortDescriptor }),
      };
    },
  });

  return (
    <Table
      aria-label="Job application event table"
      isStriped
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableHeader columns={tableColumns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={list.items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
