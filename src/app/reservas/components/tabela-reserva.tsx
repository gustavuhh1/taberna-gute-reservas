"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DogIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { StatusBadge } from "./status-badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Reserva } from "@/types/reserva";



interface Props {
  reservas: Reserva[];
}

export default function TabelaReservaClient({ reservas }: Props) {
  const [reservaSelecionada, setReservaSelecionada] = useState<Reserva | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const handleCancelarReserva = async (id: string) => {
    toast.promise(
      fetch(`/api/reservas/${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Erro ao cancelar reserva");
        router.refresh(); // atualiza a página após exclusão
      }),
      {
        loading: "Cancelando reserva...",
        success: "Reserva cancelada com sucesso!",
        error: "Erro ao cancelar reserva 😕",
      }
    );

    setReservaSelecionada(null);
    setOpenDialog(false);
  };

  if (reservas.length === 0) {
    return (
      <div className="flex justify-center items-center py-10 text-muted-foreground">
        Nenhuma reserva encontrada.
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table className="border border-border rounded-xl">
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Qtd. Pessoas</TableHead>
            <TableHead>
              <DogIcon />
            </TableHead>
            <TableHead>Observações</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservas.map((reserva) => (
            <TableRow  key={reserva.id}>
              <TableCell>
                {new Date(reserva.dataReserva).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>{reserva.quantidadePessoas}</TableCell>
              <TableCell className="pl-3">
                {reserva.possuiPet ? (
                  <Checkbox checked={true} />
                ) : (
                  <Checkbox checked={false} />
                )}
              </TableCell>
              <TableCell className=" flex max-w-[200px] max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words p-1 rounded-md">
                {reserva.observacoes || "-"}
              </TableCell>
              <TableCell>
                <StatusBadge status={reserva.status} />
              </TableCell>
              <TableCell className="text-center">
                {reserva.status !== "CANCELADO" && (
                  <Dialog open={openDialog}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setReservaSelecionada(reserva);
                          setOpenDialog(true);
                        }}
                      >
                        <Trash2Icon className="w-4 h-4 text-red-600 hover:text-red-800" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cancelar reserva</DialogTitle>
                        <DialogDescription>
                          Tem certeza que deseja cancelar esta reserva? Essa ação não pode
                          ser desfeita.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setReservaSelecionada(null);
                            setOpenDialog(false);
                          }}
                        >
                          Voltar
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleCancelarReserva(reserva.id)}
                        >
                          Confirmar cancelamento
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
