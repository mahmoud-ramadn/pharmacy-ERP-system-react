import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  type Resolver,
  type SubmitHandler,
} from "react-hook-form";
import { toast } from "sonner";
import {
  Package,
  Tag,
  Hash,
  DollarSign,
  Calendar,
  Truck,
  AlertTriangle,
  Save,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router";
import { medicineSchema, type MedicineForm } from "./scham";

interface MedicineFormsProps {
  id?: string;
}

export default function MedicineForms({ id }: Readonly<MedicineFormsProps>) {
  const nav = useNavigate();
  const form = useForm<MedicineForm>({
    resolver: zodResolver(medicineSchema) as unknown as Resolver<MedicineForm>,
    defaultValues: {
      name: "",
      category: "",
      quantity: 0,
      price: 0,
      expiryDate: "",
      supplier: "",
      stockAlert: "",
    },
  });

  const onSubmit: SubmitHandler<MedicineForm> = (data) => {
    console.log("Medicine created:", data);
    toast.success("تم إضافة الدواء بنجاح", {
      description: `تم حفظ ${data.name} في قاعدة البيانات.`,
    });
    nav("/store");
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6" dir="rtl">
      <Card className="max-w-4xl mx-auto  border-0">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg border-b">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">
              {
                id ? "تعديل دواء" : "إضافة دواء جديد"
              }
            </CardTitle>
          </div>
          <CardDescription>
            أدخل معلومات الدواء بالكامل. الحقول الموسومة بـ{" "}
            <span className="text-red-500">*</span> مطلوبة.
          </CardDescription>
        </CardHeader>

        <form id="create-medicine-form" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="pt-6">
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* اسم المنتج */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel
                      htmlFor="medicine-name"
                      className="flex items-center gap-1"
                    >
                      <Package className="h-4 w-4 text-muted-foreground" />
                      اسم المنتج <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="medicine-name"
                      placeholder="مثال: أموكسيسيلين"
                      className={`h-10 ${fieldState.invalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    <FieldDescription>الاسم التجاري للدواء.</FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* الفئة */}
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel
                      htmlFor="medicine-category"
                      className="flex items-center gap-1"
                    >
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      الفئة <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="medicine-category"
                        className={`h-10 ${fieldState.invalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="مضادات حيوية">
                          مضادات حيوية
                        </SelectItem>
                        <SelectItem value="مسكنات">مسكنات</SelectItem>
                        <SelectItem value="فيتامينات">فيتامينات</SelectItem>
                        <SelectItem value="أدوية قلب">أدوية قلب</SelectItem>
                        <SelectItem value="أدوية سكري">أدوية سكري</SelectItem>
                        <SelectItem value="أخرى">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      صنّف الدواء ضمن الفئة المناسبة.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* الكمية والسعر في صف واحد */}
              <FieldSet className="md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Controller
                    name="quantity"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="space-y-1"
                      >
                        <FieldLabel
                          htmlFor="medicine-quantity"
                          className="flex items-center gap-1"
                        >
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          الكمية <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                          id="medicine-quantity"
                          type="number"
                          min={0}
                          className={`h-10 ${fieldState.invalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          placeholder="0"
                          aria-invalid={fieldState.invalid}
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="price"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="space-y-1"
                      >
                        <FieldLabel
                          htmlFor="medicine-price"
                          className="flex items-center gap-1"
                        >
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          السعر (ج.م) <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                          id="medicine-price"
                          type="number"
                          min={0}
                          step="0.01"
                          className={`h-10 ${fieldState.invalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          placeholder="0.00"
                          aria-invalid={fieldState.invalid}
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </FieldSet>
              <Controller
                name="expiryDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel
                      htmlFor="medicine-expiry"
                      className="flex items-center gap-1"
                    >
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      تاريخ الانتهاء <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="medicine-expiry"
                      type="date"
                      className={`h-10 ${fieldState.invalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    <FieldDescription>
                      يجب أن يكون التاريخ في المستقبل.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="supplier"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel
                      htmlFor="medicine-supplier"
                      className="flex items-center gap-1"
                    >
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      المورد <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="medicine-supplier"
                      placeholder="مثال: شركة النيل للأدوية"
                      className={`h-10 ${fieldState.invalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    <FieldDescription>
                      اسم الشركة أو المورد المسؤول.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* حالة المخزون */}
              <Controller
                name="stockAlert"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1 md:col-span-2"
                  >
                    <FieldLabel
                      htmlFor="medicine-stock"
                      className="flex items-center gap-1"
                    >
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      حالة المخزون <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="medicine-stock"
                        className={`h-10 ${fieldState.invalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="اختر الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="متوفر">متوفر</SelectItem>
                        <SelectItem value="منخفض">منخفض</SelectItem>
                        <SelectItem value="نفذ">نفذ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      الحالة الحالية لمخزون هذا الدواء.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex justify-end gap-2 border-t p-6">
            <Button
              type="submit"
              form="create-medicine-form"
              className="h-10 gap-2"
            >
              <Save className="h-4 w-4" />
                    {
                      id ? "تعديل الدواء" : "إضافة الدواء"
                    }
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => nav("/store")}
              className="h-10 gap-2"
            >
              <X className="h-4 w-4" />
              إلغاء
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
