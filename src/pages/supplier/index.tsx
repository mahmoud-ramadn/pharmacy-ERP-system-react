import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "@/components/ui/data-table";
import Suppliers from "@/dummy/suppliers.json";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
  Search,
  Users,
  UserCheck,
  DollarSign,
  PackageX,
} from "lucide-react";

export default function Supplier() {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<string>("all");

  const totalSuppliers = Suppliers.length;
  const activeSuppliers = Suppliers.filter(
    (s) => (s as Supplier).status === "active" || !(s as Supplier).status
  ).length;
  const totalOutstanding = Suppliers.reduce(
    (sum, s) => sum + ((s as Supplier).outstandingBalance || 0),
    0
  );

  const filteredData = Suppliers.filter((item) => {
    const supplier = item as Supplier;
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (supplier.email?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      supplier.paymentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (supplier.address?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (supplier.notes?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesPaymentType =
      paymentTypeFilter === "all" || supplier.paymentType === paymentTypeFilter;

    return matchesSearch && matchesPaymentType;
  });

  const columns: ColumnDef<Supplier>[] = [
    {
      accessorKey: "name",
      header: "اسم المورد",
    },
    {
      accessorKey: "phone",
      header: "الهاتف",
    },
    {
      accessorKey: "email",
      header: "البريد الإلكتروني",
    },
    {
      accessorKey: "paymentType",
      header: "نوع الدفع",
    },
    {
      accessorKey: "address",
      header: "العنوان",
    },
    {
      accessorKey: "notes",
      header: "ملاحظات",
    },
    {
      accessorKey: "status",
      header: "الحالة",
      cell: ({ row }) => {
        const status = row.original.status || "active";
        return (
          <Badge
            variant={status === "active" ? "outline" : "secondary"}
            className="text-xs font-medium"
          >
            {status === "active" ? "نشط" : "غير نشط"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "lastOrder",
      header: "آخر طلب",
      cell: ({ row }) => {
        const lastOrder = row.original.lastOrder;
        return lastOrder
          ? new Date(lastOrder).toLocaleDateString("ar-EG")
          : "—";
      },
    },
    {
      id: "actions",
      header: "الإجراءات",
      cell: ({ row }) => {
        const supplier = row.original;
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
              <Link to={`/supplier/${supplier.id}/update`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Pencil className="ml-2 h-4 w-4" />
                  تعديل
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={() => {
                  console.log("Delete", supplier.id);
                }}
              >
                <Trash2 className="ml-2 h-4 w-4" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              إجمالي الموردين
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSuppliers}</div>
            <p className="text-xs text-muted-foreground">مورد مسجل</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              الموردين النشطين
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSuppliers}</div>
            <p className="text-xs text-muted-foreground">حاليًا</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              إجمالي المستحقات
            </CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalOutstanding.toLocaleString()} ر.س
            </div>
            <p className="text-xs text-muted-foreground">على الموردين</p>
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-md">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">الموردين</CardTitle>
            <CardDescription>إدارة وتتبع جميع الموردين</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Select
              value={paymentTypeFilter}
              onValueChange={setPaymentTypeFilter}
            >
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="نوع الدفع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="نقدي">نقدي</SelectItem>
                <SelectItem value="آجل">آجل</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-9 w-full sm:w-[250px]"
              />
            </div>
            <Link to="/supplier/create">
              <Button className="gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                إضافة مورد
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {filteredData.length === 0 ? (
            <div className="text-center py-10">
              <PackageX className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">
                لا يوجد موردين مطابقين
              </p>
            </div>
          ) : (
            <DataTable columns={columns} data={filteredData as Supplier[]} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
