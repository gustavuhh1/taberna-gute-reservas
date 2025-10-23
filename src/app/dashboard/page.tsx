"use client";

import { authClient } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Reserva, StatusReserva } from "@/types/reserva";
import { ReservationsTable } from "./components/reservations-table";
import { getReserves, updateStatus } from "./components/actions-reserve";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const Dashboard = () => {
  const { data: session } = authClient.useSession();

  const isAdmin = session?.user.role === "admin";

  const queryClient = useQueryClient();

  const queryReservas = useQuery<Reserva[]>({
    queryKey: ["reservas"],
    queryFn: async () => getReserves(),
    staleTime: 30_000,
  });

  const { mutateAsync: updateStatusAsync } = useMutation({
    mutationKey: ["atualizar-status-reserva"],
    mutationFn: async (vars: { ids: string[]; novoStatus: StatusReserva }) =>
      updateStatus(vars.ids, vars.novoStatus),
    onMutate: async ({ ids, novoStatus }) => {
      console.log("Aplicando atualização otimista...");
      await queryClient.cancelQueries({ queryKey: ["reservas"] });

      const previousReservas = queryClient.getQueryData<Reserva[]>(["reservas"]);

      if (previousReservas) {
        queryClient.setQueryData<Reserva[]>(["reservas"], (old) =>
          // Atualiza o status das reservas localmente
          (old ?? []).map((r) => (ids.includes(r.id) ? { ...r, status: novoStatus } : r))
        );
      }

      // Retorna contexto para usar em onError/onSuccess
      return { previousReservas };
    },
    onSuccess: () => {
      console.log("Requisição bem-sucedida, sincronizando com dados do servidor...");
      toast.success("Status das reservas atualizado com sucesso!");
    },
    onError: (error, variables, context) => {
      console.error(
        `Erro ao atualizar os status: [${variables.ids}], fazendo rollback...`,
        error
      );

      // Reverte para o estado anterior usando o contexto de onMutate
      if (context?.previousReservas) {
        queryClient.setQueryData<Reserva[]>(["reservas"], context.previousReservas);
      }

      toast.error("Erro ao atualizar status das reservas. Tente novamente.");
    },
  });

  // const { pessoasNoDia, reservasAtivas, reservasDoDia, reservasPendentes } =
  //   await getDashboardDayCards();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 w-[calc(100vw-16rem)]">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">{/* Filtros, data, etc */}</div>
      </div>

      {/* Cards de métricas principais */}
      {/* <DashboardDayCards
        reservasDoDia={reservasDoDia}
        pessoasNoDia={pessoasNoDia}
        reservasAtivas={reservasAtivas}
        reservasPendentes={reservasPendentes}
      /> */}

      <div className="w-full">
        <ReservationsTable
          data={queryReservas.data ?? []}
          onStatusChange={(ids, novoStatus) => updateStatusAsync({ ids, novoStatus })}
          onLoading={queryReservas.isLoading}
          onError={queryReservas.isError}
        />
      </div>
    </div>
  );
};

export default Dashboard;
