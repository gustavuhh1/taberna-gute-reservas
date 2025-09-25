-- CreateEnum
CREATE TYPE "public"."StatusReserva" AS ENUM ('ATIVO', 'CONCLUIDO', 'PENDENTE', 'CANCELADO');

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "role" TEXT;

-- CreateTable
CREATE TABLE "public"."reservas" (
    "id" TEXT NOT NULL,
    "dataReserva" TIMESTAMP(3) NOT NULL,
    "quantidadePessoas" INTEGER NOT NULL,
    "possuiPet" BOOLEAN NOT NULL DEFAULT false,
    "observacoes" TEXT,
    "status" "public"."StatusReserva" NOT NULL DEFAULT 'ATIVO',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."reservas" ADD CONSTRAINT "reservas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
