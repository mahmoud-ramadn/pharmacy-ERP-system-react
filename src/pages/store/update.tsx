import MedicineForms from "@/components/forms/store/storeCreateForm";
import { useParams } from "react-router-dom";

export default function Update() {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  return <MedicineForms id={id || ""} />;
}
