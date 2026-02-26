import DataTable from "@/components/ui/data-table";
import DataPharam from "@/dummy/data.json";
import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";

export default function Store() {
  const columns: ColumnDef<Medicine>[] = [
    {
      accessorKey: "name",
      header: "اسم المنتج",
    },
    {
      accessorKey: "category",
      header: "الفئة",
    },
    {
      accessorKey: "quantity",
      header: "الكمية",
    },
    {
      accessorKey: "price",
      header: "السعر",
    },
    {
      accessorKey: "expiryDate",
      header: "تاريخ الانتهاء",
    },
    {
      accessorKey: "supplier",
      header: "المورد",
    },
    {
      accessorKey: "stockAlert",
      header: "حالة المخزون",
    },
    {
      id: "actions",
      header: "الإجراءات",
      cell: ({ row }) => {
        const medicine = row.original;
        console.log(medicine);

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">فتح القائمة</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={`/store/${medicine.id}/update`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Pencil className="mr-2 h-4 w-4" />
                  تعديل
                </DropdownMenuItem>
              </Link>
              <Link to={`/store/create`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Plus className="mr-2 h-4 w-4" />
                  إنشاء جديد
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" className="cursor-pointer text-red-600 focus:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto flex items-center justify-center flex-col py-10">
      <h1 className="text-2xl font-bold">المخزون (الأدوية)</h1>
      <DataTable columns={columns} data={DataPharam as Medicine[]} />
    </div>
  );
}
