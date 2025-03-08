/*
  Warnings:

  - You are about to drop the column `doi` on the `Arxiv_Paper` table. All the data in the column will be lost.
  - You are about to drop the column `doi` on the `Weekly_Paper` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Arxiv_Paper_doi_key";

-- DropIndex
DROP INDEX "Weekly_Paper_doi_key";

-- AlterTable
ALTER TABLE "Arxiv_Paper" DROP COLUMN "doi";

-- AlterTable
ALTER TABLE "Weekly_Paper" DROP COLUMN "doi";
