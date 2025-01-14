// CustomTable.tsx
"use client";

import React from "react";
import { flexRender } from "@tanstack/react-table";

interface CustomTableProps {
  table: ReturnType<
    typeof import("../../hook/useTable").useCustomTable<any>
  >["table"];
  enableSorting?: boolean;
  enableResizing?: boolean;
  className?: string;
}

export const CommonTable: React.FC<CustomTableProps> = ({
  table,
  enableSorting = false,
  enableResizing = false,
  className,
}) => {
  return (
    <table
      className={className}
      style={{ tableLayout: "fixed", width: "100%" }}
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const canSort = enableSorting && header.column.getCanSort();
              return (
                <th
                  key={header.id}
                  style={{
                    position: "relative",
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                    cursor: canSort ? "pointer" : "default",
                    width: header.column.getSize(),
                  }}
                  onClick={
                    canSort
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {enableSorting && (
                    <>
                      {header.column.getIsSorted() === "asc" && " 🔼"}
                      {header.column.getIsSorted() === "desc" && " 🔽"}
                    </>
                  )}
                  {enableResizing && header.column.getCanResize() && (
                    <div
                      // 타입스크립트 문제 해결을 위해 any 캐스팅 사용
                      {...((header as any).getResizerProps?.() || {})}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        height: "100%",
                        width: "5px",
                        cursor: "col-resize",
                        userSelect: "none",
                        touchAction: "none",
                      }}
                    />
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} style={{ borderBottom: "1px solid #eee" }}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  width: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommonTable;
