import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: string }) {
  let color = "bg-gray-300";
  let text = "";

  switch (status) {
    case "ACEITO":
    case "CONCLUIDO":
      color = "bg-green-500/80";
      text = "Aprovado";
      break;
    case "PENDENTE":
      color = "bg-yellow-500/80";
      text = "Pendente";
      break;
    case "CANCELADO":
      color = "bg-red-500/80";
      text = "Cancelado";
      break;
  }

  return <Badge className={`${color} text-white px-3 py-1 rounded-full`}>{text}</Badge>;
}
