interface UserResumo {
  id: string;
  nome: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
}

export interface Reserva {
  id: string;
  dataReserva: Date;
  quantidadePessoas: number;
  possuiPet: boolean;
  observacoes: string | null;
  status: StatusReserva;
  user: UserResumo | null
}

export enum StatusReserva {
  ACEITO = "ACEITO",
  CONCLUIDO = "CONCLUIDO",
  PENDENTE = "PENDENTE",
  CANCELADO = "CANCELADO",
}