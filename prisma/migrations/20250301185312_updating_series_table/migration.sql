/*
  Warnings:

  - You are about to drop the column `description` on the `series` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `series` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "series" DROP COLUMN "description",
DROP COLUMN "title";
