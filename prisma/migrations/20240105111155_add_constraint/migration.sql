/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `GameMode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GameMode_name_key" ON "GameMode"("name");
