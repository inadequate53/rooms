/*
  Warnings:

  - The primary key for the `Booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `discipline` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `endAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `eventGroups` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `expectedParticipants` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `primaryRoom` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `reserveRoom` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `endsAt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainAuditoriumId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startsAt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `format` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EventFormat" AS ENUM ('ONSITE', 'ONLINE', 'LABS', 'OTHER');

-- AlterTable
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_pkey",
DROP COLUMN "discipline",
DROP COLUMN "endAt",
DROP COLUMN "eventGroups",
DROP COLUMN "expectedParticipants",
DROP COLUMN "name",
DROP COLUMN "primaryRoom",
DROP COLUMN "reserveRoom",
DROP COLUMN "startAt",
DROP COLUMN "type",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endsAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventType" TEXT NOT NULL,
ADD COLUMN     "expectedCount" INTEGER,
ADD COLUMN     "groups" TEXT[],
ADD COLUMN     "mainAuditoriumId" UUID NOT NULL,
ADD COLUMN     "reserveAuditoriumId" UUID,
ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subject" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "format",
ADD COLUMN     "format" "EventFormat" NOT NULL,
ALTER COLUMN "participantType" DROP NOT NULL,
ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Auditorium" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER,

    CONSTRAINT "Auditorium_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Booking_mainAuditoriumId_startsAt_endsAt_idx" ON "Booking"("mainAuditoriumId", "startsAt", "endsAt");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_mainAuditoriumId_fkey" FOREIGN KEY ("mainAuditoriumId") REFERENCES "Auditorium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_reserveAuditoriumId_fkey" FOREIGN KEY ("reserveAuditoriumId") REFERENCES "Auditorium"("id") ON DELETE SET NULL ON UPDATE CASCADE;
