-- AlterTable
ALTER TABLE "votes" ADD COLUMN     "externalReviewId" TEXT,
ADD COLUMN     "ratingId" TEXT;

-- CreateTable
CREATE TABLE "external_reviews" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "rating" DOUBLE PRECISION,
    "username" TEXT,
    "name" TEXT,
    "avatarPath" TEXT,
    "movieId" TEXT,
    "seriesId" TEXT,

    CONSTRAINT "external_reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "external_reviews" ADD CONSTRAINT "external_reviews_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_reviews" ADD CONSTRAINT "external_reviews_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "ratings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_externalReviewId_fkey" FOREIGN KEY ("externalReviewId") REFERENCES "external_reviews"("id") ON DELETE SET NULL ON UPDATE CASCADE;
