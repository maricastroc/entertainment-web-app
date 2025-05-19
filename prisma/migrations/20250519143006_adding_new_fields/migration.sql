-- AlterTable
ALTER TABLE "external_reviews" ADD COLUMN     "mediaPoster" TEXT,
ADD COLUMN     "mediaTitle" TEXT;

-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "posterPath" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "ratings" ADD COLUMN     "mediaPoster" TEXT,
ADD COLUMN     "mediaTitle" TEXT;

-- AlterTable
ALTER TABLE "series" ADD COLUMN     "posterPath" TEXT,
ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "commentId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
