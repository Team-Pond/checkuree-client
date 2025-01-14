// types/TableColumn.ts
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export type TableColumn<T> = {
  header: string | React.ComponentType;
} & (
  | {
      accessor: keyof T | ((row: T) => string | number);
      cell?: React.ComponentType<{ row: T }>;
    }
  | {
      cell: React.ComponentType<{ row: T }>;
    }
) &
  Omit<ColumnDef<T, unknown>, "accessorKey" | "accessorFn" | "header" | "cell">;
