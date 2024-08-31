-- CreateTable
CREATE TABLE "Cat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "more" TEXT NOT NULL,
    "agree" BOOLEAN NOT NULL,
    "catId" INTEGER NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
