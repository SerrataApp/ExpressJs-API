/*
  Warnings:

  - Added the required column `testField` to the `GameMode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameMode" ADD COLUMN     "testField" TEXT NOT NULL;
