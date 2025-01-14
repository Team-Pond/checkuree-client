import "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";
declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    textAlign: "text-center" | "text-left" | "text-right";
  }
}
