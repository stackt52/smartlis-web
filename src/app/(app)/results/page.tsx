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
  PlusCircledIcon,
  FileIcon,
} from "@radix-ui/react-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

type Result = {
  id: string;
  orderId: string;
  patientName: string;
  testName: string;
  result: string;
  status: "Awaiting Validation" | "Validated" | "Rejected";
  resultDate: string;
};

const data: Result[] = [
  {
    id: "RES-2024-001",
    orderId: "ORD-2024-001",
    patientName: "John Doe",
    testName: "Complete Blood Count",
    result: "See report",
    status: "Validated",
    resultDate: "2024-07-20",
  },
  {
    id: "RES-2024-002",
    orderId: "ORD-2024-002",
    patientName: "Jane Smith",
    testName: "Lipid Panel",
    result: "150 mg/dL",
    status: "Awaiting Validation",
    resultDate: "2024-07-21",
  },
  {
    id: "RES-2024-003",
    orderId: "ORD-2024-004",
    patientName: "Mary Johnson",
    testName: "Thyroid Panel",
    result: "Normal",
    status: "Validated",
    resultDate: "2024-07-19",
  },
  {
    id: "RES-2024-004",
    orderId: "ORD-2024-005",
    patientName: "David Williams",
    testName: "Urinalysis",
    result: "Trace protein",
    status: "Rejected",
    resultDate: "2024-07-22",
  },
];

const statusVariant = (status: Result["status"]) => {
  switch (status) {
    case "Awaiting Validation":
      return "secondary";
    case "Validated":
      return "default";
    case "Rejected":
      return "destructive";
    default:
      return "outline";
  }
};

export const columns: ColumnDef<Result>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Result ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("orderId")}</div>,
  },
  {
    accessorKey: "patientName",
    header: "Patient Name",
    cell: ({ row }) => <div>{row.getValue("patientName")}</div>,
  },
  {
    accessorKey: "testName",
    header: "Test Name",
    cell: ({ row }) => <div>{row.getValue("testName")}</div>,
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => <div>{row.getValue("result")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariant(row.getValue("status"))}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "resultDate",
    header: () => <div className="text-right">Result Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("resultDate"));
      const formatted = date.toLocaleDateString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const result = row.original;
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(result.id)}
            >
              Copy Result ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View result details</DropdownMenuItem>
            <DropdownMenuItem>Validate</DropdownMenuItem>
             <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ResultManagementPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Results & Validation</h1>
          <p className="text-muted-foreground">
            Enter, view, and validate test results.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">
            <FileIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Enter Result
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Result List</CardTitle>
          <CardDescription>
            A comprehensive list of all test results in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by Patient Name..."
              value={
                (table.getColumn("patientName")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("patientName")?.setFilterValue(event.target.value)
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
                        {column.id.replace(/([A-Z])/g, ' $1').trim()}
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
