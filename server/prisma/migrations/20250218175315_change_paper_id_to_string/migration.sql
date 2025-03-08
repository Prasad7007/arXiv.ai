/*
  Warnings:

  - The primary key for the `Arxiv_Paper` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `paper_id` on the `Summary` table. All the data in the column will be lost.
  - Added the required column `query` to the `Summary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmarks" DROP CONSTRAINT "Bookmarks_paper_id_fkey";

-- DropForeignKey
ALTER TABLE "Summary" DROP CONSTRAINT "Summary_paper_id_fkey";

-- AlterTable
ALTER TABLE "Arxiv_Paper" DROP CONSTRAINT "Arxiv_Paper_pkey",
ALTER COLUMN "paper_id" DROP DEFAULT,
ALTER COLUMN "paper_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Arxiv_Paper_pkey" PRIMARY KEY ("paper_id");
DROP SEQUENCE "Arxiv_Paper_paper_id_seq";

-- AlterTable
ALTER TABLE "Bookmarks" ALTER COLUMN "paper_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Summary" DROP COLUMN "paper_id",
ADD COLUMN     "query" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "Arxiv_Paper"("paper_id") ON DELETE CASCADE ON UPDATE CASCADE;
