-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('ONGOING', 'COMPLETED', 'ABORTED');

-- CreateTable
CREATE TABLE "FocusSession" (
    "id" TEXT NOT NULL,
    "plannedStartTime" TIMESTAMP(3) NOT NULL,
    "plannedEndTime" TIMESTAMP(3) NOT NULL,
    "focusDuration" INTEGER NOT NULL,
    "breakDuration" INTEGER NOT NULL,
    "plannedCycles" INTEGER NOT NULL DEFAULT 0,
    "actualStartTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualEndTime" TIMESTAMP(3),
    "totalFocusTime" INTEGER NOT NULL DEFAULT 0,
    "completedCycles" INTEGER NOT NULL DEFAULT 0,
    "incompleteCycles" INTEGER NOT NULL DEFAULT 0,
    "status" "SessionStatus" NOT NULL DEFAULT 'ONGOING',
    "userId" TEXT NOT NULL,

    CONSTRAINT "FocusSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FocusSession" ADD CONSTRAINT "FocusSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
