import SupplierForm from "@/components/forms/supplier/supplierForm";
import { useParams } from "react-router";

export default function SupplierUpdate() {
  const { id } = useParams();
  return <SupplierForm id={id} />;
}
