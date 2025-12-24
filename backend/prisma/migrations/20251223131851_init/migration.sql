-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "discipline" TEXT,
    "format" TEXT NOT NULL,
    "description" TEXT,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "primaryRoom" TEXT NOT NULL,
    "reserveRoom" TEXT NOT NULL,
    "organizerName" TEXT NOT NULL,
    "organizerPosition" TEXT,
    "expectedParticipants" INTEGER NOT NULL,
    "participantType" TEXT NOT NULL,
    "eventGroups" TEXT[],

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
