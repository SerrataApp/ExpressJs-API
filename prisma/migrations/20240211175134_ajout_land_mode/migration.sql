/*
  Warnings:

  - Added the required column `lang` to the `GameMode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameMode" ADD COLUMN     "lang" TEXT NOT NULL;
