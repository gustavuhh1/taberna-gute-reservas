import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface DashboardDayCards {
  reservasDoDia: number;
  pessoasNoDia: number;
  reservasPendentes: number;
  reservasAtivas: number;
}

export function DashboardDayCards({
  reservasDoDia,
  pessoasNoDia,
  reservasPendentes,
  reservasAtivas,
}: DashboardDayCards) {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-4 sm:grid-rows-3">
      {/* Card 1: Reservas do Dia */}
      <Card className="p-3 w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
          <CardTitle className="text-sm font-medium">Reservas do Dia</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{reservasDoDia ?? "tua mae é"}</div>
          <p className="text-xs text-muted-foreground">Agendadas para hoje</p>
          <div className="mt-2 text-xs flex gap-2 items-center">
            Quantidade de pessoas:
            <Badge variant="secondary" className="text-xs">
              {pessoasNoDia ?? 32}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Ativas no Momento */}
      <Card className="border-green-200 p-3 w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Ativas Agora</CardTitle>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-green-500" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{reservasAtivas}</div>
          <p className="text-xs text-muted-foreground">Reservas em andamento</p>
          <div className="mt-2">
            <Badge variant="outline" className="text-xs bg-green-50">
              Atualizado em tempo real
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Pendentes de Aprovação */}
      <Card className="border-amber-200 p-3 w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Aguardando Aprovação</CardTitle>
          <AlertCircle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{reservasPendentes}</div>
          <p className="text-xs text-muted-foreground">Reservas para revisar</p>
          <div className="mt-2">
            <button className="text-xs text-amber-600 hover:underline font-medium">
              Ver todas →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
