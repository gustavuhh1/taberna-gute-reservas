/*
  Warnings:

  - The values [ATIVO] on the enum `StatusReserva` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."StatusReserva_new" AS ENUM ('ACEITO', 'CONCLUIDO', 'PENDENTE', 'CANCELADO');
ALTER TABLE "public"."reservas" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."reservas" ALTER COLUMN "status" TYPE "public"."StatusReserva_new" USING ("status"::text::"public"."StatusReserva_new");
ALTER TYPE "public"."StatusReserva" RENAME TO "StatusReserva_old";
ALTER TYPE "public"."StatusReserva_new" RENAME TO "StatusReserva";
DROP TYPE "public"."StatusReserva_old";
ALTER TABLE "public"."reservas" ALTER COLUMN "status" SET DEFAULT 'PENDENTE';
COMMIT;
