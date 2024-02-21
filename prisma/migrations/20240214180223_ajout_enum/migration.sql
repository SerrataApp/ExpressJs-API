/*
  Warnings:

  - The `lang` column on the `GameMode` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('unknow', 'fr', 'en');

-- AlterTable
ALTER TABLE "GameMode" DROP COLUMN "lang",
ADD COLUMN     "lang" "Lang" NOT NULL DEFAULT 'unknow';
