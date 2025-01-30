"use client";

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableRow} from "./table";
import {Button} from "./button";
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,} from "./dropdown-menu";

interface DailyWeatherData {
    time: string[]; // Array of time values
    [key: string]: any[]; // Other keys with arrays of values
}

interface DataTableProps {
    data: DailyWeatherData; // Enforce the shape of the data
    itemsPerPage?: number;
}

export function DataTable({data, itemsPerPage = 5}: DataTableProps) {
    const timeArray = data.time ?? [];
    const metricKeys = Object.keys(data).filter((key) => key !== "time");
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

    // Prepare rows by combining time and metrics
    const rows = React.useMemo(() => {
        return timeArray.map((time, index) => {
            const row: Record<string, string | number> = {time};
            metricKeys.forEach((key) => {
                row[key] = data[key]?.[index] ?? "N/A"; // Fallback for missing data
            });
            return row;
        });
    }, [timeArray, metricKeys, data]);

    // Define columns dynamically based on metric keys
    const columns: ColumnDef<Record<string, string | number>>[] = [
        {accessorKey: "time", header: "Time"},
        ...metricKeys.map((key) => ({
            accessorKey: key,
            header: key.replace(/_/g, " ").toUpperCase(),
            cell: (info: any) => info.getValue() ?? "N/A", // Safe fallback for missing values
        })),
    ];

    // Create the table instance
    const table = useReactTable({
        data: rows,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        initialState: {
            pagination: {
                pageSize: itemsPerPage,
            },
        },
        state: {
            columnVisibility,
        },
    });

    return (
        <div className="overflow-x-auto w-4/5">
            <div className="rounded-md border">
                <Table>
                    <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableCell key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    </thead>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
