import { useState } from "react";
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
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
  Search,
  Package,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router";

export default function Store() {
  const [searchTerm, setSearchTerm] = useState("");

  // ستقوم لاحقًا بجلب البيانات الحقيقية من API
  const medicines = DataPharam as Medicine[];

  // تنسيق السعر بالعملة المحلية
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 2,
    }).format(price);
  };

  // عرض حالة المخزون كشارة ملونة
  const renderStockAlert = (status: string) => {
    const variants: Record<string, string> = {
      متوفر: "bg-green-100 text-green-800 hover:bg-green-100",
      منخفض: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      نفذ: "bg-red-100 text-red-800 hover:bg-red-100",
    };
    return (
      <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>
        {status}
      </Badge>
    );
  };

  // حساب إحصائيات سريعة
  const totalMedicines = medicines.length;
  const lowStockCount = medicines.filter(
    (m) => m.stockAlert === "قرب النفاد",
  ).length;
  const outOfStockCount = medicines.filter(
    (m) => m.stockAlert === "غير متاح",
  ).length;

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
      cell: ({ row }) => (
        <span className="font-mono">{row.original.quantity}</span>
      ),
    },
    {
      accessorKey: "price",
      header: "السعر",
      cell: ({ row }) => (
        <span className="font-mono">{formatPrice(row.original.price)}</span>
      ),
    },
    {
      accessorKey: "expiryDate",
      header: "تاريخ الانتهاء",
      cell: ({ row }) => {
        const date = new Date(row.original.expiryDate);
        return <span dir="ltr">{date.toLocaleDateString("ar-EG")}</span>;
      },
    },
    {
      accessorKey: "supplier",
      header: "المورد",
    },
    {
      accessorKey: "stockAlert",
      header: "حالة المخزون",
      cell: ({ row }) => renderStockAlert(row.original.stockAlert),
    },
    {
      id: "actions",
      header: "الإجراءات",
      cell: ({ row }) => {
        const medicine = row.original;

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
                  <Pencil className="ml-2 h-4 w-4" />
                  تعديل
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={() => {
                  // هنا يمكن إضافة منطق الحذف مع تأكيد
                  console.log("Delete", medicine.id);
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

  // تصفية البيانات بناءً على البحث (يمكن تطويرها لاحقًا)
  const filteredData = medicines.filter(
    (item) =>
      item.name.includes(searchTerm) ||
      item.category.includes(searchTerm) ||
      item.supplier.includes(searchTerm),
  );

  return (
    <div className="container mx-auto py-8 px-4 md:px-6" dir="rtl">
      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              إجمالي الأدوية
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMedicines}</div>
            <p className="text-xs text-muted-foreground">منتج مسجل</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">منخفض المخزون</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockCount}</div>
            <p className="text-xs text-muted-foreground">يحتاج إلى إعادة طلب</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              نفذ من المخزون
            </CardTitle>
            <DollarSign className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockCount}</div>
            <p className="text-xs text-muted-foreground">غير متوفر حاليًا</p>
          </CardContent>
        </Card>
      </div>

      {/* بطاقة الجدول مع البحث والإضافة */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">
              المخزون (الأدوية)
            </CardTitle>
            <CardDescription>
              إدارة وتتبع جميع الأدوية في المستودع
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-9 w-full sm:w-[250px]"
              />
            </div>
            <Link to="/store/create">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                إضافة دواء
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
