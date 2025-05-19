-- AlterTable
ALTER TABLE "external_reviews" ADD COLUMN     "mediaReleaseDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "releaseDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ratings" ADD COLUMN     "mediaReleaseDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "series" ADD COLUMN     "releaseDate" TIMESTAMP(3);
