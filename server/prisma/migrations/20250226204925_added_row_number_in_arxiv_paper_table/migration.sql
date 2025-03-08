/*
  Warnings:

  - Added the required column `row_number` to the `Arxiv_Paper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Arxiv_Paper" ADD COLUMN     "row_number" INTEGER NOT NULL;
