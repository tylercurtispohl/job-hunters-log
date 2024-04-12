"use client";

import { JobsTableRow } from "@/app/types";
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
import { useRouter } from "next/navigation";
import { Key } from "react";

const tableColumns = [
  {
    key: "jobId",
    label: "ID",
  },
  {
    key: "company",
    label: "Company",
  },
  {
    key: "position",
    label: "Position",
  },
  {
    key: "appliedDate",
    label: "Applied On",
  },
  {
    key: "lastEvent",
    label: "Last Event",
  },
  {
    key: "lastEventDate",
    label: "Last Event Date",
  },
];

const sortItems = ({
  items,
  sortDescriptor,
}: {
  items: JobsTableRow[];
  sortDescriptor: SortDescriptor;
}) => {
  let sortedItems = sortDescriptor.column
    ? sortBy(items, (i) => i[sortDescriptor.column! as keyof JobsTableRow])
    : items;

  if (sortDescriptor.direction === "descending") {
    sortedItems = sortedItems.reverse();
  }

  return sortedItems;
};

export const JobsTable = ({ rows }: { rows: JobsTableRow[] }) => {
  const router = useRouter();

  const list = useAsyncList<JobsTableRow>({
    initialSortDescriptor: {
      column: "appliedDate",
      direction: "descending",
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
      aria-label="Job application table"
      classNames={{
        wrapper: [""],
      }}
      isStriped
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      selectionBehavior="replace"
      selectionMode="multiple"
      onRowAction={(key) => {
        router.push(`/jobs/${key}`);
      }}
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
          <TableRow key={item.jobId}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
