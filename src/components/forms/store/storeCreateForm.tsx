import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreateMedicine() {
  const nav = useNavigate();
  const form = useForm<MedicineForm>({
    resolver: zodResolver(medicineSchema),
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

  function onSubmit(data: MedicineForm) {
    // Replace with your actual API call
    console.log(data);
    toast.success("تم إضافة المنتج بنجاح!", {
      description: data.name,
      position: "bottom-right",
    });
    nav("/store");
  }

  return (
    <div className="container mx-auto py-10 " dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-center ">إضافة دواء جديد</h1>

      <form
        id="create-medicine-form"
        className="w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup className=" w-full grid  md:grid-cols-2 grid-cols-1  items-start  ">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="medicine-name">اسم المنتج</FieldLabel>
                <Input
                  className="h-10"
                  id="medicine-name"
                  placeholder="مثال: أموكسيسيلين"
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

          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="medicine-category">الفئة</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="medicine-category"
                    className="!h-10"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="مضادات حيوية">مضادات حيوية</SelectItem>
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
          <FieldSet>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="quantity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="medicine-quantity">الكمية</FieldLabel>
                    <Input
                      id="medicine-quantity"
                      type="number"
                      min={0}
                      className="h-10"
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="medicine-price">
                      السعر (ج.م)
                    </FieldLabel>
                    <Input
                      id="medicine-price"
                      type="number"
                      min={0}
                      className="h-10"
                      step="0.01"
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
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="medicine-expiry">
                  تاريخ الانتهاء
                </FieldLabel>
                <Input
                  id="medicine-expiry"
                  type="date"
                  className="h-10"
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
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="medicine-supplier">المورد</FieldLabel>
                <Input
                  id="medicine-supplier"
                  placeholder="مثال: شركة النيل للأدوية"
                  className="h-10"
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

          <Controller
            name="stockAlert"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="medicine-stock">حالة المخزون</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="medicine-stock"
                    className="!h-10"
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
      </form>

      <div className="flex justify-end gap-2">
        <Button type="submit" form="create-medicine-form" className="h-10">
          إضافة الدواء
        </Button>
        <Button type="button" variant="outline" onClick={() => nav("/store")} className="h-10">
          إلغاء
        </Button>
      </div>
    </div>
  );
}
