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
import { DeleteLinkButton } from "./deleteLinkButton";

const tableColumns = [
  {
    key: "linkAction",
    label: "",
  },
  {
    key: "url",
    label: "URL",
  },
  {
    key: "deleteAction",
    label: "",
  },
];

export const LinkTable = ({
  jobId,
  rows,
}: {
  jobId: string;
  rows: LinkTableRow[];
}) => {
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
                {(() => {
                  switch (columnKey) {
                    case "linkAction":
                      return (
                        <div className="">
                          <Button
                            as={Link}
                            href={item.url}
                            target="_blank"
                            size="sm"
                            variant="light"
                          >
                            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                          </Button>
                        </div>
                      );
                    case "url":
                      return (
                        <p className="w-full max-w-52 sm:max-w-96 lg:max-w-[768px] truncate">
                          {getKeyValue(item, columnKey)}
                        </p>
                      );
                    case "deleteAction":
                      return (
                        <DeleteLinkButton linkId={item.id} jobId={jobId} />
                      );
                    default:
                      return <></>;
                  }
                })()}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
