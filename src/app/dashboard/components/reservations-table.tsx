import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  RowSelectionState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Reserva, StatusReserva } from "@/types/reserva";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Calendar, Clock10, User2 } from "lucide-react";
import { StatusBadge } from "@/app/reservas/components/status-badge";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  data: Reserva[] | undefined;
  onStatusChange: (ids: string[], novoStatus: StatusReserva) => void;
  onLoading?: boolean;
  onError?: boolean;
}

const getInitials = (name: string): string => {
  if (!name) return "??";

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  const firstInitial = words[0][0];
  const lastInitial = words[words.length - 1][0];

  return (firstInitial + lastInitial).toUpperCase();
};

export function ReservationsTable({ data, onStatusChange, onLoading, onError }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedStatus, setSelectedStatus] = useState<StatusReserva | undefined>(
    undefined
  );

  const columns: ColumnDef<Reserva>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "user.image",
      header: "",
      cell: (info) => {
        const imageUrl = info.getValue() as string | undefined;
        const userName = getInitials(info.row._valuesCache.user_name as string);
        return (
          <div className="flex items-center justify-center self-center">
            <Avatar className="h-10 w-10">
              <AvatarImage className="rounded-full" src={imageUrl} alt={userName} />
              <AvatarFallback className="w-8 h-8">{userName}</AvatarFallback>
            </Avatar>
          </div>
        );
      },
    },
    {
      accessorKey: "user.name",
      header: "Cliente",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "dataReserva",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data Reserva
            <ArrowUpDown />
          </Button>
        );
      },
      cell: (info) => {
        const data = info.getValue();
        const formatedDate = format(new Date(data as Date), "Pp", { locale: ptBR }).split(
          " "
        );
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar size={14} /> {formatedDate[0].replace(",", " ")}
            </div>
            <div className="flex items-center gap-2">
              <Clock10 size={14} /> {formatedDate[1]}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Criado Em",
      cell: (info) => {
        const data = info.getValue();
        const formatedDate = format(new Date(data as Date), "Pp", { locale: ptBR }).split(
          " "
        );
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar size={14} /> {formatedDate[0].replace(",", " ")}
            </div>
            <div className="flex items-center gap-2">
              <Clock10 size={14} /> {formatedDate[1]}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "quantidadePessoas",
      header: "Qtn Pessoas",
      cell: (info) => (
        <Input
          value={info.getValue() as number}
          type="number"
          readOnly
          className="flex w-12 "
        />
      ),
    },
    {
      accessorKey: "possuiPet",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Possui Pet
          </Button>
        );
      },
      cell: (info) => (
        <div className="flex items-center">
          <Checkbox checked={info.getValue() as boolean} />
        </div>
      ),
    },
    {
      accessorKey: "observacoes",
      header: "Observações",
      cell: (info) => info.getValue() || "-",
      maxSize: 300,
      size: 200,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const status = info.getValue() as StatusReserva;
        return <StatusBadge status={status} />;
      },
    },
  ];

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Passo 9.1: Função para mudar status em lote
  const handleMudarStatus = (novoStatus: StatusReserva) => {
    const linhasSelecionadas = table.getSelectedRowModel().rows;
    const ids = linhasSelecionadas.map((row) => row.original.id);
    console.log(ids);

    if (ids.length === 0) {
      alert("Selecione pelo menos uma reserva");
      return;
    }

    onStatusChange(ids, novoStatus);
    setRowSelection({}); // Limpar seleção após ação
  };

  const linhasSelecionadas = table.getSelectedRowModel().rows;
  const quantidadeSelecionada = linhasSelecionadas.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-md border w-full">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {onLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="inline-flex items-center justify-center gap-2">
                    <Spinner className="size-5" />
                    Carregando reservas...
                  </div>
                </TableCell>
              </TableRow>
            ) : onError ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Ocorreu um erro ao carregar as reservas.
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4 h-20">
        <div className="flex items-center space-x-4">
          {quantidadeSelecionada > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-3">
                <h3>{quantidadeSelecionada} selecionado(s)</h3>
                <Select
                  onValueChange={(value) => setSelectedStatus(value as StatusReserva)}
                  value={selectedStatus ? selectedStatus : undefined}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecionar Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="flex gap-2">
                      <SelectLabel>Selecionar Status</SelectLabel>
                      <SelectItem
                        className="bg-green-300 transition hover:bg-green-300 "
                        value={StatusReserva.ACEITO}
                      >
                        Aceitar
                      </SelectItem>
                      <SelectItem
                        className="bg-red-300 transition hover:bg-red-300 "
                        value={StatusReserva.CANCELADO}
                      >
                        Cancelar
                      </SelectItem>
                      <SelectItem
                        className="bg-blue-300 transition hover:bg-blue-300 "
                        value={StatusReserva.CONCLUIDO}
                      >
                        Concluir
                      </SelectItem>
                      <SelectItem
                        className="bg-yellow-300 transition hover:bg-yellow-300 "
                        value={StatusReserva.PENDENTE}
                      >
                        Pendente
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end self-end">
                {quantidadeSelecionada >= 3 ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="default" disabled={!selectedStatus}>
                        Alterar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Você está prestes a alterar o status de {quantidadeSelecionada}{" "}
                          reservas para {selectedStatus?.toLocaleLowerCase()}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleMudarStatus(selectedStatus!)}
                        >
                          Continuar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button
                    variant="default"
                    disabled={!selectedStatus}
                    onClick={() => handleMudarStatus(selectedStatus!)}
                  >
                    Alterar
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Voltar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
