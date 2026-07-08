/*
  Warnings:

  - You are about to drop the column `commodity_id` on the `predictions` table. All the data in the column will be lost.
  - Added the required column `commodity` to the `predictions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `predictions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "predictions" DROP CONSTRAINT "predictions_commodity_id_fkey";

-- AlterTable
ALTER TABLE "predictions" DROP COLUMN "commodity_id",
ADD COLUMN     "commodity" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
