import { DashboardDayCards } from "./components/dashboard-day-cards";
import { getDashboardDayCards } from "./components/get-day-cards";

const Dashboard = async () => {
  const { pessoasNoDia, reservasAtivas, reservasDoDia, reservasPendentes } =
    await getDashboardDayCards();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">{/* Filtros, data, etc */}</div>
      </div>

      {/* Cards de métricas principais */}
      <DashboardDayCards
        reservasDoDia={reservasDoDia}
        pessoasNoDia={pessoasNoDia}
        reservasAtivas={reservasAtivas}
        reservasPendentes={reservasPendentes}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Outros componentes do dashboard */}
      </div>
    </div>
  );
};

export default Dashboard;
