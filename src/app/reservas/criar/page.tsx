"use client";

import {
  useQueryState,
  parseAsBoolean,
  parseAsInteger,
  parseAsIndex,
  parseAsIsoDateTime,
} from "nuqs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  DogIcon,
  XIcon,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { json } from "zod";

export default function FormsReserva() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useQueryState("step", parseAsIndex.withDefault(1));
  const [pessoas, setPessoas] = useQueryState("pessoas", parseAsInteger.withDefault(1));
  const [dateTime, setDateTime] = useQueryState("date", parseAsIsoDateTime);
  const [hora, setHora] = useState("");
  const [data, setData] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useQueryState("notes", { defaultValue: "" });
  const [pets, setPets] = useQueryState("pets", parseAsBoolean.withDefault(false));

  const progressValue = (step / 5) * 100;

  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      toast.error("Realize seu cadastro para marcar reservas 😁!");
      router.replace("/authentication");
    }
  }, [session, router]);

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const resetAll = () => {
    // limpando: definir defaults (nuqs vai refletir na URL)
    setStep(1);
    setPessoas(2);
    setDateTime(null);
    setData(undefined);
    setHora("");
    setNotes("");
    setPets(false);
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session?.user.id,
        dataReserva: dateTime,
        quantidadePessoas: pessoas,
        possuiPet: pets,
        observacoes: notes,
      }),
    });
    if (!res.ok) {
      toast.error("Erro ao criar reserva!");
      return;
    }
    setStep(5)
    router.replace("/reservas");
    toast.success("Reserva criada com sucesso!");
  };

  return (
    <div className="flex flex-col p-4 min-h-[calc(100vh-86px)] ">
      <h1 className="font-semibold text-2xl text-center">Fazer nova reserva</h1>
      <Card className="border-neutral-700 mt-20 flex">
        <CardHeader className="p-6">
          <p className="text-center font-light text-sm">{step} de 5</p>
          <Progress value={progressValue} max={4} />
          {step === 4 && (
            <>
              <h3 className="text-2xl text-center pt-5 ">Resumo reserva</h3>
              <Separator />
            </>
          )}
        </CardHeader>
        <CardContent className="p-6">
          {/* Quantidade de Pessoas */}
          {step === 1 && (
            <div className="space-y-4 flex flex-col">
              <div className="pb-10 gap-3 grid">
                <Label>Quantidade de pessoas</Label>
                <Input
                  type="number"
                  min={1}
                  value={String(pessoas)}
                  onChange={(e) => setPessoas(Number(e.target.value))}
                  placeholder="Ex: 2"
                />
              </div>
              <div className="flex justify-between gap-2">
                <Link href={"/reservas"}>
                  <Button variant="destructive" className="bg-red-700">
                    <XIcon /> Cancelar
                  </Button>
                </Link>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    if (pessoas < 1) {
                      toast.error("Selecione um valor válido de pessoas");
                    } else {
                      next();
                    }
                  }}
                >
                  Próximo <ArrowRightIcon />
                </Button>
              </div>
            </div>
          )}

          {/* Data e hora */}
          {step === 2 && (
            <div className="flex flex-col space-y-5 ">
              <p>Selecione o dia da reserva</p>
              <div className="grid gap-4 pb-10">
                <div className="flex flex-col gap-3 w-full">
                  <Label htmlFor="date-picker" className="px-1">
                    Data
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker"
                        className="w-full justify-between font-normal"
                      >
                        {data
                          ? format(data, "d/MM/yyyy", { locale: ptBR })
                          : "Selecione a data"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={data}
                        captionLayout="dropdown"
                        locale={ptBR}
                        onSelect={(dateSelecionada) => {
                          if (dateSelecionada) setData(dateSelecionada);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="w-full grid gap-3">
                  <Label htmlFor="time-picker" className="px-1">
                    Hora
                  </Label>
                  <Select
                    onValueChange={(valor) => {
                      setHora(valor);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a hora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="11:30">11:30</SelectItem>
                        <SelectItem value="12:00">12:00</SelectItem>
                        <SelectItem value="12:30">12:30</SelectItem>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="13:30">13:30</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={back}>
                  <ArrowLeftIcon /> Voltar
                </Button>
                <Button
                  onClick={
                    data && hora
                      ? () => {
                          const [h, m] = hora.split(":");
                          const novaData = new Date(data);
                          novaData.setHours(parseInt(h), parseInt(m), 0, 0);
                          next();
                          setDateTime(novaData);
                        }
                      : () => toast.error("Selecione uma data válida")
                  }
                >
                  Próximo <ArrowRightIcon />
                </Button>
              </div>
            </div>
          )}

          {/* Observações e Pets */}
          {step === 3 && (
            <div className="space-y-4">
              <Label>Observações</Label>
              <textarea
                className="w-full min-h-[120px] p-2 rounded  border border-neutral-700"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div className="flex gap-3 items-center">
                <Checkbox
                  className="border-2 border-zinc-700"
                  checked={pets}
                  onCheckedChange={(v) => setPets(Boolean(v))}
                />
                <span>Possui pets</span>
                <DogIcon strokeWidth={0.75} />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  <Button variant="ghost" onClick={back}>
                    <ArrowLeftIcon /> Voltar
                  </Button>
                </div>

                <div className="text-right">
                  <Button onClick={() => next()}>Próximo</Button>
                </div>
              </div>
            </div>
          )}

          {/* Resumo Final */}
          {(step === 4 || step===5) && (
            <div className="space-y-4  ">
              <div className="grid space-y-5">
                <div className="space-y-2">
                  <Label>Quantidade de pessoas</Label>
                  <Input className="" type="number" disabled value={pessoas} />
                </div>
                <div className="space-y-2">
                  <Label>Horário</Label>
                  <Input
                    className=""
                    type="text"
                    disabled
                    value={
                      dateTime
                        ? format(dateTime, "dd 'de' MMMM 'às' HH:mm", {
                            locale: ptBR,
                          })
                        : "Selecione a data novamente"
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Observações</Label>
                  <textarea
                    className="w-full min-h-[120px] p-2 rounded  border border-neutral-300 text-sm font-light"
                    value={notes.trim() ? notes : "Sem observações"}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    className="border-2 border-zinc-700"
                    checked={pets}
                    onCheckedChange={(v) => setPets(Boolean(v))}
                  />
                  <Label>
                    Possui Pets <DogIcon strokeWidth={0.8} />
                  </Label>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  <Button variant="ghost" onClick={back}>
                    <ArrowLeftIcon /> Voltar
                  </Button>
                  <Button variant="outline" size={"sm"} onClick={resetAll}>
                    Limpar campos
                  </Button>
                </div>

                <div className="text-right">
                  <Button onClick={() => handleSubmit()}>Enviar</Button>
                </div>
              </div>
            </div>
          )}

          {/* Loading do envio */}
        </CardContent>
      </Card>
    </div>
  );
}
