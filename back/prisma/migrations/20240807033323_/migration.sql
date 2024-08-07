-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BEGINNER', 'AMATEUR', 'NOVICE', 'INTERMEDIATE', 'ADVANCED', 'EXPERT', 'MASTER', 'GRAND_MASTER', 'EMPEROR', 'GOD');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "skill" "SkillLevel" NOT NULL DEFAULT 'BEGINNER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
