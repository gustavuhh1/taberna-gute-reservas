"use server";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ReservasPage = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <Card className="w-full bg-background mx-5 py-5">
        <CardHeader>
          <CardTitle>Minhas reservas</CardTitle>
          <CardDescription>Aqui você pode ver todas as suas reservas</CardDescription>
          <CardAction className="underline-offset-2 underline">
            Fazer nova reserva
          </CardAction>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default ReservasPage;
