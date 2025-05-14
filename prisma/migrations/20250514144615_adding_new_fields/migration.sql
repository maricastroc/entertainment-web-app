/*
  Warnings:

  - A unique constraint covering the columns `[userId,ratingId]` on the table `votes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,externalReviewId]` on the table `votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "votes_userId_ratingId_key" ON "votes"("userId", "ratingId");

-- CreateIndex
CREATE UNIQUE INDEX "votes_userId_externalReviewId_key" ON "votes"("userId", "externalReviewId");
