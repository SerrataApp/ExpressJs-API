/*
  Warnings:

  - A unique constraint covering the columns `[ref]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ref` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "ref" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_ref_key" ON "Image"("ref");
