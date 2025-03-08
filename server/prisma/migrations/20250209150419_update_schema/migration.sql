/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Search_History` table. All the data in the column will be lost.
  - Added the required column `date` to the `Search_History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Search_History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Search_History" DROP COLUMN "timestamp",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;
