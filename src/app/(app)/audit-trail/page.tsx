"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  FileIcon,
} from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AuditLog = {
  id: string;
  user: {
    name: string;
    email: string;
  };
  action: string;
  details: string;
  timestamp: string;
};

const data: AuditLog[] = [
  {
    id: "EVT-001",
    user: { name: "Admin User", email: "admin@smartlis.com" },
    action: "User Login",
    details: "User admin@smartlis.com logged in successfully.",
    timestamp: "2024-07-22T10:00:00Z",
  },
  {
    id: "EVT-002",
    user: { name: "Jane Technician", email: "jane.t@smartlis.com" },
    action: "Sample Registration",
    details: "Sample SMP-2024-006 registered for patient Sarah Brown.",
    timestamp: "2024-07-22T09:45:12Z",
  },
  {
    id: "EVT-003",
    user: { name: "John Supervisor", email: "john.s@smartlis.com" },
    action: "Result Validation",
    details: "Result RES-2024-001 for order ORD-2024-001 was validated.",
    timestamp: "2024-07-22T09:32:05Z",
  },
  {
    id: "EVT-004",
    user: { name: "Admin User", email: "admin@smartlis.com" },
    action: "User Deactivation",
    details: "User Robert Technician (USR-004) was deactivated.",
    timestamp: "2024-07-22T08:15:30Z",
  },
  {
    id: "EVT-005",
    user: { name: "John Supervisor", email: "john.s@smartlis.com" },
    action: "Instrument Maintenance",
    details: "Scheduled maintenance for Cobas 8000 (CHEM-A1).",
    timestamp: "2024-07-22T08:05:00Z",
  },
];

export const columns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: "id",
    header: "Event ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.getValue("user") as AuditLog["user"];
      const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("");
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={`https://placehold.co/100x100.png?text=${initials}`}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <div className="font-medium">{user.name}</div>
            <div className="text-muted-foreground text-sm">{user.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <div>{row.getValue("action")}</div>,
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => <div className="max-w-xs truncate">{row.getValue("details")}</div>,
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Timestamp
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("timestamp"));
      const formatted = date.toLocaleString();
      return (
        <div className="font-medium" suppressHydrationWarning>
          {formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View event details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function AuditTrailPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Trail</h1>
          <p className="text-muted-foreground">
            A chronological record of system activities.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">
            <FileIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Event Logs</CardTitle>
          <CardDescription>
            A detailed log of all actions performed in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by action or details..."
              value={
                (table.getColumn("action")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("action")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id.replace(/([A-Z])/g, " $1").trim()}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
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
        </CardContent>
      </Card>
    </div>
  );
}
