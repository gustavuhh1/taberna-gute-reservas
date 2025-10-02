import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatDate } from "date-fns/format";
import prisma from "@/lib/prisma";
import { authClient } from "@/lib/auth-client";

const TabelaReserva = async () => {
  
  const session = await authClient.getSession();
  const reservas = await prisma.reserva.findMany({
    where: { userId: session.data?.user.id },
    select: {
      id: true,
      dataReserva: true,
      quantidadePessoas: true,
      status: true,
    },
    orderBy: { dataReserva: "desc" },
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Quantidade de pessoas</TableHead>
            <TableHead>Possui pet</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservas.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{formatDate(r.dataReserva, "dd/MM/yyyy")}</TableCell>
              <TableCell>{r.quantidadePessoas}</TableCell>
              <TableCell>{r.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TabelaReserva;
